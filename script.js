const I18N = {
  es: {
    pageTitle: "Certificaciones de IA",
    siteTitle: "🤖 Certificaciones de IA",
    heroSubtitle: "Un registro visual de mis certificaciones en Inteligencia Artificial.",
    searchPlaceholder: "Buscar certificaciones...",
    filterAll: "Todas",
    emptyState: "No se encontraron certificaciones.",
    footerText: "Hecho con vanilla HTML, CSS y JS.",
    statTotal: "Certificaciones",
    statIssuers: "Emisores",
    statCategories: "Categorías",
    credentialId: "ID de credencial",
    issuedOn: "Emitido",
    verifyLink: "Ver credencial"
  },
  en: {
    pageTitle: "AI Certifications",
    siteTitle: "🤖 AI Certifications",
    heroSubtitle: "A visual record of my Artificial Intelligence certifications.",
    searchPlaceholder: "Search certifications...",
    filterAll: "All",
    emptyState: "No certifications found.",
    footerText: "Made with vanilla HTML, CSS and JS.",
    statTotal: "Certifications",
    statIssuers: "Issuers",
    statCategories: "Categories",
    credentialId: "Credential ID",
    issuedOn: "Issued",
    verifyLink: "View credential"
  }
};

let currentLang = localStorage.getItem("lang") || "es";
let currentFilter = "all";
let currentSearch = "";

function t(key) {
  return I18N[currentLang][key] || key;
}

function applyI18n() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (allBtn) allBtn.textContent = t("filterAll");
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString(currentLang === "es" ? "es-ES" : "en-US", {
    year: "numeric", month: "short"
  });
}

function initTheme() {
  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  document.getElementById("themeToggle").textContent = saved === "dark" ? "☀️" : "🌙";
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  document.getElementById("themeToggle").textContent = next === "dark" ? "☀️" : "🌙";
}

function toggleLang() {
  currentLang = currentLang === "es" ? "en" : "es";
  localStorage.setItem("lang", currentLang);
  applyI18n();
  renderStats();
  renderFilters();
  renderCards();
}

function buildCategories() {
  const set = new Set(CERTIFICATIONS.map(c => c.category).filter(Boolean));
  return Array.from(set).sort();
}

function renderStats() {
  const issuers = new Set(CERTIFICATIONS.map(c => c.issuer));
  const categories = buildCategories();
  const statsEl = document.getElementById("stats");
  statsEl.innerHTML = `
    <div class="stat"><div class="value">${CERTIFICATIONS.length}</div><div class="label">${t("statTotal")}</div></div>
    <div class="stat"><div class="value">${issuers.size}</div><div class="label">${t("statIssuers")}</div></div>
    <div class="stat"><div class="value">${categories.length}</div><div class="label">${t("statCategories")}</div></div>
  `;
}

function renderFilters() {
  const container = document.getElementById("filters");
  const categories = buildCategories();
  container.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.className = "filter-btn" + (currentFilter === "all" ? " active" : "");
  allBtn.dataset.filter = "all";
  allBtn.textContent = t("filterAll");
  container.appendChild(allBtn);

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (currentFilter === cat ? " active" : "");
    btn.dataset.filter = cat;
    btn.textContent = cat;
    container.appendChild(btn);
  });

  container.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentFilter = btn.dataset.filter;
      renderFilters();
      renderCards();
    });
  });
}

function getFilteredCertifications() {
  const query = currentSearch.trim().toLowerCase();
  return CERTIFICATIONS.filter(c => {
    const matchesFilter = currentFilter === "all" || c.category === currentFilter;
    const matchesSearch = !query ||
      c.title.toLowerCase().includes(query) ||
      c.issuer.toLowerCase().includes(query) ||
      (c.category || "").toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });
}

function cardImageHtml(cert) {
  if (cert.image) {
    return `<img class="card-image" src="${cert.image}" alt="${cert.title}">`;
  }
  return `<div class="card-image">🏅</div>`;
}

function renderCards() {
  const grid = document.getElementById("cardsGrid");
  const emptyState = document.getElementById("emptyState");
  const list = getFilteredCertifications();

  grid.innerHTML = "";

  if (list.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }

  list.forEach(cert => {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = cert.id;
    card.innerHTML = `
      ${cardImageHtml(cert)}
      <span class="card-category">${cert.category || ""}</span>
      <h3>${cert.title}</h3>
      <div class="issuer">${cert.issuer}</div>
      <div class="date">${formatDate(cert.date)}</div>
    `;
    card.addEventListener("click", () => openModal(cert));
    grid.appendChild(card);
  });

  observeCards();
}

function observeCards() {
  const cards = document.querySelectorAll(".card");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(card => observer.observe(card));
}

function openModal(cert) {
  const overlay = document.getElementById("modalOverlay");
  const body = document.getElementById("modalBody");
  body.innerHTML = `
    ${cardImageHtml(cert)}
    <span class="card-category">${cert.category || ""}</span>
    <h2>${cert.title}</h2>
    <div class="issuer">${cert.issuer}</div>
    ${cert.description ? `<p>${cert.description}</p>` : ""}
    <div class="meta-row"><span>${t("issuedOn")}</span><span>${formatDate(cert.date)}</span></div>
    ${cert.credentialId ? `<div class="meta-row"><span>${t("credentialId")}</span><span>${cert.credentialId}</span></div>` : ""}
    ${cert.credentialUrl ? `<a class="verify-link" href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer">${t("verifyLink")}</a>` : ""}
  `;
  overlay.classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modalOverlay").classList.add("hidden");
}

function renderSearchSuggestions() {
  const container = document.getElementById("searchSuggestions");
  const query = currentSearch.trim().toLowerCase();
  if (!query) {
    container.classList.add("hidden");
    container.innerHTML = "";
    return;
  }
  const matches = CERTIFICATIONS.filter(c =>
    c.title.toLowerCase().includes(query) || c.issuer.toLowerCase().includes(query)
  ).slice(0, 6);

  if (matches.length === 0) {
    container.classList.add("hidden");
    container.innerHTML = "";
    return;
  }

  container.innerHTML = matches.map(c => `<div data-id="${c.id}">${c.title} — <em>${c.issuer}</em></div>`).join("");
  container.classList.remove("hidden");

  container.querySelectorAll("div").forEach(el => {
    el.addEventListener("click", () => {
      const cert = CERTIFICATIONS.find(c => c.id === el.dataset.id);
      if (cert) openModal(cert);
      container.classList.add("hidden");
    });
  });
}

function initEvents() {
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
  document.getElementById("langToggle").addEventListener("click", toggleLang);
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalOverlay").addEventListener("click", e => {
    if (e.target.id === "modalOverlay") closeModal();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", e => {
    currentSearch = e.target.value;
    renderCards();
    renderSearchSuggestions();
  });
  document.addEventListener("click", e => {
    if (!e.target.closest(".search-wrap")) {
      document.getElementById("searchSuggestions").classList.add("hidden");
    }
  });
}

function init() {
  initTheme();
  applyI18n();
  renderStats();
  renderFilters();
  renderCards();
  initEvents();
}

document.addEventListener("DOMContentLoaded", init);
