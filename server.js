const crypto = require("node:crypto");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const vm = require("node:vm");

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";
const adminKey = process.env.ADMIN_KEY || "";
const maxAttemptsByMode = {
  daily: 8,
  random: 8
};
const difficultyOrder = ["easy", "medium", "hard", "any"];
const difficultyLabels = {
  easy: "Facile",
  medium: "Moyen",
  hard: "Difficile",
  any: "Aléatoire"
};
const statsPath = process.env.STATS_FILE || path.join(root, "data", "stats.json");
const games = new Map();
const duels = new Map();
const stations = loadStations();
const stationTraffic = loadStationTraffic();
const difficultyPools = buildDifficultyPools();
const statsStore = loadStatsStore();

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
      sendJson(response, createGame(url.searchParams));
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

    if (url.pathname === "/api/admin/stats" && request.method === "GET") {
      if (!isAdminAuthorized(url)) {
        sendJson(response, { error: "Accès admin refusé." }, 403);
        return;
      }
      sendJson(response, adminStatsResponse());
      return;
    }

    if (url.pathname === "/admin" && request.method === "GET") {
      if (!isAdminAuthorized(url)) {
        sendHtml(response, adminDeniedHtml(), 403);
        return;
      }
      serveFile("admin.html", response);
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

function createGame(searchParams) {
  const modeParam = searchParams.get("mode");
  const mode = modeParam === "random" ? "random" : "daily";
  let difficulty = mode === "random" ? normalizeDifficulty(searchParams.get("difficulty")) : "daily";
  const playerId = normalizePlayerId(searchParams.get("playerId"));
  const dayKey = getParisDayKey();
  const maxAttempts = maxAttemptsByMode[mode];
  const requestedDuelId = mode === "random" ? normalizeDuelId(searchParams.get("duel")) : "";
  const duel = requestedDuelId ? duels.get(requestedDuelId) : null;

  if (mode === "daily" && playerId) {
    const previous = getModeStats("daily", dayKey)?.players?.[playerId];
    if (previous?.finished) {
      return {
        locked: true,
        gameId: null,
        mode,
        dayKey,
        difficulty,
        difficultyLabel: "Station du jour",
        maxAttempts,
        stationCount: stations.length,
        guesses: previous.guesses || [],
        finished: true,
        target: getDailyStationForKey(dayKey),
        stats: publicDailyStats({ mode, dayKey, finished: true }),
        message: previous.won ? "Tu as déjà trouvé la station du jour." : "Tu as déjà joué la station du jour.",
        status: previous.won ? "success" : "error"
      };
    }
  }

  let duelId = "";
  let target;
  if (mode === "random") {
    if (duel) {
      target = duel.target;
      difficulty = duel.difficulty;
      duelId = duel.id;
    } else {
      target = pickRandomStation(difficulty);
      duelId = createDuel(target, difficulty);
    }
  } else {
    target = getDailyStationForKey(dayKey);
  }

  const gameId = crypto.randomUUID();
  const game = {
    id: gameId,
    mode,
    difficulty,
    duelId,
    playerId,
    target,
    guesses: [],
    finished: false,
    counted: false,
    dayKey,
    maxAttempts,
    createdAt: Date.now()
  };

  games.set(gameId, game);
  cleanupGames();

  return {
    gameId,
    duelId,
    mode,
    dayKey,
    difficulty,
    difficultyLabel: mode === "random" ? difficultyLabels[difficulty] : "Station du jour",
    maxAttempts,
    stationCount: stations.length,
    message: mode === "daily"
      ? "Partie du jour prête."
      : duel
        ? `Défi ${difficultyLabels[difficulty].toLowerCase()} prêt.`
        : `Station ${difficultyLabels[difficulty].toLowerCase()} prête.`
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
    finalizeGame(game, true);
    return stateFor(
      game,
      `Trouvé en ${game.guesses.length} essai${game.guesses.length > 1 ? "s" : ""}.`,
      "success"
    );
  }

  if (game.guesses.length >= game.maxAttempts) {
    game.finished = true;
    finalizeGame(game, false);
    return stateFor(game, `Perdu : c'était ${game.target.name}.`, "error");
  }

  return stateFor(game, "Indice ajouté.", "");
}

function stateFor(game, message, status) {
  return {
    gameId: game.id,
    duelId: game.duelId || "",
    mode: game.mode,
    dayKey: game.dayKey,
    difficulty: game.difficulty,
    difficultyLabel: game.mode === "random" ? difficultyLabels[game.difficulty] : "Station du jour",
    maxAttempts: game.maxAttempts,
    stationCount: stations.length,
    guesses: game.guesses,
    finished: game.finished,
    target: game.finished ? game.target : null,
    stats: game.mode === "daily" ? publicDailyStats(game) : null,
    message,
    status
  };
}

function statsResponse(gameId) {
  const game = games.get(gameId);
  return publicDailyStats(game || { mode: "daily", dayKey: getParisDayKey(), finished: false });
}

function adminStatsResponse() {
  return {
    generatedAt: new Date().toISOString(),
    activeGames: [...games.values()].filter((game) => !game.finished).length,
    modes: [
      {
        mode: "daily",
        label: "Mode journalier",
        days: adminModeDays("daily")
      },
      {
        mode: "random",
        label: "Mode aléatoire",
        days: adminModeDays("random"),
        stationMenu: adminStationMenu()
      }
    ]
  };
}

function adminModeDays(mode) {
  return Object.keys(statsStore.days || {})
    .sort((a, b) => b.localeCompare(a))
    .map((dayKey) => {
      const stats = getModeStats(mode, dayKey);
      if (!stats) return null;

      const completed = completedCount(stats);
      if (!completed) return null;

      const day = {
        dayKey,
        completed,
        wins: stats.wins,
        losses: stats.losses,
        winRate: winRate(stats),
        averageAttempts: averageAttempts(stats),
        distribution: normalizedDistribution(stats.distribution),
        completedHours: normalizedHours(stats.completedHours),
        topGuesses: topGuesses(stats, 20)
      };

      if (mode === "daily") {
        day.answer = getDailyStationForKey(dayKey);
      } else {
        day.difficulties = difficultyOrder.map((difficulty) => {
          const difficultyStats = stats.difficulties?.[difficulty] || createAggregateStats();
          return {
            difficulty,
            label: difficultyLabels[difficulty],
            completed: completedCount(difficultyStats),
            wins: difficultyStats.wins,
            losses: difficultyStats.losses,
            winRate: winRate(difficultyStats),
            averageAttempts: averageAttempts(difficultyStats),
            stationPlays: stationPlays(difficultyStats.targets)
          };
        });
      }

      return day;
    })
    .filter(Boolean);
}

function publicDailyStats(game) {
  const key = game?.dayKey || getParisDayKey();
  const stats = getModeStats("daily", key) || createModeStats("daily");
  const completed = completedCount(stats);
  const unlocked = game?.mode === "daily" && game.finished;

  return {
    dayKey: key,
    unlocked,
    started: completed,
    completed,
    wins: stats.wins,
    losses: stats.losses,
    winRate: winRate(stats),
    averageAttempts: averageAttempts(stats),
    distribution: normalizedDistribution(stats.distribution),
    completedHours: normalizedHours(stats.completedHours),
    topGuesses: unlocked ? topGuesses(stats, 8) : [],
    answer: unlocked ? getDailyStationForKey(key) : null
  };
}

function finalizeGame(game, won) {
  if (game.counted) return;

  const stats = statsFor(game.mode, game.dayKey);
  recordCompletedGame(stats, game, won);

  if (game.mode === "daily" && game.playerId) {
    stats.players[game.playerId] = {
      finished: true,
      won,
      attempts: game.guesses.length,
      guesses: game.guesses,
      completedAt: new Date().toISOString()
    };
  }

  if (game.mode === "random") {
    if (!stats.difficulties[game.difficulty]) {
      stats.difficulties[game.difficulty] = createAggregateStats();
    }
    recordCompletedGame(stats.difficulties[game.difficulty], game, won);
  }

  game.counted = true;
  saveStatsStore();
}

function recordCompletedGame(stats, game, won) {
  stats.targets[game.target.name] = (stats.targets[game.target.name] || 0) + 1;
  incrementHour(stats, getParisHour());

  if (won) {
    stats.wins += 1;
    stats.winAttemptTotal += game.guesses.length;
    incrementDistribution(stats, game.guesses.length);
  } else {
    stats.losses += 1;
  }

  game.guesses.forEach((guess) => {
    stats.guesses[guess.station.name] = (stats.guesses[guess.station.name] || 0) + 1;
  });
}

function createDuel(target, difficulty) {
  const id = crypto.randomUUID();
  duels.set(id, {
    id,
    target,
    difficulty,
    createdAt: Date.now()
  });
  cleanupDuels();
  return id;
}

function incrementDistribution(stats, attempts) {
  const index = attempts - 1;
  while (stats.distribution.length <= index) {
    stats.distribution.push(0);
  }
  stats.distribution[index] += 1;
}

function incrementHour(stats, hour) {
  while (stats.completedHours.length < 24) {
    stats.completedHours.push(0);
  }
  stats.completedHours[hour] += 1;
}

function evaluateGuess(station, answer) {
  const distanceKm = getDistanceKm(station, answer);
  const solved = station.name === answer.name;

  return {
    station,
    solved,
    distanceKm,
    distanceLabel: formatDistance(distanceKm),
    distanceBand: getDistanceBand(distanceKm),
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
  if (getDistanceKm(from, to) < 0.25) return "Tout près";

  const labels = ["Nord", "Nord-est", "Est", "Sud-est", "Sud", "Sud-ouest", "Ouest", "Nord-ouest"];
  const bearing = getBearing(from, to);
  return labels[Math.round(bearing / 45) % labels.length];
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

function getBearing(from, to) {
  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(to.lat);
  const deltaLng = toRadians(to.lng - from.lng);
  const y = Math.sin(deltaLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}

function formatDistance(distanceKm) {
  if (distanceKm < 0.05) return "0 m";
  if (distanceKm < 1) return `${Math.round(distanceKm * 1000)} m`;
  if (distanceKm < 10) return `${distanceKm.toFixed(1).replace(".", ",")} km`;
  return `${Math.round(distanceKm)} km`;
}

function getDistanceBand(distanceKm) {
  if (distanceKm < 1) return "near";
  if (distanceKm < 4) return "middle";
  return "far";
}

function getDailyStationForKey(key) {
  const start = new Date(Date.UTC(2026, 0, 1));
  const [year, month, dayOfMonth] = key.split("-").map(Number);
  const current = new Date(Date.UTC(year, month - 1, dayOfMonth));
  const day = Math.floor((current - start) / 86400000);
  return stations[((day % stations.length) + stations.length) % stations.length];
}

function getParisDayKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function getParisHour(date = new Date()) {
  const parts = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    hour: "2-digit",
    hour12: false
  }).formatToParts(date);
  const hour = parts.find((part) => part.type === "hour")?.value || "0";
  return Number(hour) % 24;
}

function normalizeDifficulty(value) {
  return difficultyLabels[value] ? value : "medium";
}

function pickRandomStation(difficulty) {
  const pool = stations.filter((station) => stationMatchesDifficulty(station, difficulty));
  return pool[Math.floor(Math.random() * pool.length)] || stations[Math.floor(Math.random() * stations.length)];
}

function stationMatchesDifficulty(station, difficulty) {
  if (difficulty === "any") return true;
  return difficultyPools[difficulty]?.has(station.name) || false;
}

function buildDifficultyPools() {
  const ranked = stations
    .map((station) => ({
      name: station.name,
      score: getPopularityScore(station)
    }))
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, "fr"));
  const third = Math.ceil(ranked.length / 3);

  return {
    easy: new Set(ranked.slice(0, third).map((station) => station.name)),
    medium: new Set(ranked.slice(third, third * 2).map((station) => station.name)),
    hard: new Set(ranked.slice(third * 2).map((station) => station.name))
  };
}

