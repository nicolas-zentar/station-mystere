const defaultMaxAttempts = 8;
const personalStatsKey = "stationMysterePersonalStats:v2";
const legacyPersonalStatsKey = "stationMysterePersonalStats:v1";
const playerIdKey = "stationMysterePlayerId:v1";
const randomDifficultyKey = "stationMystereRandomDifficulty:v1";
const difficultyLabels = {
  easy: "Facile",
  medium: "Moyen",
  hard: "Difficile",
  any: "Aléatoire"
};
const useBackend = location.protocol === "http:" || location.protocol === "https:";
const seinePoints = [
  { lat: 48.8279, lng: 2.2262 },
  { lat: 48.8297, lng: 2.2517 },
  { lat: 48.8409, lng: 2.2713 },
  { lat: 48.8549, lng: 2.2868 },
  { lat: 48.8620, lng: 2.3052 },
  { lat: 48.8640, lng: 2.3204 },
  { lat: 48.8613, lng: 2.3379 },
  { lat: 48.8559, lng: 2.3522 },
  { lat: 48.8473, lng: 2.3656 },
  { lat: 48.8386, lng: 2.3822 },
  { lat: 48.8259, lng: 2.4078 },
  { lat: 48.8176, lng: 2.4314 },
  { lat: 48.8048, lng: 2.4596 }
];
const peripheriquePoints = [
  { lat: 48.8780, lng: 2.2790 },
  { lat: 48.9006, lng: 2.3300 },
  { lat: 48.8995, lng: 2.3852 },
  { lat: 48.8770, lng: 2.4101 },
  { lat: 48.8460, lng: 2.4149 },
  { lat: 48.8170, lng: 2.3664 },
  { lat: 48.8212, lng: 2.3141 },
  { lat: 48.8388, lng: 2.2530 },
  { lat: 48.8780, lng: 2.2790 }
];
const projection = createProjection([...stations, ...seinePoints, ...peripheriquePoints]);

let target = null;
let revealedTarget = null;
let gameId = null;
let guesses = [];
let finished = false;
let currentMode = "daily";
let currentMaxAttempts = defaultMaxAttempts;
let currentDifficulty = loadRandomDifficulty();
let activeGameKey = null;
let personalStats = loadPersonalStats();
let dailyStats = null;
let mapZoomed = false;
const playerId = getPlayerId();

const guessForm = document.querySelector("#guessForm");
const guessInput = document.querySelector("#guessInput");
const submitButton = guessForm.querySelector("button[type='submit']");
const miniMap = document.querySelector("#miniMap");
const stationList = document.querySelector("#stationList");
const guessesNode = document.querySelector("#guesses");
const messageNode = document.querySelector("#message");
const attemptCount = document.querySelector("#attemptCount");
const maxAttemptCount = document.querySelector("#maxAttemptCount");
const randomButton = document.querySelector("#randomButton");
const dailyButton = document.querySelector("#dailyButton");
const titleDailyButton = document.querySelector("#titleDailyButton");
const shareButton = document.querySelector("#shareButton");
const modeButtons = [...document.querySelectorAll("[data-mode]")];
const difficultyControl = document.querySelector("#difficultyControl");
const difficultyButtons = [...document.querySelectorAll("[data-difficulty]")];
const mapStatus = document.querySelector("#mapStatus");
const mapGeography = document.querySelector("#mapGeography");
const metroNetwork = document.querySelector("#metroNetwork");
const mapPoints = document.querySelector("#mapPoints");
const template = document.querySelector("#guessTemplate");
const stationCount = document.querySelector("#stationCount");
const dataMode = document.querySelector("#dataMode");
const stationDots = document.querySelector("#stationDots");
const answerStatus = document.querySelector("#answerStatus");
const answerValue = document.querySelector("#answerValue");
const personalStatNodes = {
  daily: {
    played: document.querySelector("#dailyPersonalStarted"),
    winRate: document.querySelector("#dailyPersonalWinRate"),
    average: document.querySelector("#dailyPersonalAverage"),
    streak: document.querySelector("#dailyPersonalStreak"),
    distribution: document.querySelector("#dailyPersonalDistribution"),
    topGuesses: document.querySelector("#dailyPersonalTopGuesses")
  },
  random: {
    played: document.querySelector("#randomPersonalStarted"),
    winRate: document.querySelector("#randomPersonalWinRate"),
    average: document.querySelector("#randomPersonalAverage"),
    streak: document.querySelector("#randomPersonalStreak"),
    distribution: document.querySelector("#randomPersonalDistribution"),
    topGuesses: document.querySelector("#randomPersonalTopGuesses")
  }
};
const dailyStarted = document.querySelector("#dailyStarted");
const dailyWinRate = document.querySelector("#dailyWinRate");
const dailyAverage = document.querySelector("#dailyAverage");
const dailyDistribution = document.querySelector("#dailyDistribution");
const dailyTopGuesses = document.querySelector("#dailyTopGuesses");

