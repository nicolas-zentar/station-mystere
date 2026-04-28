const key = new URLSearchParams(location.search).get("key") || "";
const adminGenerated = document.querySelector("#adminGenerated");
const adminActive = document.querySelector("#adminActive");
const adminDays = document.querySelector("#adminDays");

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
    adminDays.textContent = error.message;
  }
}

function renderAdminStats(data) {
  adminGenerated.textContent = new Date(data.generatedAt).toLocaleString("fr-FR");
  adminActive.textContent = `${data.activeGames} partie${data.activeGames > 1 ? "s" : ""} active${data.activeGames > 1 ? "s" : ""}`;
  adminDays.innerHTML = "";

  if (!data.days.length) {
    adminDays.textContent = "Aucune statistique pour l'instant.";
    return;
  }

  data.days.forEach((day) => {
    const card = document.createElement("article");
    card.className = "admin-day-card";

    const topGuesses = day.topGuesses.length
      ? day.topGuesses.map((guess) => `<span class="guess-chip">${escapeHtml(guess.name)} · ${guess.count}</span>`).join("")
      : "<span>Aucune tentative.</span>";

    card.innerHTML = `
      <div class="stats-head">
        <h2>${escapeHtml(day.dayKey)}</h2>
        <span>${escapeHtml(day.answer.name)}</span>
      </div>
      <div class="stats-grid">
        <div><span>Parties</span><strong>${day.started}</strong></div>
        <div><span>Terminées</span><strong>${day.completed}</strong></div>
        <div><span>Réussite</span><strong>${day.winRate}%</strong></div>
        <div><span>Victoires</span><strong>${day.wins}</strong></div>
        <div><span>Défaites</span><strong>${day.losses}</strong></div>
        <div><span>Moyenne</span><strong>${day.averageAttempts}</strong></div>
      </div>
      <div class="admin-distribution">${renderDistribution(day.distribution)}</div>
      <div class="top-guesses">
        <span>Tentatives les plus fréquentes</span>
        <div>${topGuesses}</div>
      </div>
    `;

    adminDays.append(card);
  });
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