function getPopularityScore(station) {
  const traffic = stationTraffic[station.name];
  if (traffic) return traffic.score;

  return Math.max(0, station.lines.length - 1) * 1_500_000;
}

function normalizePlayerId(value) {
  const playerId = String(value || "").trim();
  if (/^[a-zA-Z0-9_-]{12,80}$/.test(playerId)) return playerId;
  return "";
}

function normalizeDuelId(value) {
  const duelId = String(value || "").trim();
  if (/^[a-zA-Z0-9_-]{12,80}$/.test(duelId)) return duelId;
  return "";
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

function completedCount(stats) {
  return stats.wins + stats.losses;
}

function winRate(stats) {
  const completed = completedCount(stats);
  return completed ? Math.round((stats.wins / completed) * 100) : 0;
}

function averageAttempts(stats) {
  return stats.wins ? (stats.winAttemptTotal / stats.wins).toFixed(1).replace(".", ",") : "—";
}

function topGuesses(stats, limit) {
  return Object.entries(stats.guesses || {})
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "fr"))
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

function stationPlays(targets = {}) {
  return Object.entries(targets)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "fr"))
    .map(([name, count]) => ({ name, count }));
}

function adminStationMenu() {
  const countsByDifficulty = Object.fromEntries(
    difficultyOrder.map((difficulty) => [difficulty, new Map()])
  );

  Object.values(statsStore.days || {}).forEach((day) => {
    const random = day?.random;
    if (!random?.difficulties) return;
    difficultyOrder.forEach((difficulty) => {
      const targets = random.difficulties[difficulty]?.targets || {};
      const counts = countsByDifficulty[difficulty];
      Object.entries(targets).forEach(([name, count]) => {
        counts.set(name, (counts.get(name) || 0) + Number(count));
      });
    });
  });

  return difficultyOrder.map((difficulty) => {
    const counts = countsByDifficulty[difficulty];
    const pool = stations
      .filter((station) => stationMatchesDifficulty(station, difficulty))
      .map((station) => ({
        name: station.name,
        count: counts.get(station.name) || 0,
        score: getPopularityScore(station)
      }))
      .sort((a, b) => b.count - a.count || b.score - a.score || a.name.localeCompare(b.name, "fr"));

    return {
      difficulty,
      label: difficultyLabels[difficulty],
      stationCount: pool.length,
      played: [...counts.values()].reduce((sum, count) => sum + count, 0),
      stations: pool.map(({ name, count }) => ({ name, count }))
    };
  });
}

