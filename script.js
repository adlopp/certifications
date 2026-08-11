const I18N = {
  es: {
    pageTitle: "Certificaciones",
    siteTitle: "Certificaciones",
    heroSubtitle: "Un registro visual de mis certificaciones.",
    searchPlaceholder: "Buscar certificaciones...",
    sortNewest: "Más recientes",
    sortOldest: "Más antiguas",
    loadMore: "Cargar más",
    issuerAll: "Todos los emisores",
    emptyState: "No se encontraron certificaciones.",
    footerText: "Hecho con vanilla HTML, CSS y JS.",
    statTotal: "Certificaciones",
    statIssuers: "Emisores",
    credentialId: "ID de credencial",
    issuedOn: "Emitido",
    verifyLink: "Ver credencial"
  },
  en: {
    pageTitle: "Certifications",
    siteTitle: "Certifications",
    heroSubtitle: "A visual record of my certifications.",
    searchPlaceholder: "Search certifications...",
    sortNewest: "Newest first",
    sortOldest: "Oldest first",
    loadMore: "Load more",
    issuerAll: "All issuers",
    emptyState: "No certifications found.",
    footerText: "Made with vanilla HTML, CSS and JS.",
    statTotal: "Certifications",
    statIssuers: "Issuers",
    credentialId: "Credential ID",
    issuedOn: "Issued",
    verifyLink: "View credential"
  }
};

const INITIAL_VISIBLE = 9;
const LOAD_MORE_STEP = 3;

let currentLang = localStorage.getItem("lang") || "es";
let currentSearch = "";
let sortOrder = "desc";
let visibleCount = INITIAL_VISIBLE;
let issuerFilter = "all";

function t(key) {
  return I18N[currentLang][key] || key;
}

function localized(field) {
  if (field && typeof field === "object") {
    return field[currentLang] || field.es || field.en || "";
  }
  return field || "";
}

function applyI18n() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  updateSortButton();
  if (issuerFilter === "all") {
    document.getElementById("issuerLabel").textContent = t("issuerAll");
  }
}

function updateSortButton() {
  document.getElementById("sortIcon").textContent = sortOrder === "desc" ? "↓" : "↑";
  document.getElementById("sortLabel").textContent = sortOrder === "desc" ? t("sortNewest") : t("sortOldest");
}

function toggleSortOrder() {
  sortOrder = sortOrder === "desc" ? "asc" : "desc";
  visibleCount = INITIAL_VISIBLE;
  updateSortButton();
  renderCards();
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
  renderIssuerDropdown();
  renderCards();
}

function renderStats() {
  const issuers = new Set(CERTIFICATIONS.map(c => c.issuer));
  const statsEl = document.getElementById("stats");
  statsEl.innerHTML = `
    <div class="stat"><div class="value">${CERTIFICATIONS.length}</div><div class="label">${t("statTotal")}</div></div>
    <div class="stat"><div class="value">${issuers.size}</div><div class="label">${t("statIssuers")}</div></div>
  `;
}

function getFilteredCertifications() {
  const query = currentSearch.trim().toLowerCase();
  const filtered = CERTIFICATIONS.filter(c => {
    const matchesIssuer = issuerFilter === "all" || c.issuer === issuerFilter;
    const matchesQuery = !query ||
      localized(c.title).toLowerCase().includes(query) ||
      c.issuer.toLowerCase().includes(query);
    return matchesIssuer && matchesQuery;
  });
  return filtered.sort((a, b) => {
    const diff = new Date(a.date) - new Date(b.date);
    return sortOrder === "desc" ? -diff : diff;
  });
}

function renderIssuerDropdown() {
  const container = document.getElementById("issuerDropdown");
  const issuers = Array.from(new Set(CERTIFICATIONS.map(c => c.issuer))).sort();

  const allItem = `<div data-issuer="all">${t("issuerAll")}</div>`;
  const items = issuers.map(name => `<div data-issuer="${name}">${name}</div>`).join("");
  container.innerHTML = allItem + items;

  container.querySelectorAll("div").forEach(el => {
    el.addEventListener("click", () => {
      issuerFilter = el.dataset.issuer;
      document.getElementById("issuerLabel").textContent = issuerFilter === "all" ? t("issuerAll") : issuerFilter;
      container.classList.add("hidden");
      visibleCount = INITIAL_VISIBLE;
      renderCards();
    });
  });
}

function toggleIssuerDropdown() {
  document.getElementById("issuerDropdown").classList.toggle("hidden");
}

function cardImageHtml(cert) {
  if (cert.image) {
    return `<img class="card-image" src="${cert.image}" alt="${localized(cert.title)}">`;
  }
  return `<div class="card-image">🏅</div>`;
}

