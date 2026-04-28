const crypto = require("node:crypto");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const vm = require("node:vm");

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";
const maxAttempts = 6;
const games = new Map();
const stations = loadStations();
const dailyStats = new Map();

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".csv", "text/csv; charset=utf-8"]
]);

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  try {
    if (url.pathname === "/api/game" && request.method === "GET") {
      sendJson(response, createGame(url.searchParams.get("mode")));
      return;
    }

    if (url.pathname === "/api/guess" && request.method === "POST") {
      const body = await readJson(request);
      const result = handleGuess(body);
      sendJson(response, result, result.error ? result.statusCode || 400 : 200);
      return;
    }

    if (url.pathname === "/api/stats" && request.method === "GET") {
      sendJson(response, statsResponse(url.searchParams.get("gameId")));
      return;
    }

    serveStatic(url.pathname, response);
  } catch (error) {
    sendJson(response, { error: "Erreur serveur.", detail: error.message }, 500);
  }
});

server.listen(port, host, () => {
  const localUrl = host === "0.0.0.0" ? `http://127.0.0.1:${port}` : `http://${host}:${port}`;
  console.log(`Station Mystère est prêt : ${localUrl}`);
});

function createGame(modeParam) {
  const mode = modeParam === "random" ? "random" : "daily";
  const target = mode === "random"
    ? stations[Math.floor(Math.random() * stations.length)]
    : getDailyStation();
  const gameId = crypto.randomUUID();
  const game = {
    id: gameId,
    mode,
    target,
    guesses: [],
    finished: false,
    counted: false,
    dayKey: dailyKey(),
    createdAt: Date.now()
  };

  games.set(gameId, game);

  if (mode === "daily") {
    statsFor(game.dayKey).started += 1;
  }

  cleanupGames();

  return {
    gameId,
    mode,
    maxAttempts,
    stationCount: stations.length,
    message: mode === "daily" ? "Partie du jour prête." : "Nouvelle station aléatoire."
  };
}

function handleGuess(body) {
  const game = games.get(body?.gameId);
  if (!game) {
    return { error: "Partie introuvable. Lance une nouvelle partie.", statusCode: 404 };
  }

  if (game.finished) {
    return stateFor(game, "Partie déjà terminée.", "");
  }

  const station = findStation(String(body.guess || ""));
  if (!station) {
    return { error: "Station absente de la base.", statusCode: 400 };
  }

  if (game.guesses.some((guess) => guess.station.name === station.name)) {
    return { error: "Déjà tentée.", statusCode: 409 };
  }

  const attempt = evaluateGuess(station, game.target);
  game.guesses.push(attempt);

  if (game.mode === "daily") {
    recordDailyGuess(game, attempt.station);
  }

  if (attempt.solved) {
    game.finished = true;
    finalizeDailyGame(game, true);
    return stateFor(
      game,
      `Trouvé en ${game.guesses.length} essai${game.guesses.length > 1 ? "s" : ""}.`,
      "success"
    );
  }

  if (game.guesses.length >= maxAttempts) {
    game.finished = true;
    finalizeDailyGame(game, false);
    return stateFor(game, `Perdu : c'était ${game.target.name}.`, "error");
  }

  return stateFor(game, "Indice ajouté.", "");
}

function stateFor(game, message, status) {
  return {
    gameId: game.id,
    mode: game.mode,
    maxAttempts,
    stationCount: stations.length,
    guesses: game.guesses,
    finished: game.finished,
    target: game.finished ? game.target : null,
    stats: game.mode === "daily" ? publicStats(game) : null,
    message,
    status
  };
}

function statsResponse(gameId) {
  const game = games.get(gameId);
  return publicStats(game);
}

function publicStats(game) {
  const key = game?.dayKey || dailyKey();
  const stats = statsFor(key);
  const completed = stats.wins + stats.losses;
  const averageAttempts = stats.wins
    ? (stats.winAttemptTotal / stats.wins).toFixed(1).replace(".", ",")
    : "—";
  const unlocked = game?.mode === "daily" && game.finished;
  const topGuesses = unlocked ? [...stats.guesses.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "fr"))
    .slice(0, 8)
    .map(([name, count]) => ({ name, count })) : [];

  return {
    dayKey: key,
    unlocked,
    started: stats.started,
    completed,
    wins: stats.wins,
    losses: stats.losses,
    winRate: completed ? Math.round((stats.wins / completed) * 100) : 0,
    averageAttempts,
    distribution: stats.distribution,
    topGuesses,
    answer: unlocked ? getDailyStation() : null
  };
}

function statsFor(key) {
  if (!dailyStats.has(key)) {
    dailyStats.set(key, {
      started: 0,
      wins: 0,
      losses: 0,
      winAttemptTotal: 0,
      distribution: [0, 0, 0, 0, 0, 0],
      guesses: new Map()
    });
  }

  return dailyStats.get(key);
}

function recordDailyGuess(game, station) {
  const stats = statsFor(game.dayKey);
  stats.guesses.set(station.name, (stats.guesses.get(station.name) || 0) + 1);
}