stationList.innerHTML = stations
  .map((station) => `<option value="${station.name}"></option>`)
  .join("");

stationCount.textContent = `${stations.length} stations`;
renderGeography();
renderMetroNetwork();
renderBaseMap();
renderPersonalStats();
renderDailyStats(null);

guessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitGuess();
});

randomButton.addEventListener("click", () => {
  startGame(currentMode);
});

dailyButton.addEventListener("click", () => {
  startGame("daily");
});

titleDailyButton.addEventListener("click", () => {
  startGame("daily");
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    startGame(button.dataset.mode);
  });
});

difficultyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setRandomDifficulty(button.dataset.difficulty);
    if (currentMode === "random") {
      startGame("random");
    }
  });
});

miniMap.addEventListener("click", toggleMapZoom);
miniMap.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleMapZoom();
  }
});

shareButton.addEventListener("click", async () => {
  const text = getShareText();
  try {
    await navigator.clipboard.writeText(text);
    setMessage("Résultat copié.", "success");
  } catch {
    setMessage(text, "success");
  }
});

renderDifficultyButtons();
renderModeControls();
init();

async function init() {
  if (useBackend) {
    try {
      await startBackendGame("daily");
      return;
    } catch {
      dataMode.textContent = "Mode autonome";
      setMessage("Serveur indisponible, jeu autonome activé.", "");
    }
  }

  startLocalGame("daily");
}

async function startGame(mode) {
  if (useBackend) {
    try {
      await startBackendGame(mode);
      return;
    } catch {
      dataMode.textContent = "Mode autonome";
      setMessage("Serveur indisponible, jeu autonome activé.", "");
    }
  }

  startLocalGame(mode);
}

async function startBackendGame(mode) {
  const params = new URLSearchParams({
    mode,
    playerId
  });
  if (mode === "random") {
    params.set("difficulty", currentDifficulty);
  }

  const response = await fetch(`/api/game?${params.toString()}`);
  const game = await response.json();

  if (!response.ok) {
    throw new Error(game.error || "Impossible de créer la partie.");
  }

  currentMode = game.mode;
  currentMaxAttempts = game.maxAttempts || defaultMaxAttempts;
  gameId = game.gameId || null;
  target = null;
  revealedTarget = game.target || null;
  guesses = game.guesses || [];
  finished = Boolean(game.locked);
  activeGameKey = currentMode === "daily" ? `daily-${game.dayKey}` : game.gameId;
  dailyStats = game.stats || null;
  shareButton.disabled = !finished;
  dataMode.textContent = currentMode === "daily"
    ? "Mode journalier"
    : `Aléatoire - ${game.difficultyLabel || difficultyLabels[currentDifficulty]}`;
  renderModeControls();
  setMessage(game.message || (currentMode === "daily" ? "Partie du jour prête." : "Nouvelle station aléatoire."), game.status || "");
  render();
  renderPersonalStats();
  if (dailyStats) {
    renderDailyStats(dailyStats, revealedTarget);
  } else {
    await refreshDailyStats();
  }
  if (!finished) {
    guessInput.focus();
  }
}

