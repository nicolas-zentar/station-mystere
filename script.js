const maxAttempts = 6;
const personalStatsKey = "stationMysterePersonalStats:v1";
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
let activeGameKey = null;
let personalStats = loadPersonalStats();
let dailyStats = null;
let mapZoomed = false;

const guessForm = document.querySelector("#guessForm");
const guessInput = document.querySelector("#guessInput");
const miniMap = document.querySelector("#miniMap");
const stationList = document.querySelector("#stationList");
const guessesNode = document.querySelector("#guesses");
const messageNode = document.querySelector("#message");
const attemptCount = document.querySelector("#attemptCount");
const randomButton = document.querySelector("#randomButton");
const dailyButton = document.querySelector("#dailyButton");
const titleDailyButton = document.querySelector("#titleDailyButton");
const shareButton = document.querySelector("#shareButton");
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
const statStarted = document.querySelector("#statStarted");
const statWinRate = document.querySelector("#statWinRate");
const statAverage = document.querySelector("#statAverage");
const statStreak = document.querySelector("#statStreak");
const distributionNode = document.querySelector("#distribution");
const topGuessesNode = document.querySelector("#topGuesses");
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
  startGame("random");
});

dailyButton.addEventListener("click", () => {
  startGame("daily");
});

titleDailyButton.addEventListener("click", () => {
  startGame("daily");
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
  activeGameKey = game.gameId;
  dailyStats = null;
  shareButton.disabled = true;
  dataMode.textContent = currentMode === "daily" ? "Partie du jour" : "Mode aléatoire";
  setMessage(currentMode === "daily" ? "Partie du jour prête." : "Nouvelle station aléatoire.", "");
  render();
  renderPersonalStats();
  await refreshDailyStats();
  guessInput.focus();
}

function startLocalGame(nextTarget, mode) {
  currentMode = mode;
  gameId = null;
  target = nextTarget;
  revealedTarget = null;
  guesses = [];
  finished = false;
  activeGameKey = `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  dailyStats = null;
  guessInput.value = "";
  shareButton.disabled = true;
  dataMode.textContent = mode === "daily" ? "Partie du jour" : "Mode aléatoire";
  setMessage(mode === "daily" ? "Prêt pour la station du jour." : "Nouvelle station aléatoire.", "");
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
  } else if (guesses.length >= maxAttempts) {
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
  statStarted.textContent = personalStats.played;
  statWinRate.textContent = personalStats.played ? `${Math.round((personalStats.wins / personalStats.played) * 100)}%` : "—";
  statAverage.textContent = personalStats.wins ? (personalStats.totalWinAttempts / personalStats.wins).toFixed(1).replace(".", ",") : "—";
  statStreak.textContent = personalStats.currentStreak;
  renderDistribution(personalStats.distribution);
  renderTopGuesses(getPersonalTopGuesses());
}

function renderDailyStats(stats, answer = revealedTarget) {
  const unlocked = Boolean(answer || stats?.answer);
  const dailyAnswer = answer || stats?.answer || null;
  answerValue.textContent = dailyAnswer ? dailyAnswer.name : "À débloquer";
  dailyStarted.textContent = stats?.started ?? "—";
  dailyWinRate.textContent = stats ? `${stats.winRate}%` : "—";
  dailyAverage.textContent = stats?.averageAttempts ?? "—";
  renderDistribution(stats?.distribution || [0, 0, 0, 0, 0, 0], dailyDistribution);
  renderTopGuesses(stats?.topGuesses || [], dailyTopGuesses, unlocked);
}

function renderDistribution(distribution, node = distributionNode) {
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

function renderTopGuesses(topGuesses, node = topGuessesNode, unlocked = true) {
  node.innerHTML = "";

  if (!unlocked) {
    node.textContent = "Débloquées à la fin de ta partie.";
    return;
  }

  if (!topGuesses.length) {
    node.textContent = node === topGuessesNode
      ? "Tes stations tentées apparaîtront ici."
      : "Aucune tentative publique pour l'instant.";
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
  if (!answer || !activeGameKey || personalStats.recordedGames.includes(activeGameKey)) return;

  const won = guesses.at(-1)?.solved === true;
  personalStats.played += 1;
  personalStats.recordedGames.push(activeGameKey);
  personalStats.recordedGames = personalStats.recordedGames.slice(-80);

  if (won) {
    personalStats.wins += 1;
    personalStats.currentStreak += 1;
    personalStats.bestStreak = Math.max(personalStats.bestStreak, personalStats.currentStreak);
    personalStats.totalWinAttempts += guesses.length;
    personalStats.distribution[guesses.length - 1] += 1;
  } else {
    personalStats.losses += 1;
    personalStats.currentStreak = 0;
  }

  guesses.forEach((guess) => {
    personalStats.guesses[guess.station.name] = (personalStats.guesses[guess.station.name] || 0) + 1;
  });

  personalStats.lastResults.unshift({
    date: new Date().toISOString(),
    mode: currentMode,
    answer: answer.name,
    won,
    attempts: guesses.length
  });
  personalStats.lastResults = personalStats.lastResults.slice(0, 20);

  savePersonalStats();
}

function getPersonalTopGuesses() {
  return Object.entries(personalStats.guesses)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "fr"))
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }));
}

function loadPersonalStats() {
  const fallback = {
    played: 0,
    wins: 0,
    losses: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalWinAttempts: 0,
    distribution: [0, 0, 0, 0, 0, 0],
    guesses: {},
    lastResults: [],
    recordedGames: []
  };

  try {
    const parsed = JSON.parse(localStorage.getItem(personalStatsKey));
    if (!parsed || typeof parsed !== "object") return fallback;

    return {
      ...fallback,
      ...parsed,
      distribution: Array.isArray(parsed.distribution) && parsed.distribution.length === 6
        ? parsed.distribution
        : fallback.distribution,
      guesses: parsed.guesses && typeof parsed.guesses === "object" ? parsed.guesses : {},
      lastResults: Array.isArray(parsed.lastResults) ? parsed.lastResults : [],
      recordedGames: Array.isArray(parsed.recordedGames) ? parsed.recordedGames : []
    };
  } catch {
    return fallback;
  }
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
