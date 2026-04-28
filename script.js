const maxAttempts = 6;
const useBackend = location.protocol === "http:" || location.protocol === "https:";
const bounds = {
  minLat: Math.min(...stations.map((station) => station.lat)),
  maxLat: Math.max(...stations.map((station) => station.lat)),
  minLng: Math.min(...stations.map((station) => station.lng)),
  maxLng: Math.max(...stations.map((station) => station.lng))
};

let target = null;
let revealedTarget = null;
let gameId = null;
let guesses = [];
let finished = false;
let currentMode = "daily";
let currentStats = null;

const guessForm = document.querySelector("#guessForm");
const guessInput = document.querySelector("#guessInput");
const stationList = document.querySelector("#stationList");
const guessesNode = document.querySelector("#guesses");
const messageNode = document.querySelector("#message");
const attemptCount = document.querySelector("#attemptCount");
const randomButton = document.querySelector("#randomButton");
const dailyButton = document.querySelector("#dailyButton");
const shareButton = document.querySelector("#shareButton");
const mapStatus = document.querySelector("#mapStatus");
const mapPoints = document.querySelector("#mapPoints");
const template = document.querySelector("#guessTemplate");
const stationCount = document.querySelector("#stationCount");
const dataMode = document.querySelector("#dataMode");
const stationDots = document.querySelector("#stationDots");
const answerStatus = document.querySelector("#answerStatus");
const answerValue = document.querySelector("#answerValue");
const statStarted = document.querySelector("#statStarted");
const statWinRate = document.querySelector("#statWinRate");
const statAverage = document.querySelector("#statAverage");
const distributionNode = document.querySelector("#distribution");
const topGuessesNode = document.querySelector("#topGuesses");

stationList.innerHTML = stations
  .map((station) => `<option value="${station.name}"></option>`)
  .join("");

stationCount.textContent = `${stations.length} stations`;
renderBaseMap();

guessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitGuess();
});

randomButton.addEventListener("click", () => {
  startGame("random");
});

dailyButton.addEventListener("click", () => {
  startGame("daily");
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

  startLocalGame(getDailyStation(), "daily");
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

  const nextTarget = mode === "random"
    ? stations[Math.floor(Math.random() * stations.length)]
    : getDailyStation();
  startLocalGame(nextTarget, mode);
}

async function startBackendGame(mode) {
  const response = await fetch(`/api/game?mode=${encodeURIComponent(mode)}`);
  const game = await response.json();

  if (!response.ok) {
    throw new Error(game.error || "Impossible de créer la partie.");
  }

  currentMode = game.mode;
  gameId = game.gameId;
  target = null;
  revealedTarget = null;
  guesses = [];
  finished = false;
  currentStats = null;
  shareButton.disabled = true;
  dataMode.textContent = currentMode === "daily" ? "Partie du jour" : "Mode aléatoire";
  setMessage(currentMode === "daily" ? "Partie du jour prête." : "Nouvelle station aléatoire.", "");
  render();
  await refreshStats();
  guessInput.focus();
}

function startLocalGame(nextTarget, mode) {
  currentMode = mode;
  gameId = null;
  target = nextTarget;
  revealedTarget = null;
  guesses = [];
  finished = false;
  currentStats = null;
  guessInput.value = "";
  shareButton.disabled = true;
  dataMode.textContent = mode === "daily" ? "Partie du jour" : "Mode aléatoire";
  setMessage(mode === "daily" ? "Prêt pour la station du jour." : "Nouvelle station aléatoire.", "");
  render();
  renderStats(null);
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
  currentStats = data.stats || currentStats;
  guessInput.value = "";
  shareButton.disabled = !finished;
  setMessage(data.message, data.status || "");
  render();
  renderStats(currentStats);
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
    currentStats = getLocalStats(target);
    shareButton.disabled = false;
    setMessage(`Trouvé en ${guesses.length} essai${guesses.length > 1 ? "s" : ""}.`, "success");
  } else if (guesses.length >= maxAttempts) {
    finished = true;
    revealedTarget = target;
    currentStats = getLocalStats(target);
    shareButton.disabled = false;
    setMessage(`Perdu : c'était ${target.name}.`, "error");
  } else {
    setMessage("Indice ajouté.", "");
  }

  render();
  renderStats(currentStats);
}