function startLocalGame(mode) {
  currentMode = mode;
  currentMaxAttempts = defaultMaxAttempts;
  gameId = null;
  target = mode === "random" ? pickLocalRandomStation(currentDifficulty) : getDailyStation();
  revealedTarget = null;
  guesses = [];
  finished = false;
  activeGameKey = mode === "daily" ? `daily-${getParisDayKey()}` : `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  dailyStats = null;
  guessInput.value = "";
  shareButton.disabled = true;
  dataMode.textContent = mode === "daily" ? "Mode journalier" : `Aléatoire - ${difficultyLabels[currentDifficulty]}`;
  renderModeControls();

  if (mode === "daily") {
    const lock = personalStats.dailyLocks?.[getParisDayKey()];
    if (lock?.finished) {
      guesses = lock.guesses || [];
      finished = true;
      revealedTarget = target;
      shareButton.disabled = false;
      setMessage(lock.won ? "Tu as déjà trouvé la station du jour." : "Tu as déjà joué la station du jour.", lock.won ? "success" : "error");
      render();
      renderPersonalStats(revealedTarget);
      renderDailyStats(null, revealedTarget);
      return;
    }
  }

  setMessage(mode === "daily" ? "Prêt pour la station du jour." : `Station ${difficultyLabels[currentDifficulty].toLowerCase()} prête.`, "");
  render();
  renderPersonalStats();
  renderDailyStats(null);
  guessInput.focus();
}

async function submitGuess() {
  if (finished) return;

  const typed = guessInput.value.trim();
  if (!typed) {
    setMessage("Entre une station pour tenter ta chance.", "error");
    return;
  }

  if (useBackend && gameId) {
    await submitBackendGuess(typed);
    return;
  }

  submitLocalGuess(typed);
}

async function submitBackendGuess(guess) {
  const response = await fetch("/api/guess", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameId, guess })
  });
  const data = await response.json();

  if (!response.ok) {
    setMessage(data.error || "Tentative impossible.", "error");
    return;
  }

  guesses = data.guesses;
  finished = data.finished;
  revealedTarget = data.target || null;
  currentMaxAttempts = data.maxAttempts || currentMaxAttempts;
  dailyStats = data.stats || dailyStats;
  guessInput.value = "";
  shareButton.disabled = !finished;
  if (finished) {
    recordPersonalResult(revealedTarget);
  }
  setMessage(data.message, data.status || "");
  render();
  renderPersonalStats(revealedTarget);
  renderDailyStats(dailyStats, revealedTarget);
}

function submitLocalGuess(value) {
  const station = findStation(value);

  if (!station) {
    setMessage("Station absente de la base.", "error");
    return;
  }

  if (guesses.some((guess) => guess.station.name === station.name)) {
    setMessage("Déjà tentée.", "error");
    return;
  }

  const attempt = evaluateGuess(station, target);
  guesses.push(attempt);
  guessInput.value = "";

  if (attempt.solved) {
    finished = true;
    revealedTarget = target;
    shareButton.disabled = false;
    recordPersonalResult(revealedTarget);
    setMessage(`Trouvé en ${guesses.length} essai${guesses.length > 1 ? "s" : ""}.`, "success");
  } else if (guesses.length >= currentMaxAttempts) {
    finished = true;
    revealedTarget = target;
    shareButton.disabled = false;
    recordPersonalResult(revealedTarget);
    setMessage(`Perdu : c'était ${target.name}.`, "error");
  } else {
    setMessage("Indice ajouté.", "");
  }

  render();
  renderPersonalStats(revealedTarget);
  renderDailyStats(null, revealedTarget);
}

function render() {
  attemptCount.textContent = guesses.length;
  maxAttemptCount.textContent = currentMaxAttempts;
  guessInput.disabled = finished;
  submitButton.disabled = finished;
  randomButton.textContent = currentMode === "daily" ? "Recharger le journalier" : "Nouvelle station aléatoire";
  guessesNode.innerHTML = "";

  guesses.forEach((guess) => {
    guessesNode.prepend(renderGuess(guess));
  });

  renderMap();
  mapStatus.textContent = mapZoomed ? "Carte zoomée" : guesses.length
    ? `${guesses.length} tentative${guesses.length > 1 ? "s" : ""} placée${guesses.length > 1 ? "s" : ""}`
    : "Aucune tentative";
}