function normalizedDistribution(distribution) {
  const normalized = Array.isArray(distribution) ? distribution.slice(0, maxAttemptsByMode.random) : [];
  while (normalized.length < maxAttemptsByMode.random) {
    normalized.push(0);
  }
  return normalized;
}

function normalizedHours(hours) {
  const normalized = Array.isArray(hours) ? hours.slice(0, 24) : [];
  while (normalized.length < 24) {
    normalized.push(0);
  }
  return normalized.map((count) => Number(count) || 0);
}

function statsFor(mode, dayKey) {
  if (!statsStore.days[dayKey]) {
    statsStore.days[dayKey] = {};
  }
  if (!statsStore.days[dayKey][mode]) {
    statsStore.days[dayKey][mode] = createModeStats(mode);
  }
  return statsStore.days[dayKey][mode];
}

function getModeStats(mode, dayKey) {
  return statsStore.days?.[dayKey]?.[mode] || null;
}

function createModeStats(mode) {
  const stats = createAggregateStats();
  if (mode === "daily") {
    stats.players = {};
  }
  if (mode === "random") {
    stats.difficulties = Object.fromEntries(
      difficultyOrder.map((difficulty) => [difficulty, createAggregateStats()])
    );
  }
  return stats;
}

function createAggregateStats() {
  return {
    wins: 0,
    losses: 0,
    winAttemptTotal: 0,
    distribution: Array(maxAttemptsByMode.random).fill(0),
    completedHours: Array(24).fill(0),
    guesses: {},
    targets: {}
  };
}

