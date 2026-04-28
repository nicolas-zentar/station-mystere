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

  games.set(gameId, {
    id: gameId,
    mode,
    target,
    guesses: [],
    finished: false,
    createdAt: Date.now()
  });

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

  if (attempt.solved) {
    game.finished = true;
    return stateFor(
      game,
      `Trouvé en ${game.guesses.length} essai${game.guesses.length > 1 ? "s" : ""}.`,
      "success"
    );
  }

  if (game.guesses.length >= maxAttempts) {
    game.finished = true;
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
    message,
    status
  };
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
  const today = new Date();
  const current = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  const day = Math.floor((current - start) / 86400000);
  return stations[((day % stations.length) + stations.length) % stations.length];
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