function renderPersonalStats(answer = revealedTarget) {
  answerStatus.textContent = answer ? "Réponse révélée" : "Réponse masquée";
  renderPersonalModeStats("daily");
  renderPersonalModeStats("random");
}

function renderPersonalModeStats(mode) {
  const stats = personalStats.modes[mode];
  const nodes = personalStatNodes[mode];
  nodes.played.textContent = stats.played;
  nodes.winRate.textContent = stats.played ? `${Math.round((stats.wins / stats.played) * 100)}%` : "—";
  nodes.average.textContent = stats.wins ? (stats.totalWinAttempts / stats.wins).toFixed(1).replace(".", ",") : "—";
  nodes.streak.textContent = `Série ${stats.currentStreak}`;
  renderDistribution(stats.distribution, nodes.distribution);
  renderTopGuesses(getPersonalTopGuesses(mode), nodes.topGuesses);
}

function renderDailyStats(stats, answer = revealedTarget) {
  const unlocked = Boolean(answer || stats?.answer);
  const dailyAnswer = answer || stats?.answer || null;
  answerValue.textContent = dailyAnswer ? dailyAnswer.name : "À débloquer";
  dailyStarted.textContent = stats?.started ?? "—";
  dailyWinRate.textContent = stats ? `${stats.winRate}%` : "—";
  dailyAverage.textContent = stats?.averageAttempts ?? "—";
  renderDistribution(stats?.distribution || emptyDistribution(), dailyDistribution);
  renderTopGuesses(stats?.topGuesses || [], dailyTopGuesses, unlocked);
}

function renderDistribution(distribution, node) {
  const max = Math.max(...distribution, 1);
  node.innerHTML = "";

  distribution.forEach((count, index) => {
    const row = document.createElement("div");
    row.className = "distribution-row";

    const label = document.createElement("span");
    label.textContent = index + 1;

    const barWrap = document.createElement("div");
    barWrap.className = "distribution-bar";

    const bar = document.createElement("i");
    bar.style.width = `${Math.max((count / max) * 100, count ? 9 : 0)}%`;

    const value = document.createElement("strong");
    value.textContent = count;

    barWrap.append(bar);
    row.append(label, barWrap, value);
    node.append(row);
  });
}

function renderTopGuesses(topGuesses, node, unlocked = true) {
  node.innerHTML = "";

  if (!unlocked) {
    node.textContent = "Débloquées à la fin de ta partie.";
    return;
  }

  if (!topGuesses.length) {
    node.textContent = node.dataset.empty || "Aucune tentative publique pour l'instant.";
    return;
  }

  topGuesses.forEach((guess) => {
    const chip = document.createElement("span");
    chip.className = "guess-chip";
    chip.textContent = `${guess.name} · ${guess.count}`;
    node.append(chip);
  });
}

async function refreshDailyStats() {
  if (!useBackend || !gameId || currentMode !== "daily") {
    renderDailyStats(dailyStats, revealedTarget);
    return;
  }

  try {
    const response = await fetch(`/api/stats?gameId=${encodeURIComponent(gameId)}`);
    const stats = await response.json();
    if (response.ok) {
      dailyStats = stats;
      renderDailyStats(dailyStats, revealedTarget);
    }
  } catch {
    renderDailyStats(dailyStats, revealedTarget);
  }
}

function toggleMapZoom() {
  mapZoomed = !mapZoomed;
  miniMap.classList.toggle("is-zoomed", mapZoomed);
  miniMap.setAttribute("aria-label", mapZoomed ? "Dézoomer la carte" : "Zoomer la carte");
  mapStatus.textContent = mapZoomed ? "Carte zoomée" : guesses.length
    ? `${guesses.length} tentative${guesses.length > 1 ? "s" : ""} placée${guesses.length > 1 ? "s" : ""}`
    : "Aucune tentative";
}

