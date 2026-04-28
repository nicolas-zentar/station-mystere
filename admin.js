const key = new URLSearchParams(location.search).get("key") || "";
const adminGenerated = document.querySelector("#adminGenerated");
const adminActive = document.querySelector("#adminActive");
const adminDaily = document.querySelector("#adminDaily");
const adminRandom = document.querySelector("#adminRandom");

loadAdminStats();

async function loadAdminStats() {
  try {
    const response = await fetch(`/api/admin/stats?key=${encodeURIComponent(key)}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Accès refusé.");
    }

    renderAdminStats(data);
  } catch (error) {
    adminGenerated.textContent = "Erreur";
    adminActive.textContent = "Accès refusé";
    adminDaily.textContent = error.message;
    adminRandom.textContent = error.message;
  }
}

function renderAdminStats(data) {
  adminGenerated.textContent = new Date(data.generatedAt).toLocaleString("fr-FR");
  adminActive.textContent = `${data.activeGames} partie${data.activeGames > 1 ? "s" : ""} active${data.activeGames > 1 ? "s" : ""}`;

  const daily = data.modes?.find((mode) => mode.mode === "daily");
  const random = data.modes?.find((mode) => mode.mode === "random");
  renderModeStats(daily, adminDaily);
  renderModeStats(random, adminRandom);
}

function renderModeStats(modeData, node) {
  node.innerHTML = "";

  if (modeData?.mode === "random" && modeData.stationMenu?.length) {
    node.append(renderStationMenu(modeData.stationMenu));
  }

  if (!modeData?.days?.length) {
    const empty = document.createElement("p");
    empty.className = "admin-empty";
    empty.textContent = "Aucune partie terminée pour l'instant.";
    node.append(empty);
    return;
  }

  modeData.days.forEach((day) => {
    const card = document.createElement("article");
    card.className = "admin-day-card";

    const topGuesses = day.topGuesses.length
      ? day.topGuesses.map((guess) => `<span class="guess-chip">${escapeHtml(guess.name)} · ${guess.count}</span>`).join("")
      : "<span>Aucune tentative.</span>";

    const headingValue = modeData.mode === "daily"
      ? escapeHtml(day.answer.name)
      : `${day.completed} partie${day.completed > 1 ? "s" : ""}`;

    card.innerHTML = `
      <div class="stats-head">
        <h2>${escapeHtml(day.dayKey)}</h2>
        <span>${headingValue}</span>
      </div>
      <div class="stats-grid">
        <div><span>Terminées</span><strong>${day.completed}</strong></div>
        <div><span>Réussite</span><strong>${day.winRate}%</strong></div>
        <div><span>Victoires</span><strong>${day.wins}</strong></div>
        <div><span>Défaites</span><strong>${day.losses}</strong></div>
        <div><span>Moyenne</span><strong>${day.averageAttempts}</strong></div>
      </div>
      <div class="admin-distribution">${renderDistribution(day.distribution)}</div>
      ${modeData.mode === "random" ? renderDifficultyBreakdown(day.difficulties) : ""}
      <div class="top-guesses">
        <span>Tentatives les plus fréquentes</span>
        <div>${topGuesses}</div>
      </div>
    `;

    node.append(card);
  });
}

function renderStationMenu(groups) {
  let selected = groups.find((group) => group.difficulty === "easy") || groups[0];
  const card = document.createElement("article");
  card.className = "admin-day-card admin-station-menu";

  const head = document.createElement("div");
  head.className = "stats-head";
  head.innerHTML = `
    <h2>Stations par difficulté</h2>
    <span>Réponses jouées</span>
  `;

  const tabs = document.createElement("div");
  tabs.className = "admin-tabs";

  const summary = document.createElement("p");
  summary.className = "admin-station-summary";

  const list = document.createElement("div");
  list.className = "admin-station-list";

  function renderSelected() {
    tabs.querySelectorAll("button").forEach((button) => {
      const active = button.dataset.difficulty === selected.difficulty;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    summary.textContent = `${selected.stationCount} stations · ${selected.played} partie${selected.played > 1 ? "s" : ""} terminée${selected.played > 1 ? "s" : ""}`;
    list.innerHTML = "";

    selected.stations.forEach((station) => {
      const row = document.createElement("div");
      row.className = "admin-station-row";

      const name = document.createElement("span");
      name.textContent = station.name;

      const count = document.createElement("strong");
      count.textContent = station.count;

      row.append(name, count);
      list.append(row);
    });
  }

  groups.forEach((group) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.difficulty = group.difficulty;
    button.textContent = group.label;
    button.addEventListener("click", () => {
      selected = group;
      renderSelected();
    });
    tabs.append(button);
  });

  card.append(head, tabs, summary, list);
  renderSelected();
  return card;
}

function renderDifficultyBreakdown(difficulties) {
  if (!difficulties?.length) return "";
  const rows = difficulties
    .filter((difficulty) => difficulty.completed)
    .map((difficulty) => `
      <span class="guess-chip">${escapeHtml(difficulty.label)} · ${difficulty.completed} · ${difficulty.winRate}%</span>
    `)
    .join("");

  if (!rows) return "";

  return `
    <div class="top-guesses admin-breakdown">
      <span>Par difficulté</span>
      <div>${rows}</div>
    </div>
  `;
}

function renderDistribution(distribution) {
  const max = Math.max(...distribution, 1);
  return distribution.map((count, index) => `
    <div class="distribution-row">
      <span>${index + 1}</span>
      <div class="distribution-bar"><i style="width: ${Math.max((count / max) * 100, count ? 9 : 0)}%"></i></div>
      <strong>${count}</strong>
    </div>
  `).join("");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  })[char]);
}