function render() {
  attemptCount.textContent = guesses.length;
  guessesNode.innerHTML = "";

  guesses.forEach((guess) => {
    guessesNode.prepend(renderGuess(guess));
  });

  renderMap();
  mapStatus.textContent = guesses.length
    ? `${guesses.length} tentative${guesses.length > 1 ? "s" : ""} placée${guesses.length > 1 ? "s" : ""}`
    : "Aucune tentative";
}

function renderStats(stats) {
  if (!stats) {
    answerStatus.textContent = "Réponse masquée";
    answerValue.textContent = finished && revealedTarget ? revealedTarget.name : "À débloquer";
    statStarted.textContent = "—";
    statWinRate.textContent = "—";
    statAverage.textContent = "—";
    renderDistribution([0, 0, 0, 0, 0, 0]);
    topGuessesNode.textContent = "Les statistiques apparaissent avec la version en ligne.";
    return;
  }

  const answer = stats.answer || revealedTarget;
  answerStatus.textContent = answer ? "Réponse révélée" : "Réponse masquée";
  answerValue.textContent = answer ? answer.name : "À débloquer";
  statStarted.textContent = stats.started;
  statWinRate.textContent = Number.isFinite(stats.winRate) ? `${stats.winRate}%` : "—";
  statAverage.textContent = stats.averageAttempts;
  renderDistribution(stats.distribution || [0, 0, 0, 0, 0, 0]);
  renderTopGuesses(stats.topGuesses || [], stats.unlocked);
}

function renderDistribution(distribution) {
  const max = Math.max(...distribution, 1);
  distributionNode.innerHTML = "";

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
    distributionNode.append(row);
  });
}

function renderTopGuesses(topGuesses, unlocked = true) {
  topGuessesNode.innerHTML = "";

  if (!unlocked) {
    topGuessesNode.textContent = "Débloquées à la fin de ta partie.";
    return;
  }

  if (!topGuesses.length) {
    topGuessesNode.textContent = "Aucune tentative publique pour l'instant.";
    return;
  }

  topGuesses.forEach((guess) => {
    const chip = document.createElement("span");
    chip.className = "guess-chip";
    chip.textContent = `${guess.name} · ${guess.count}`;
    topGuessesNode.append(chip);
  });
}

function renderGuess(attempt) {
  const item = template.content.firstElementChild.cloneNode(true);
  const station = attempt.station;

  item.querySelector(".guess-name").textContent = station.name;
  item.querySelector(".distance").textContent = attempt.distanceLabel;

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

async function refreshStats() {
  if (!useBackend || !gameId || currentMode !== "daily") {
    renderStats(currentStats);
    return;
  }

  try {
    const response = await fetch(`/api/stats?gameId=${encodeURIComponent(gameId)}`);
    const stats = await response.json();
    if (response.ok) {
      currentStats = stats;
      renderStats(currentStats);
    }
  } catch {
    renderStats(currentStats);
  }
}

function getLocalStats(answer) {
  return {
    unlocked: true,
    started: "—",
    winRate: "—",
    averageAttempts: "—",
    distribution: [0, 0, 0, 0, 0, 0],
    topGuesses: guesses.map((guess) => ({ name: guess.station.name, count: 1 })),
    answer
  };
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

function project(station) {
  const x = 54 + ((station.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 312;
  const y = 368 - ((station.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 316;
  return { x, y };
}

function getDailyStation() {
  const start = new Date(Date.UTC(2026, 0, 1));
  const today = new Date();
  const current = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  const day = Math.floor((current - start) / 86400000);
  return stations[((day % stations.length) + stations.length) % stations.length];
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

  const result = guesses.at(-1)?.solved ? `${guesses.length}/6` : "X/6";
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