function recordPersonalResult(answer) {
  const stats = personalStats.modes[currentMode];
  if (!answer || !activeGameKey || stats.recordedGames.includes(activeGameKey)) return;

  const won = guesses.at(-1)?.solved === true;
  stats.played += 1;
  stats.recordedGames.push(activeGameKey);
  stats.recordedGames = stats.recordedGames.slice(-120);

  if (won) {
    stats.wins += 1;
    stats.currentStreak += 1;
    stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak);
    stats.totalWinAttempts += guesses.length;
    stats.distribution[guesses.length - 1] += 1;
  } else {
    stats.losses += 1;
    stats.currentStreak = 0;
  }

  guesses.forEach((guess) => {
    stats.guesses[guess.station.name] = (stats.guesses[guess.station.name] || 0) + 1;
  });

  stats.lastResults.unshift({
    date: new Date().toISOString(),
    mode: currentMode,
    difficulty: currentMode === "random" ? currentDifficulty : "daily",
    answer: answer.name,
    won,
    attempts: guesses.length
  });
  stats.lastResults = stats.lastResults.slice(0, 40);

  if (currentMode === "daily") {
    personalStats.dailyLocks[getParisDayKey()] = {
      finished: true,
      won,
      attempts: guesses.length,
      answer: answer.name,
      guesses,
      completedAt: new Date().toISOString()
    };
  }

  savePersonalStats();
}

function getPersonalTopGuesses(mode) {
  return Object.entries(personalStats.modes[mode].guesses)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "fr"))
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }));
}

function loadPersonalStats() {
  try {
    const parsed = JSON.parse(localStorage.getItem(personalStatsKey));
    if (parsed && typeof parsed === "object") {
      return normalizePersonalStats(parsed);
    }
  } catch {
    // La migration ci-dessous couvrira le cas d'un ancien format valide.
  }

  try {
    const legacy = JSON.parse(localStorage.getItem(legacyPersonalStatsKey));
    if (legacy && typeof legacy === "object") {
      return migrateLegacyPersonalStats(legacy);
    }
  } catch {
    return createPersonalStats();
  }

  return createPersonalStats();
}

function createPersonalStats() {
  return {
    version: 2,
    modes: {
      daily: createPersonalModeStats(),
      random: createPersonalModeStats()
    },
    dailyLocks: {}
  };
}

function createPersonalModeStats() {
  return {
    played: 0,
    wins: 0,
    losses: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalWinAttempts: 0,
    distribution: emptyDistribution(),
    guesses: {},
    lastResults: [],
    recordedGames: []
  };
}

function normalizePersonalStats(parsed) {
  const fallback = createPersonalStats();
  return {
    ...fallback,
    ...parsed,
    modes: {
      daily: normalizePersonalModeStats(parsed.modes?.daily),
      random: normalizePersonalModeStats(parsed.modes?.random)
    },
    dailyLocks: parsed.dailyLocks && typeof parsed.dailyLocks === "object" ? parsed.dailyLocks : {}
  };
}

function normalizePersonalModeStats(parsed) {
  const fallback = createPersonalModeStats();
  if (!parsed || typeof parsed !== "object") return fallback;
  return {
    ...fallback,
    ...parsed,
    played: Number(parsed.played) || 0,
    wins: Number(parsed.wins) || 0,
    losses: Number(parsed.losses) || 0,
    currentStreak: Number(parsed.currentStreak) || 0,
    bestStreak: Number(parsed.bestStreak) || 0,
    totalWinAttempts: Number(parsed.totalWinAttempts) || 0,
    distribution: normalizeDistribution(parsed.distribution),
    guesses: parsed.guesses && typeof parsed.guesses === "object" ? parsed.guesses : {},
    lastResults: Array.isArray(parsed.lastResults) ? parsed.lastResults : [],
    recordedGames: Array.isArray(parsed.recordedGames) ? parsed.recordedGames : []
  };
}

function migrateLegacyPersonalStats(legacy) {
  const migrated = createPersonalStats();
  if (Array.isArray(legacy.lastResults) && legacy.lastResults.length) {
    legacy.lastResults.slice().reverse().forEach((result, index) => {
      const mode = result.mode === "daily" ? "daily" : "random";
      addLegacyResult(migrated.modes[mode], result, index);
    });
    return migrated;
  }

  if (legacy.played) {
    migrated.modes.random = normalizePersonalModeStats({
      played: legacy.played,
      wins: legacy.wins,
      losses: legacy.losses,
      currentStreak: legacy.currentStreak,
      bestStreak: legacy.bestStreak,
      totalWinAttempts: legacy.totalWinAttempts,
      distribution: legacy.distribution,
      guesses: legacy.guesses,
      lastResults: legacy.lastResults,
      recordedGames: legacy.recordedGames
    });
  }
  return migrated;
}