function loadStatsStore() {
  try {
    const parsed = JSON.parse(fs.readFileSync(statsPath, "utf8"));
    return normalizeStatsStore(parsed);
  } catch {
    return createStatsStore();
  }
}

function createStatsStore() {
  return {
    version: 2,
    days: {}
  };
}

function normalizeStatsStore(parsed) {
  const store = createStatsStore();
  if (!parsed || typeof parsed !== "object" || !parsed.days || typeof parsed.days !== "object") {
    return store;
  }

  Object.entries(parsed.days).forEach(([dayKey, day]) => {
    if (!day || typeof day !== "object") return;
    store.days[dayKey] = {};
    ["daily", "random"].forEach((mode) => {
      if (day[mode]) {
        store.days[dayKey][mode] = normalizeModeStats(day[mode], mode);
      }
    });
  });

  return store;
}

function normalizeModeStats(input, mode) {
  const stats = {
    ...createModeStats(mode),
    wins: Number(input.wins) || 0,
    losses: Number(input.losses) || 0,
    winAttemptTotal: Number(input.winAttemptTotal) || 0,
    distribution: normalizedDistribution(input.distribution),
    completedHours: normalizedHours(input.completedHours),
    guesses: normalizeCounterObject(input.guesses),
    targets: normalizeCounterObject(input.targets)
  };

  if (mode === "daily") {
    stats.players = input.players && typeof input.players === "object" ? input.players : {};
  }

  if (mode === "random") {
    stats.difficulties = Object.fromEntries(
      difficultyOrder.map((difficulty) => [
        difficulty,
        normalizeDifficultyStats(input.difficulties?.[difficulty])
      ])
    );
  }

  return stats;
}