function finalizeDailyGame(game, won) {
  if (game.mode !== "daily" || game.counted) return;

  const stats = statsFor(game.dayKey);
  if (won) {
    stats.wins += 1;
    stats.winAttemptTotal += game.guesses.length;
    stats.distribution[game.guesses.length - 1] += 1;
  } else {
    stats.losses += 1;
  }
  game.counted = true;
}

function evaluateGuess(station, answer) {
  const distanceKm = getDistanceKm(station, answer);
  const solved = station.name === answer.name;

  return {
    station,
    solved,
    distanceKm,
    distanceLabel: distanceKm < 0.1 ? "0 km" : `${distanceKm.toFixed(1).replace(".", ",")} km`,
    clues: {
      lines: getLineStatus(station, answer),
      bank: { className: station.bank === answer.bank ? "hit" : "miss" },
      area: getAreaStatus(station, answer),
      transfers: getTransferStatus(station, answer),
      direction: {
        className: solved ? "hit" : "near",
        label: getDirectionLabel(station, answer)
      }
    }
  };
}

function getLineStatus(guess, answer) {
  const shared = guess.lines.filter((line) => answer.lines.includes(line));
  if (shared.length === answer.lines.length && guess.lines.length === answer.lines.length) {
    return { className: "hit" };
  }
  if (shared.length) {
    return { className: "near" };
  }
  return { className: "miss" };
}

function getAreaStatus(guess, answer) {
  if (guess.area === answer.area) {
    return { className: "hit", label: guess.area };
  }

  if (!guess.arr || !answer.arr) {
    return { className: "miss", label: guess.area };
  }

  const diff = Math.abs(guess.arr - answer.arr);
  const arrow = guess.arr < answer.arr ? "↑" : "↓";
  return {
    className: diff <= 2 ? "near" : "miss",
    label: `${guess.area} ${arrow}`
  };
}

function getTransferStatus(guess, answer) {
  if (guess.lines.length === answer.lines.length) {
    return { className: "hit", label: `${guess.lines.length} ligne${guess.lines.length > 1 ? "s" : ""}` };
  }

  return {
    className: Math.abs(guess.lines.length - answer.lines.length) === 1 ? "near" : "miss",
    label: `${guess.lines.length} ligne${guess.lines.length > 1 ? "s" : ""} ${guess.lines.length < answer.lines.length ? "↑" : "↓"}`
  };
}

function getDirectionLabel(from, to) {
  const vertical = to.lat > from.lat + 0.002 ? "N" : to.lat < from.lat - 0.002 ? "S" : "";
  const horizontal = to.lng > from.lng + 0.002 ? "E" : to.lng < from.lng - 0.002 ? "O" : "";
  const direction = `${vertical}${horizontal}`;
  const labels = {
    N: "Nord",
    S: "Sud",
    E: "Est",
    O: "Ouest",
    NE: "Nord-est",
    NO: "Nord-ouest",
    SE: "Sud-est",
    SO: "Sud-ouest"
  };
  return labels[direction] || "Tout près";
}

function getDistanceKm(a, b) {
  const radius = 6371;
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);
  const value =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return radius * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}

function getDailyStation() {
  const start = new Date(Date.UTC(2026, 0, 1));
  const [year, month, dayOfMonth] = dailyKey().split("-").map(Number);
  const current = new Date(Date.UTC(year, month - 1, dayOfMonth));
  const day = Math.floor((current - start) / 86400000);
  return stations[((day % stations.length) + stations.length) % stations.length];
}

function dailyKey() {
  const parts = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function findStation(value) {
  const typed = normalize(value);
  return stations.find((station) => {
    const candidate = normalize(station.name);
    return candidate === typed || compact(candidate) === compact(typed);
  });
}

function normalize(value) {
  return value
    .trim()
    .toLocaleLowerCase("fr-FR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, " ")
    .replace(/[^a-z0-9]+/g, " ");
}

function compact(value) {
  return value.replace(/\s+/g, "");
}

function toRadians(value) {
  return value * Math.PI / 180;
}

function loadStations() {
  const code = fs.readFileSync(path.join(root, "stations.js"), "utf8");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(`${code}\nthis.__stations = stations;`, sandbox);
  return sandbox.__stations;
}

function cleanupGames() {
  const maxAge = 1000 * 60 * 60 * 6;
  const now = Date.now();
  for (const [id, game] of games) {
    if (now - game.createdAt > maxAge) {
      games.delete(id);
    }
  }
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 100_000) {
        request.destroy();
        reject(new Error("Requête trop volumineuse."));
      }
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("JSON invalide."));
      }
    });
    request.on("error", reject);
  });
}

function sendJson(response, payload, statusCode = 200) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function serveStatic(urlPath, response) {
  const safePath = urlPath === "/" ? "/index.html" : decodeURIComponent(urlPath);
  const filePath = path.normalize(path.join(root, safePath));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    const contentType = mimeTypes.get(path.extname(filePath)) || "application/octet-stream";
    response.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-store"
    });
    response.end(content);
  });
}