function addLegacyResult(stats, result, index) {
  const attempts = Number(result.attempts) || 0;
  const won = Boolean(result.won);
  stats.played += 1;
  stats.recordedGames.push(`legacy-${index}-${result.date || ""}`);
  if (won) {
    stats.wins += 1;
    stats.currentStreak += 1;
    stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak);
    stats.totalWinAttempts += attempts;
    if (attempts > 0 && attempts <= stats.distribution.length) {
      stats.distribution[attempts - 1] += 1;
    }
  } else {
    stats.losses += 1;
    stats.currentStreak = 0;
  }
  stats.lastResults.unshift(result);
}

function emptyDistribution() {
  return Array(defaultMaxAttempts).fill(0);
}

function normalizeDistribution(distribution) {
  const normalized = Array.isArray(distribution) ? distribution.slice(0, defaultMaxAttempts) : [];
  while (normalized.length < defaultMaxAttempts) {
    normalized.push(0);
  }
  return normalized;
}

function savePersonalStats() {
  localStorage.setItem(personalStatsKey, JSON.stringify(personalStats));
}

function renderGuess(attempt) {
  const item = template.content.firstElementChild.cloneNode(true);
  const station = attempt.station;

  item.querySelector(".guess-name").textContent = station.name;
  const distanceNode = item.querySelector(".distance");
  distanceNode.textContent = attempt.distanceLabel;
  distanceNode.className = `distance ${attempt.distanceBand || getDistanceBand(attempt.distanceKm)}`;

  setTile(
    item.querySelector(".lines"),
    attempt.clues.lines.className,
    "Lignes",
    station.lines,
    "Lignes de métro desservant cette station"
  );
  setTile(
    item.querySelector(".bank"),
    attempt.clues.bank.className,
    "Rive",
    station.bank,
    "Position par rapport à la Seine"
  );
  setTile(
    item.querySelector(".arr"),
    attempt.clues.area.className,
    "Lieu",
    attempt.clues.area.label,
    "Arrondissement parisien ou commune de la station tentée"
  );
  setTile(
    item.querySelector(".transfers"),
    attempt.clues.transfers.className,
    "Correspondances",
    attempt.clues.transfers.label,
    "Nombre de lignes disponibles dans la station"
  );
  setTile(
    item.querySelector(".direction"),
    attempt.clues.direction.className,
    "Direction",
    attempt.clues.direction.label,
    "Direction à suivre depuis cette station pour aller vers la station mystère"
  );

  return item;
}

function setTile(node, className, category, value, description) {
  const ariaValue = Array.isArray(value) ? value.join(", ") : value;
  node.className = `tile ${className}${category === "Direction" ? " direction" : ""}`;
  node.title = description;
  node.setAttribute("aria-label", `${category}: ${ariaValue}. ${description}.`);
  node.innerHTML = "";

  const categoryNode = document.createElement("span");
  categoryNode.className = "tile-label";
  categoryNode.textContent = category;

  const valueNode = document.createElement("span");
  valueNode.className = Array.isArray(value) ? "tile-value line-badges" : "tile-value";

  if (Array.isArray(value)) {
    value.forEach((line) => {
      const badge = document.createElement("span");
      badge.className = `line-badge m-${line.replace("bis", "b")}`;
      badge.textContent = line;
      valueNode.append(badge);
    });
  } else {
    valueNode.textContent = value;
  }

  node.append(categoryNode, valueNode);
}