function buildCard(cert) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.id = cert.id;
  card.innerHTML = `
    ${cardImageHtml(cert)}
    <h3>${localized(cert.title)}</h3>
    <div class="issuer">${cert.issuer}</div>
    <div class="date">${formatDate(cert.date)}</div>
  `;
  card.addEventListener("click", () => openModal(cert));
  return card;
}

function renderCards() {
  const grid = document.getElementById("cardsGrid");
  const emptyState = document.getElementById("emptyState");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const fullList = getFilteredCertifications();
  const list = fullList.slice(0, visibleCount);

  grid.innerHTML = "";

  if (fullList.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }

  loadMoreBtn.classList.toggle("hidden", visibleCount >= fullList.length);

  list.forEach(cert => grid.appendChild(buildCard(cert)));

  observeCards();
}

function loadMore() {
  const grid = document.getElementById("cardsGrid");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const fullList = getFilteredCertifications();
  const previousCount = visibleCount;
  visibleCount += LOAD_MORE_STEP;

  const newCerts = fullList.slice(previousCount, visibleCount);
  newCerts.forEach(cert => grid.appendChild(buildCard(cert)));

  loadMoreBtn.classList.toggle("hidden", visibleCount >= fullList.length);
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
  const description = localized(cert.description);
  body.innerHTML = `
    ${cardImageHtml(cert)}
    <h2>${localized(cert.title)}</h2>
    <div class="issuer">${cert.issuer}</div>
    ${description ? `<p>${description}</p>` : ""}
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
    localized(c.title).toLowerCase().includes(query) || c.issuer.toLowerCase().includes(query)
  ).slice(0, 6);

  if (matches.length === 0) {
    container.classList.add("hidden");
    container.innerHTML = "";
    return;
  }

  container.innerHTML = matches.map(c => `<div data-id="${c.id}">${localized(c.title)} — <em>${c.issuer}</em></div>`).join("");
  container.classList.remove("hidden");

  container.querySelectorAll("div").forEach(el => {
    el.addEventListener("click", () => {
      const cert = CERTIFICATIONS.find(c => c.id === el.dataset.id);
      if (cert) {
        const searchInput = document.getElementById("searchInput");
        searchInput.value = localized(cert.title);
        currentSearch = searchInput.value;
        visibleCount = INITIAL_VISIBLE;
        updateSearchClearVisibility();
        renderCards();
      }
      container.classList.add("hidden");
    });
  });
}

function updateSearchClearVisibility() {
  document.getElementById("searchClear").classList.toggle("hidden", currentSearch.trim() === "");
}

function clearSearch() {
  const searchInput = document.getElementById("searchInput");
  searchInput.value = "";
  currentSearch = "";
  visibleCount = INITIAL_VISIBLE;
  updateSearchClearVisibility();
  document.getElementById("searchSuggestions").classList.add("hidden");
  renderCards();
  searchInput.focus();
}

function initEvents() {
  document.getElementById("logoHome").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    currentSearch = "";
    issuerFilter = "all";
    document.getElementById("issuerLabel").textContent = t("issuerAll");
    visibleCount = INITIAL_VISIBLE;
    updateSearchClearVisibility();
    document.getElementById("searchSuggestions").classList.add("hidden");
    renderCards();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
  document.getElementById("langToggle").addEventListener("click", toggleLang);
  document.getElementById("sortToggle").addEventListener("click", toggleSortOrder);
  document.getElementById("loadMoreBtn").addEventListener("click", loadMore);
  document.getElementById("issuerToggle").addEventListener("click", toggleIssuerDropdown);
  document.getElementById("searchClear").addEventListener("click", clearSearch);
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
    visibleCount = INITIAL_VISIBLE;
    updateSearchClearVisibility();
    renderCards();
    renderSearchSuggestions();
    if (currentSearch.trim().toLowerCase() === "eva guapa") {
      document.getElementById("easterEggOverlay").classList.remove("hidden");
    }
  });

  document.getElementById("easterEggOverlay").addEventListener("click", () => {
    document.getElementById("easterEggOverlay").classList.add("hidden");
  });
  document.addEventListener("click", e => {
    if (!e.target.closest(".search-wrap")) {
      document.getElementById("searchSuggestions").classList.add("hidden");
    }
    if (!e.target.closest(".issuer-filter-wrap")) {
      document.getElementById("issuerDropdown").classList.add("hidden");
    }
  });
}

function init() {
  initTheme();
  applyI18n();
  renderStats();
  renderIssuerDropdown();
  renderCards();
  initEvents();
}

document.addEventListener("DOMContentLoaded", init);