function normalizeDifficultyStats(input) {
  if (!input || typeof input !== "object") return createAggregateStats();
  return {
    ...createAggregateStats(),
    wins: Number(input.wins) || 0,
    losses: Number(input.losses) || 0,
    winAttemptTotal: Number(input.winAttemptTotal) || 0,
    distribution: normalizedDistribution(input.distribution),
    completedHours: normalizedHours(input.completedHours),
    guesses: normalizeCounterObject(input.guesses),
    targets: normalizeCounterObject(input.targets)
  };
}

function normalizeCounterObject(input) {
  if (!input || typeof input !== "object") return {};
  return Object.fromEntries(
    Object.entries(input)
      .filter(([, count]) => Number.isFinite(Number(count)) && Number(count) > 0)
      .map(([name, count]) => [name, Number(count)])
  );
}

function saveStatsStore() {
  fs.mkdirSync(path.dirname(statsPath), { recursive: true });
  const tempPath = `${statsPath}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(statsStore, null, 2));
  fs.renameSync(tempPath, statsPath);
}

function loadStations() {
  const code = fs.readFileSync(path.join(root, "stations.js"), "utf8");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(`${code}\nthis.__stations = stations;`, sandbox);
  return sandbox.__stations;
}

function loadStationTraffic() {
  const code = fs.readFileSync(path.join(root, "traffic.js"), "utf8");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(`${code}\nthis.__traffic = stationTraffic;`, sandbox);
  return sandbox.__traffic || {};
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

function cleanupDuels() {
  const maxAge = 1000 * 60 * 60 * 24;
  const now = Date.now();
  for (const [id, duel] of duels) {
    if (now - duel.createdAt > maxAge) {
      duels.delete(id);
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

function sendHtml(response, html, statusCode = 200) {
  response.writeHead(statusCode, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(html);
}

function isAdminAuthorized(url) {
  return Boolean(adminKey) && url.searchParams.get("key") === adminKey;
}

function adminDeniedHtml() {
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin Station Mystère</title>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    <main class="game-shell admin-shell">
      <section class="admin-card">
        <p class="kicker">Station Mystère</p>
        <h1>Accès admin</h1>
        <p class="message error">Page privée indisponible ou clé incorrecte.</p>
        <p class="admin-help">Configure une variable Render <strong>ADMIN_KEY</strong>, puis ouvre <strong>/admin?key=ton-mot-de-passe</strong>.</p>
      </section>
    </main>
  </body>
</html>`;
}

function serveStatic(urlPath, response) {
  const safePath = urlPath === "/" ? "/index.html" : decodeURIComponent(urlPath);

  if (safePath === "/admin.html") {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  serveFile(safePath, response);
}

function serveFile(safePath, response) {
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