function renderGeography() {
  if (!mapGeography) return;

  mapGeography.innerHTML = "";
  const peripherique = document.createElementNS("http://www.w3.org/2000/svg", "path");
  peripherique.setAttribute("class", "peripherique-line");
  peripherique.setAttribute("d", pointsToPath(peripheriquePoints, true));

  const seineShadow = document.createElementNS("http://www.w3.org/2000/svg", "path");
  seineShadow.setAttribute("class", "seine-shadow");
  seineShadow.setAttribute("d", pointsToSmoothPath(seinePoints));

  const seine = document.createElementNS("http://www.w3.org/2000/svg", "path");
  seine.setAttribute("class", "seine");
  seine.setAttribute("d", pointsToSmoothPath(seinePoints));

  const seineLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
  const labelPoint = project({ lat: 48.858, lng: 2.335 });
  seineLabel.setAttribute("class", "river-label");
  seineLabel.setAttribute("x", labelPoint.x);
  seineLabel.setAttribute("y", labelPoint.y - 10);
  seineLabel.textContent = "Seine";

  mapGeography.append(peripherique, seineShadow, seine, seineLabel);
}

function renderBaseMap() {
  stationDots.innerHTML = "";

  stations.forEach((station) => {
    const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const { x, y } = project(station);
    point.setAttribute("cx", x);
    point.setAttribute("cy", y);
    point.setAttribute("r", station.lines.length > 2 ? "3.1" : station.lines.length > 1 ? "2.5" : "1.9");
    point.setAttribute("class", station.lines.length > 1 ? "station-dot hub-dot" : "station-dot");
    point.append(document.createElementNS("http://www.w3.org/2000/svg", "title"));
    point.querySelector("title").textContent = `${station.name} · ${station.lines.join(", ")}`;
    stationDots.append(point);
  });
}

function renderMetroNetwork() {
  if (!metroNetwork || typeof linePaths === "undefined") return;

  metroNetwork.innerHTML = "";

  linePaths.forEach((path) => {
    const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    polyline.setAttribute("class", `network-line m-${path.line.replace("bis", "b")}`);
    polyline.setAttribute("points", path.points.map((point) => {
      const { x, y } = project(point);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" "));

    metroNetwork.append(polyline);
  });
}

function renderMap() {
  mapPoints.innerHTML = "";

  guesses.forEach((attempt, index) => {
    const point = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const { x, y } = project(attempt.station);
    point.setAttribute("class", `map-point ${attempt.solved ? "win" : "try"}`);
    point.setAttribute("transform", `translate(${x} ${y})`);

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("r", attempt.solved ? "11" : "9");

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "14");
    text.setAttribute("y", "5");
    text.textContent = String(index + 1);

    point.append(circle, text);
    mapPoints.append(point);
  });

  if (finished && revealedTarget) {
    const point = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const { x, y } = project(revealedTarget);
    point.setAttribute("class", "map-point win");
    point.setAttribute("transform", `translate(${x} ${y})`);

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("r", "13");

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "16");
    text.setAttribute("y", "5");
    text.textContent = "★";

    point.append(circle, text);
    mapPoints.append(point);
  }
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

function project(station) {
  const raw = geoToPlane(station);
  const x = projection.center + (raw.x - projection.midX) * projection.scale;
  const y = projection.center - (raw.y - projection.midY) * projection.scale;
  return { x, y };
}

function createProjection(points) {
  const centerLat = points.reduce((sum, point) => sum + point.lat, 0) / points.length;
  const cosLat = Math.cos(toRadians(centerLat));
  const planePoints = points.map((point) => geoToPlane(point, cosLat));
  const minX = Math.min(...planePoints.map((point) => point.x));
  const maxX = Math.max(...planePoints.map((point) => point.x));
  const minY = Math.min(...planePoints.map((point) => point.y));
  const maxY = Math.max(...planePoints.map((point) => point.y));
  const drawable = 336;

  return {
    cosLat,
    center: 210,
    midX: (minX + maxX) / 2,
    midY: (minY + maxY) / 2,
    scale: Math.min(drawable / (maxX - minX), drawable / (maxY - minY))
  };
}

function geoToPlane(point, cosLat = projection?.cosLat) {
  return {
    x: point.lng * cosLat,
    y: point.lat
  };
}

function pointsToPath(points, closed = false) {
  const projected = points.map(project);
  const [first, ...rest] = projected;
  const commands = [`M ${first.x.toFixed(1)} ${first.y.toFixed(1)}`];
  rest.forEach((point) => {
    commands.push(`L ${point.x.toFixed(1)} ${point.y.toFixed(1)}`);
  });
  if (closed) commands.push("Z");
  return commands.join(" ");
}

function pointsToSmoothPath(points) {
  const projected = points.map(project);
  if (projected.length < 3) return pointsToPath(points);

  let path = `M ${projected[0].x.toFixed(1)} ${projected[0].y.toFixed(1)}`;
  for (let index = 1; index < projected.length - 1; index += 1) {
    const current = projected[index];
    const next = projected[index + 1];
    const midX = (current.x + next.x) / 2;
    const midY = (current.y + next.y) / 2;
    path += ` Q ${current.x.toFixed(1)} ${current.y.toFixed(1)} ${midX.toFixed(1)} ${midY.toFixed(1)}`;
  }

  const last = projected.at(-1);
  path += ` T ${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
  return path;
}

function getDailyStation() {
  return getDailyStationForKey(getParisDayKey());
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

function pickLocalRandomStation(difficulty) {
  const pool = stations.filter((station) => stationMatchesDifficulty(station, difficulty));
  return pool[Math.floor(Math.random() * pool.length)] || stations[Math.floor(Math.random() * stations.length)];
}

function stationMatchesDifficulty(station, difficulty) {
  if (difficulty === "any") return true;
  return getTrafficDifficulty(station) === difficulty;
}

function getTrafficDifficulty(station) {
  const ranked = getRankedStationsByTraffic();
  const index = ranked.findIndex((item) => item.name === station.name);
  if (index < 0) return "hard";

  const third = Math.ceil(ranked.length / 3);
  if (index < third) return "easy";
  if (index < third * 2) return "medium";
  return "hard";
}

function getRankedStationsByTraffic() {
  if (!getRankedStationsByTraffic.cache) {
    getRankedStationsByTraffic.cache = stations
      .map((station) => ({
        name: station.name,
        score: getPopularityScore(station)
      }))
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, "fr"));
  }
  return getRankedStationsByTraffic.cache;
}

function getPopularityScore(station) {
  const traffic = typeof stationTraffic !== "undefined" ? stationTraffic[station.name] : null;
  if (traffic) return traffic.score;

  return Math.max(0, station.lines.length - 1) * 1500000;
}

function loadRandomDifficulty() {
  const stored = localStorage.getItem(randomDifficultyKey);
  return difficultyLabels[stored] ? stored : "medium";
}

function setRandomDifficulty(difficulty) {
  currentDifficulty = difficultyLabels[difficulty] ? difficulty : "medium";
  localStorage.setItem(randomDifficultyKey, currentDifficulty);
  renderDifficultyButtons();
}

function renderDifficultyButtons() {
  difficultyButtons.forEach((button) => {
    const selected = button.dataset.difficulty === currentDifficulty;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });
}

function renderModeControls() {
  modeButtons.forEach((button) => {
    const selected = button.dataset.mode === currentMode;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });
  difficultyControl.classList.toggle("is-hidden", currentMode !== "random");
}

function getPlayerId() {
  const stored = localStorage.getItem(playerIdKey);
  if (stored) return stored;

  const next = crypto.randomUUID
    ? crypto.randomUUID()
    : `player-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  localStorage.setItem(playerIdKey, next);
  return next;
}

function getShareText() {
  const rows = guesses.map((guess) => {
    if (guess.solved) return "🟩🟩🟩🟩🟩";
    return [
      guess.clues.lines.className,
      guess.clues.bank.className,
      guess.clues.area.className,
      guess.clues.transfers.className,
      guess.distanceKm <= 1 ? "near" : "miss"
    ].map((status) => status === "hit" ? "🟩" : status === "near" ? "🟨" : "⬛").join("");
  });

  const result = guesses.at(-1)?.solved ? `${guesses.length}/${currentMaxAttempts}` : `X/${currentMaxAttempts}`;
  return [`Station Mystère ${result}`, ...rows].join("\n");
}

function findStation(value) {
  const typed = normalize(value);
  return stations.find((item) => {
    const candidate = normalize(item.name);
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

function setMessage(text, type) {
  messageNode.textContent = text;
  messageNode.className = `message ${type || ""}`.trim();
}
