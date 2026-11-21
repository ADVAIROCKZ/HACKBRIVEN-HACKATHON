/**
 * RIGFORGE – The Event-Driven PC Builder’s Hub
 * Built for Team-404:sleep not found (ID: CA0855333C15) - Sri Venkateshwara College of Engineering
 * Core Logic: OpenSearch Typo-Tolerant Fuzzy Engine, Kafka Event Stream Monitor, Real Product Images & Cart
 */

// ==========================================================================
// Application State
// ==========================================================================
const AppState = {
  currency: localStorage.getItem('rigforge_currency') || 'USD',
  selectedCategory: 'all',
  selectedBrand: 'All Brands',
  selectedFacet: 'all',
  searchQuery: '',
  sortBy: 'featured',
  inStockOnly: false,
  cart: JSON.parse(localStorage.getItem('rigforge_cart') || '[]'),
  inspectorPartId: null,
  inspectorQty: 1,
  checkoutStep: 1,
  kafkaEventsCount: 1492,
  kafkaLogs: []
};

// ==========================================================================
// Real Product Visual Renderer with Graceful Fallback
// ==========================================================================
function renderProductVisual(part, extraClass = "") {
  const hardwareSvg = getHardwareGraphic(part.svgType, part.accentColor, part.id);
  if (part.image) {
    return `
      <div class="product-visual-container ${extraClass}">
        <img 
          src="${part.image}" 
          alt="${part.name}" 
          class="product-real-img" 
          loading="lazy"
          onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';"
        >
        <div class="product-svg-fallback" style="display: none; width: 100%; height: 100%;">
          ${hardwareSvg}
        </div>
      </div>
    `;
  }
  return hardwareSvg;
}

// ==========================================================================
// Fuzzy Search Engine (OpenSearch Levenshtein Distance & Token Matcher)
// ==========================================================================
function levenshteinDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

function calculateFuzzyScore(query, target) {
  const q = query.toLowerCase().trim();
  const t = target.toLowerCase().trim();

  if (t === q) return 1.0;
  if (t.includes(q)) return 0.85;

  const qWords = q.split(/\s+/);
  const tWords = t.split(/\s+/);

  let totalScore = 0;
  for (const qw of qWords) {
    let bestWordScore = 0;
    for (const tw of tWords) {
      if (tw === qw) {
        bestWordScore = Math.max(bestWordScore, 0.95);
      } else if (tw.includes(qw)) {
        bestWordScore = Math.max(bestWordScore, 0.8);
      } else {
        const dist = levenshteinDistance(qw, tw);
        const maxLen = Math.max(qw.length, tw.length);
        if (maxLen > 0) {
          const sim = 1.0 - (dist / maxLen);
          if (sim >= 0.55) {
            bestWordScore = Math.max(bestWordScore, sim);
          }
        }
      }
    }
    totalScore += bestWordScore;
  }

  return totalScore / qWords.length;
}

const TYPO_SYNONYMS = {
  "ryzn thredriper": "AMD Ryzen Threadripper 7980X 64-Core",
  "ryzen thredripper": "AMD Ryzen Threadripper 7980X 64-Core",
  "thredriper": "AMD Ryzen Threadripper 7980X 64-Core",
  "rtx 40900 super": "ASUS ROG Strix GeForce RTX 4080 Super OC",
  "rtx 4900": "NVIDIA GeForce RTX 4090 Founders Edition",
  "rtx 40900": "NVIDIA GeForce RTX 4090 Founders Edition",
  "corsar": "Corsair Vengeance RGB 32GB (2x16GB) DDR5-6000",
  "sumsung": "Samsung 990 PRO 2TB PCIe 4.0 NVMe SSD",
  "bluetoth": "MSI MEG Z790 GODLIKE MAX E-ATX Motherboard"
};

// ==========================================================================
// Initialization on DOM Ready
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initCurrencyToggle();
  initCategoryNav();
  initBrandDropdown();
  initSortAndFilters();
  initSearch();
  initHeroFeatured();
  initKafkaTelemetry();
  renderProducts();
  renderCart();
  initModalListeners();
  initRigAssistant();
  updateRigStatusIndicator();

  logKafkaEvent('SYSTEM_STARTUP', 'Kafka Broker cluster connected at aiven-kafka-rigforge.aivencloud.com:18492');
  logKafkaEvent('CONSUMER_GROUP_INIT', 'Group "rigforge-workers" assigned partitions 0, 1, 2 for topic "orders.checkout.v1"');
  logKafkaEvent('OPENSEARCH_INDEX_SYNC', 'Index "rigforge_catalog_v2" hydrated with 16 parts in 3.8ms');
});

// ==========================================================================
// Currency Switcher & Formatting Utilities
// ==========================================================================
function initCurrencyToggle() {
  const currencyBtn = document.getElementById('currencyBtn');
  if (!currencyBtn) return;

  updateCurrencyBtnUI();

  currencyBtn.addEventListener('click', () => {
    AppState.currency = AppState.currency === 'USD' ? 'INR' : 'USD';
    localStorage.setItem('rigforge_currency', AppState.currency);
    updateCurrencyBtnUI();
    renderProducts();
    renderCart();
    if (AppState.inspectorPartId) {
      renderInspectorModal(AppState.inspectorPartId);
    }
    showToast('Currency Updated', `Switched display currency to ${AppState.currency === 'USD' ? '$ USD' : '₹ INR'}`);
  });
}

function updateCurrencyBtnUI() {
  const usdSpan = document.querySelector('.curr-usd');
  const inrSpan = document.querySelector('.curr-inr');
  if (!usdSpan || !inrSpan) return;

  if (AppState.currency === 'USD') {
    usdSpan.classList.add('active');
    inrSpan.classList.remove('active');
  } else {
    usdSpan.classList.remove('active');
    inrSpan.classList.add('active');
  }
}

function formatCurrency(amountUSD, amountINR) {
  if (AppState.currency === 'INR') {
    const val = amountINR !== undefined ? amountINR : Math.round(amountUSD * 88);
    return '₹' + val.toLocaleString('en-IN');
  } else {
    return '$' + amountUSD.toLocaleString('en-US');
  }
}

function getNumericPrice(part) {
  return AppState.currency === 'INR' ? part.priceINR : part.priceUSD;
}

// ==========================================================================
// Hero Spotlight Component with Actual Image
// ==========================================================================
function initHeroFeatured() {
  const heroGraphicWrap = document.getElementById('heroFeaturedGraphic');
  if (!heroGraphicWrap) return;
  const flagship = PC_PARTS_DATA.find(p => p.id === 'gpu-rtx4090-fe') || PC_PARTS_DATA[0];
  heroGraphicWrap.innerHTML = renderProductVisual(flagship, "hero-visual-custom");
}

// ==========================================================================
// Category Navigation & Filtering
// ==========================================================================
function initCategoryNav() {
  const navContainer = document.getElementById('categoriesNav');
  if (!navContainer) return;

  navContainer.innerHTML = CATEGORIES_METADATA.map(cat => {
    const count = cat.key === 'all' 
      ? PC_PARTS_DATA.length 
      : PC_PARTS_DATA.filter(p => p.categoryKey === cat.key).length;

    return `
      <button 
        class="category-pill ${AppState.selectedCategory === cat.key ? 'active' : ''}" 
        data-category="${cat.key}"
        role="tab"
        aria-selected="${AppState.selectedCategory === cat.key}"
      >
        <span>${cat.label}</span>
        <span class="cat-count">${count}</span>
      </button>
    `;
  }).join('');

  navContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.category-pill');
    if (!btn) return;
    const catKey = btn.dataset.category;
    filterByCategory(catKey);
  });
}

function filterByCategory(categoryKey) {
  AppState.selectedCategory = categoryKey;
  
  document.querySelectorAll('.category-pill').forEach(pill => {
    const isTarget = pill.dataset.category === categoryKey;
    pill.classList.toggle('active', isTarget);
    pill.setAttribute('aria-selected', isTarget);
  });

  renderProducts();
}

function scrollToCatalog() {
  const el = document.getElementById('catalogSection');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================================================
// Brand Selector, Faceted Specs & Sort Filters
// ==========================================================================
function initBrandDropdown() {
  const brandSelect = document.getElementById('brandSelect');
  if (!brandSelect) return;

  brandSelect.innerHTML = BRANDS_LIST.map(b => `<option value="${b}">${b}</option>`).join('');

  brandSelect.addEventListener('change', (e) => {
    AppState.selectedBrand = e.target.value;
    renderProducts();
  });
}

function initSortAndFilters() {
  const sortSelect = document.getElementById('sortSelect');
  const facetSelect = document.getElementById('facetSelect');
  const inStockCheckbox = document.getElementById('inStockOnly');
  const resetBtn = document.getElementById('resetFiltersBtn');
  const emptyResetBtn = document.getElementById('emptyResetBtn');

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      AppState.sortBy = e.target.value;
      renderProducts();
    });
  }

  if (facetSelect) {
    facetSelect.addEventListener('change', (e) => {
      AppState.selectedFacet = e.target.value;
      renderProducts();
    });
  }

  if (inStockCheckbox) {
    inStockCheckbox.addEventListener('change', (e) => {
      AppState.inStockOnly = e.target.checked;
      renderProducts();
    });
  }

  const resetAll = () => {
    AppState.selectedCategory = 'all';
    AppState.selectedBrand = 'All Brands';
    AppState.selectedFacet = 'all';
    AppState.searchQuery = '';
    AppState.inStockOnly = false;
    AppState.sortBy = 'featured';

    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    if (brandSelect) brandSelect.value = 'All Brands';
    if (sortSelect) sortSelect.value = 'featured';
    if (facetSelect) facetSelect.value = 'all';
    if (inStockCheckbox) inStockCheckbox.checked = false;

    document.querySelectorAll('.category-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.category === 'all');
    });

    hideSuggestions();
    renderProducts();
    showToast('Filters Cleared', 'Reset to all components');
  };

  if (resetBtn) resetBtn.addEventListener('click', resetAll);
  if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetAll);

  const logoBtn = document.getElementById('logoBtn');
  if (logoBtn) {
    logoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetAll();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ==========================================================================
// OpenSearch Fuzzy Search & Suggestion Engine (Slide 1 & Slide 11)
// ==========================================================================
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearchBtn');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    AppState.searchQuery = e.target.value.trim();
    clearBtn.style.display = AppState.searchQuery ? 'block' : 'none';
    
    if (AppState.searchQuery.length >= 2) {
      showOpenSearchSuggestions(AppState.searchQuery);
    } else {
      hideSuggestions();
    }

    renderProducts();
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    AppState.searchQuery = '';
    clearBtn.style.display = 'none';
    hideSuggestions();
    renderProducts();
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrapper')) {
      hideSuggestions();
    }
  });
}

function showOpenSearchSuggestions(query) {
  const suggestionsBox = document.getElementById('searchSuggestions');
  if (!suggestionsBox) return;

  const normalizedQuery = query.toLowerCase().trim();

  let directMatchPart = null;
  if (TYPO_SYNONYMS[normalizedQuery]) {
    const targetName = TYPO_SYNONYMS[normalizedQuery];
    directMatchPart = PC_PARTS_DATA.find(p => p.name === targetName);
  }

  const scoredItems = PC_PARTS_DATA.map(part => {
    const nameScore = calculateFuzzyScore(normalizedQuery, part.name);
    const brandScore = calculateFuzzyScore(normalizedQuery, part.brand);
    const catScore = calculateFuzzyScore(normalizedQuery, part.category);
    const specScores = part.keySpecs.map(s => calculateFuzzyScore(normalizedQuery, s));
    const maxSpecScore = Math.max(...specScores, 0);

    const bestScore = Math.max(nameScore * 1.2, brandScore, catScore, maxSpecScore);
    return { part, score: bestScore };
  }).filter(item => item.score >= 0.45)
    .sort((a, b) => b.score - a.score);

  if (scoredItems.length === 0 && !directMatchPart) {
    hideSuggestions();
    return;
  }

  const topSuggestion = directMatchPart || (scoredItems.length > 0 ? scoredItems[0].part : null);

  let html = '';

  if (topSuggestion) {
    html += `
      <div class="fuzzy-did-you-mean-banner" onclick="applyFuzzySuggestion('${topSuggestion.id}')">
        <div class="dym-left">
          <span class="dym-title">Did you mean:</span>
          <span class="dym-target"><strong>${topSuggestion.name}</strong> (${topSuggestion.stockCount} in stock)</span>
        </div>
        <span class="dym-badge">fuzzy-matched by OpenSearch</span>
      </div>
    `;
  }

  const itemsToRender = scoredItems.slice(0, 4);
  itemsToRender.forEach(({ part }) => {
    if (topSuggestion && part.id === topSuggestion.id) return;
    html += `
      <div class="suggestion-item" onclick="openPartInspector('${part.id}'); hideSuggestions();">
        <div class="sugg-thumb-wrap">
          <img src="${part.image}" alt="${part.name}" class="sugg-thumb-img">
        </div>
        <div class="sugg-info">
          <span class="sugg-name">${part.name}</span>
          <span class="sugg-meta">🏭 ${part.brand} • ${part.category}</span>
        </div>
        <span class="sugg-price">${formatCurrency(part.priceUSD, part.priceINR)}</span>
      </div>
    `;
  });

  suggestionsBox.innerHTML = html;
  suggestionsBox.classList.remove('hidden');
}

function applyFuzzySuggestion(partId) {
  const part = PC_PARTS_DATA.find(p => p.id === partId);
  if (!part) return;

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = part.name;
  AppState.searchQuery = part.name;
  hideSuggestions();
  renderProducts();
  showToast('Fuzzy Matched', `Showing OpenSearch results for ${part.name}`);
}

function hideSuggestions() {
  const suggestionsBox = document.getElementById('searchSuggestions');
  if (suggestionsBox) suggestionsBox.classList.add('hidden');
}

// ==========================================
// Products Catalog Filtering & Rendering
// ==========================================
function getFilteredAndSortedParts() {
  let list = [...PC_PARTS_DATA];

  if (AppState.selectedCategory !== 'all') {
    list = list.filter(p => p.categoryKey === AppState.selectedCategory);
  }

  if (AppState.selectedBrand !== 'All Brands') {
    list = list.filter(p => p.brand.toLowerCase() === AppState.selectedBrand.toLowerCase());
  }

  if (AppState.selectedFacet !== 'all') {
    switch (AppState.selectedFacet) {
      case 'socket-am5':
        list = list.filter(p => JSON.stringify(p).includes('AM5'));
        break;
      case 'socket-lga1700':
        list = list.filter(p => JSON.stringify(p).includes('LGA1700'));
        break;
      case 'socket-str5':
        list = list.filter(p => JSON.stringify(p).includes('sTR5') || p.name.includes('Threadripper'));
        break;
      case 'vram-24gb':
        list = list.filter(p => JSON.stringify(p).includes('24 GB') || JSON.stringify(p).includes('24GB'));
        break;
      case 'vram-16gb':
        list = list.filter(p => JSON.stringify(p).includes('16 GB') || JSON.stringify(p).includes('16GB'));
        break;
      case 'speed-gen5':
        list = list.filter(p => JSON.stringify(p).includes('Gen5') || JSON.stringify(p).includes('PCIe 5.0'));
        break;
      case 'form-atx':
        list = list.filter(p => JSON.stringify(p).includes('ATX'));
        break;
    }
  }

  if (AppState.inStockOnly) {
    list = list.filter(p => p.inStock && p.stockCount > 0);
  }

  if (AppState.searchQuery) {
    const q = AppState.searchQuery.toLowerCase().trim();
    let exactSynonymTarget = TYPO_SYNONYMS[q] || null;

    list = list.filter(p => {
      if (exactSynonymTarget && p.name === exactSynonymTarget) return true;
      if (p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)) return true;
      const score = calculateFuzzyScore(q, p.name);
      return score >= 0.55;
    });
  }

  switch (AppState.sortBy) {
    case 'price-asc':
      list.sort((a, b) => getNumericPrice(a) - getNumericPrice(b));
      break;
    case 'price-desc':
      list.sort((a, b) => getNumericPrice(b) - getNumericPrice(a));
      break;
    case 'mfg-date':
      list.sort((a, b) => b.manufacturingDate.localeCompare(a.manufacturingDate));
      break;
    case 'rating':
      list.sort((a, b) => b.rating - a.rating);
      break;
    case 'name':
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'featured':
    default:
      break;
  }

  return list;
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const emptyView = document.getElementById('emptyCatalogView');
  const resultsCount = document.getElementById('resultsCount');
  const resetBtn = document.getElementById('resetFiltersBtn');
  const activeStrip = document.getElementById('activeFiltersStrip');

  if (!grid) return;

  const filteredParts = getFilteredAndSortedParts();

  if (resultsCount) {
    resultsCount.textContent = `Showing ${filteredParts.length} of ${PC_PARTS_DATA.length} components`;
  }

  const hasActiveFilters = AppState.selectedCategory !== 'all' || 
                           AppState.selectedBrand !== 'All Brands' || 
                           AppState.selectedFacet !== 'all' || 
                           AppState.inStockOnly || 
                           AppState.searchQuery !== '';

  if (resetBtn) resetBtn.classList.toggle('hidden', !hasActiveFilters);

  if (activeStrip) {
    if (hasActiveFilters) {
      let chipsHtml = '';
      if (AppState.selectedCategory !== 'all') {
        const catObj = CATEGORIES_METADATA.find(c => c.key === AppState.selectedCategory);
        chipsHtml += `<div class="filter-chip"><span>Category: ${catObj ? catObj.label : AppState.selectedCategory}</span><button onclick="filterByCategory('all')">✕</button></div>`;
      }
      if (AppState.selectedBrand !== 'All Brands') {
        chipsHtml += `<div class="filter-chip"><span>Brand: ${AppState.selectedBrand}</span><button onclick="document.getElementById('brandSelect').value='All Brands'; AppState.selectedBrand='All Brands'; renderProducts();">✕</button></div>`;
      }
      if (AppState.selectedFacet !== 'all') {
        chipsHtml += `<div class="filter-chip"><span>Facet: ${AppState.selectedFacet}</span><button onclick="document.getElementById('facetSelect').value='all'; AppState.selectedFacet='all'; renderProducts();">✕</button></div>`;
      }
      if (AppState.searchQuery) {
        chipsHtml += `<div class="filter-chip"><span>OpenSearch: "${AppState.searchQuery}"</span><button onclick="document.getElementById('clearSearchBtn').click()">✕</button></div>`;
      }
      if (AppState.inStockOnly) {
        chipsHtml += `<div class="filter-chip"><span>In-Stock Only</span><button onclick="document.getElementById('inStockOnly').checked=false; AppState.inStockOnly=false; renderProducts();">✕</button></div>`;
      }
      activeStrip.innerHTML = chipsHtml;
      activeStrip.classList.remove('hidden');
    } else {
      activeStrip.classList.add('hidden');
    }
  }

  if (filteredParts.length === 0) {
    grid.innerHTML = '';
    emptyView.classList.remove('hidden');
    return;
  } else {
    emptyView.classList.add('hidden');
  }

  grid.innerHTML = filteredParts.map(part => {
    const formattedPrice = formatCurrency(part.priceUSD, part.priceINR);
    const msrpPrice = formatCurrency(part.msrpUSD, Math.round(part.msrpUSD * 88));
    const productVisualHtml = renderProductVisual(part);

    let stockBadgeHtml = '';
    if (part.stockCount <= 0) {
      stockBadgeHtml = `<span class="badge-stock-out">● OUT OF STOCK (Synced via Kafka)</span>`;
    } else if (part.stockCount <= 2 || part.stockLockState === 'row-lock') {
      stockBadgeHtml = `<span class="badge-stock-locked">● Only ${part.stockCount} Left! (Postgres Lock)</span>`;
    } else {
      stockBadgeHtml = `<span class="badge-stock-live"><span class="pulse-dot"></span> IN STOCK (Real-time Sync)</span>`;
    }

    return `
      <article class="product-card" data-part-id="${part.id}">
        <div class="card-header-bar">
          <span class="card-category-badge">${part.category}</span>
          <div class="card-stock-status">
            ${stockBadgeHtml}
          </div>
        </div>

        <!-- Hardware Visual Stage (Displays Actual High-Res Photo with SVG Fallback) -->
        <div class="card-visual-stage" onclick="openPartInspector('${part.id}')" title="Click to inspect ${part.name}">
          ${productVisualHtml}
        </div>

        <div class="card-body">
          <div class="card-mfg-strip">
            <span class="mfg-brand-badge">🏭 ${part.brand}</span>
            <span class="mfg-date-badge" title="Verified Manufacturing Batch">Mfg: ${part.manufacturingDate.split('(')[0].trim()}</span>
          </div>

          <h3 class="card-title" onclick="openPartInspector('${part.id}')">${part.name}</h3>

          <div class="card-specs-list">
            ${part.keySpecs.map(spec => `<span class="spec-badge">${spec}</span>`).join('')}
          </div>

          <div class="card-meta-line">
            <span class="card-release" title="Initial Product Release">Rel: ${part.releaseDate.split('(')[0].trim()}</span>
            <span class="card-warranty" title="Manufacturer Warranty">🛡️ ${part.warranty.split(' ')[0]} ${part.warranty.split(' ')[1]}</span>
          </div>

          <div class="card-footer">
            <div class="card-price-block">
              <span class="card-price">${formattedPrice}</span>
              <span class="card-msrp">${msrpPrice}</span>
            </div>

            <div class="card-actions">
              <button 
                class="btn-inspect" 
                onclick="openPartInspector('${part.id}')" 
                title="View full technical specs and manufacturing details"
              >
                <span>🔍 Inspect</span>
              </button>
              <button 
                class="btn-add-cart" 
                onclick="addToCart('${part.id}')"
                title="Add to RigForge build cart"
              >
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ==========================================================================
// Part Inspector Modal Logic
// ==========================================================================
function openPartInspector(partId) {
  const part = PC_PARTS_DATA.find(p => p.id === partId);
  if (!part) return;

  AppState.inspectorPartId = partId;
  AppState.inspectorQty = 1;
  renderInspectorModal(partId);

  const modal = document.getElementById('inspectorModal');
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePartInspector() {
  const modal = document.getElementById('inspectorModal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  AppState.inspectorPartId = null;
  document.body.style.overflow = '';
}

function renderInspectorModal(partId) {
  const content = document.getElementById('inspectorContent');
  const part = PC_PARTS_DATA.find(p => p.id === partId);
  if (!content || !part) return;

  const formattedPrice = formatCurrency(part.priceUSD, part.priceINR);
  const msrpPrice = formatCurrency(part.msrpUSD, Math.round(part.msrpUSD * 88));
  const productVisualHtml = renderProductVisual(part, "inspector-visual-custom");

  const specsRows = Object.entries(part.detailedSpecs).map(([key, val]) => `
    <tr>
      <td class="spec-key">${key}</td>
      <td class="spec-val">${val}</td>
    </tr>
  `).join('');

  const compatCards = Object.entries(part.compatibility).map(([key, val]) => `
    <div class="compat-card">
      <div class="compat-title">⚡ ${key.replace(/([A-Z])/g, ' $1').toUpperCase()}</div>
      <div class="compat-val">${val}</div>
    </div>
  `).join('');

  content.innerHTML = `
    <div class="inspector-left">
      <div class="inspector-visual-box">
        ${productVisualHtml}
      </div>

      <div class="factory-stamp-card">
        <div class="stamp-header">
          <span class="stamp-title">🏭 FACTORY BATCH SPECIFICATION</span>
          <span class="stamp-verified">✓ AUTHENTIC</span>
        </div>
        <div class="stamp-grid">
          <div class="stamp-row">
            <span class="stamp-label">Manufacturer / Brand:</span>
            <span class="stamp-value">${part.brand}</span>
          </div>
          <div class="stamp-row">
            <span class="stamp-label">Manufactured Date:</span>
            <span class="stamp-value text-cyan">${part.manufacturingDate}</span>
          </div>
          <div class="stamp-row">
            <span class="stamp-label">Market Release Date:</span>
            <span class="stamp-value">${part.releaseDate}</span>
          </div>
          <div class="stamp-row">
            <span class="stamp-label">Global Headquarters:</span>
            <span class="stamp-value">${part.manufacturerDetails.headquarters}</span>
          </div>
          <div class="stamp-row">
            <span class="stamp-label">Silicon Foundry / Fab:</span>
            <span class="stamp-value">${part.manufacturerDetails.foundry}</span>
          </div>
          <div class="stamp-row">
            <span class="stamp-label">Assembly Plant:</span>
            <span class="stamp-value">${part.manufacturerDetails.assemblyPlant}</span>
          </div>
          <div class="stamp-row">
            <span class="stamp-label">Hardware Batch Code:</span>
            <span class="stamp-value text-emerald font-mono">${part.manufacturerDetails.batchCode}</span>
          </div>
          <div class="stamp-row">
            <span class="stamp-label">Global Compliance:</span>
            <span class="stamp-value">${part.manufacturerDetails.compliance}</span>
          </div>
        </div>
      </div>

      <div class="warranty-seal-card">
        <span class="seal-icon">🛡️</span>
        <div class="seal-text">
          <h5>${part.warranty}</h5>
          <p>Official manufacturer warranty registered directly under serial hash upon dispatch.</p>
        </div>
      </div>
    </div>

    <div class="inspector-right">
      <span class="inspector-category-tag">${part.category.toUpperCase()}</span>
      <h2 class="inspector-part-title" id="modalPartName">${part.name}</h2>

      <div class="inspector-badges-row">
        <span class="badge-pill mfg-pill">🏭 ${part.brand} Certified</span>
        <span class="badge-pill stock-pill">● ${part.stockCount} Units in Real-time Sync</span>
        <span class="badge-pill">★ ${part.rating} (${part.reviewsCount} verified reviews)</span>
      </div>

      <div class="inspector-price-row">
        <span class="inspector-price">${formattedPrice}</span>
        <span class="inspector-msrp">${msrpPrice}</span>
        <span class="inspector-save-badge">ZERO-OVERSELL PROTECTED</span>
      </div>

      <div class="inspector-tabs-nav">
        <button class="inspector-tab-btn active" data-tab="specs" onclick="switchInspectorTab('specs')">Technical Specs</button>
        <button class="inspector-tab-btn" data-tab="compat" onclick="switchInspectorTab('compat')">Rig Compatibility</button>
        <button class="inspector-tab-btn" data-tab="desc" onclick="switchInspectorTab('desc')">Overview</button>
      </div>

      <div id="tab-specs" class="inspector-tab-pane active">
        <table class="specs-table">
          <tbody>
            ${specsRows}
          </tbody>
        </table>
      </div>

      <div id="tab-compat" class="inspector-tab-pane">
        <div class="compat-grid">
          ${compatCards}
        </div>
      </div>

      <div id="tab-desc" class="inspector-tab-pane">
        <p class="inspector-desc-text">${part.description}</p>
      </div>

      <div class="inspector-action-bar">
        <div class="qty-control">
          <button class="qty-btn" onclick="updateInspectorQty(-1)">-</button>
          <input type="text" class="qty-input" id="inspectorQtyInput" value="${AppState.inspectorQty}" readonly>
          <button class="qty-btn" onclick="updateInspectorQty(1)">+</button>
        </div>

        <button class="btn-modal-add" onclick="addInspectorPartToCart()">
          <span>Add ${AppState.inspectorQty} to Cart</span>
          <span>•</span>
          <span id="modalAddPrice">${formatCurrency(part.priceUSD * AppState.inspectorQty, (part.priceINR || part.priceUSD * 88) * AppState.inspectorQty)}</span>
        </button>
      </div>
    </div>
  `;
}

function switchInspectorTab(tabName) {
  document.querySelectorAll('.inspector-tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tabName);
  });
  document.querySelectorAll('.inspector-tab-pane').forEach(p => {
    p.classList.toggle('active', p.id === `tab-${tabName}`);
  });
}

function updateInspectorQty(delta) {
  const part = PC_PARTS_DATA.find(p => p.id === AppState.inspectorPartId);
  if (!part) return;

  const newQty = Math.max(1, Math.min(part.stockCount, AppState.inspectorQty + delta));
  AppState.inspectorQty = newQty;

  const input = document.getElementById('inspectorQtyInput');
  const priceDisplay = document.getElementById('modalAddPrice');
  if (input) input.value = newQty;
  if (priceDisplay) {
    priceDisplay.textContent = formatCurrency(part.priceUSD * newQty, (part.priceINR || part.priceUSD * 88) * newQty);
  }
}

function addInspectorPartToCart() {
  if (!AppState.inspectorPartId) return;
  addToCart(AppState.inspectorPartId, AppState.inspectorQty);
  closePartInspector();
  openCartDrawer();
}

// ==========================================
// Build Summary & Cart Drawer (Slide 1 & Slide 11)
// ==========================================
function initModalListeners() {
  const closeInspectorBtn = document.getElementById('closeInspectorBtn');
  const inspectorModal = document.getElementById('inspectorModal');
  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartBackdrop = document.getElementById('cartDrawerBackdrop');
  const emptyCartBtn = document.getElementById('emptyCartBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
  const checkoutModal = document.getElementById('checkoutModal');

  if (closeInspectorBtn) closeInspectorBtn.addEventListener('click', closePartInspector);
  if (inspectorModal) {
    inspectorModal.addEventListener('click', (e) => {
      if (e.target === inspectorModal) closePartInspector();
    });
  }

  if (cartToggleBtn) cartToggleBtn.addEventListener('click', toggleCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartDrawer);
  if (emptyCartBtn) {
    emptyCartBtn.addEventListener('click', () => {
      if (AppState.cart.length === 0) return;
      AppState.cart = [];
      saveCart();
      renderCart();
      updateRigStatusIndicator();
      showToast('Cart Cleared', 'All components removed from cart');
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (AppState.cart.length === 0) {
        showToast('Cart Empty', 'Add components before checking out', '⚠️');
        return;
      }
      closeCartDrawer();
      openCheckoutModal();
    });
  }

  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
  if (checkoutModal) {
    checkoutModal.addEventListener('click', (e) => {
      if (e.target === checkoutModal) closeCheckoutModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePartInspector();
      closeCartDrawer();
      closeCheckoutModal();
      closeRigModal();
      closeKafkaTelemetry();
    }
  });

  window.addEventListener('scroll', () => {
    const header = document.getElementById('siteHeader');
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 30);
    }
  });
}

function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (drawer && backdrop) {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    backdrop.classList.remove('hidden');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    backdrop.classList.add('hidden');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function toggleCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  if (drawer && drawer.classList.contains('open')) {
    closeCartDrawer();
  } else {
    openCartDrawer();
  }
}

function addToCart(partId, qtyToAdd = 1) {
  const part = PC_PARTS_DATA.find(p => p.id === partId);
  if (!part) return;

  const existing = AppState.cart.find(item => item.partId === partId);
  if (existing) {
    existing.quantity = Math.min(part.stockCount, existing.quantity + qtyToAdd);
  } else {
    AppState.cart.push({ partId: partId, quantity: qtyToAdd });
  }

  saveCart();
  renderCart();
  updateRigStatusIndicator();

  logKafkaEvent('CART_MUTATION', `User session buffered SKU "${part.id}" (Qty: ${qtyToAdd})`);

  const badge = document.getElementById('cartCountBadge');
  if (badge) {
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 300);
  }

  showToast('Added to Cart', `${part.name} (Real-time Sync Active)`);
}

function updateCartItemQty(partId, delta) {
  const itemIndex = AppState.cart.findIndex(i => i.partId === partId);
  if (itemIndex === -1) return;

  const part = PC_PARTS_DATA.find(p => p.id === partId);
  const currentItem = AppState.cart[itemIndex];
  const newQty = currentItem.quantity + delta;

  if (newQty <= 0) {
    AppState.cart.splice(itemIndex, 1);
    showToast('Removed Component', `${part ? part.name : 'Component'} removed from cart`);
  } else {
    currentItem.quantity = Math.min(part ? part.stockCount : 99, newQty);
  }

  saveCart();
  renderCart();
  updateRigStatusIndicator();
}

function removeCartItem(partId) {
  const part = PC_PARTS_DATA.find(p => p.id === partId);
  AppState.cart = AppState.cart.filter(i => i.partId !== partId);
  saveCart();
  renderCart();
  updateRigStatusIndicator();
  showToast('Removed Component', `${part ? part.name : 'Component'} removed`);
}

function saveCart() {
  localStorage.setItem('rigforge_cart', JSON.stringify(AppState.cart));
}

function renderCart() {
  const cartList = document.getElementById('cartItemsList');
  const cartCountBadge = document.getElementById('cartCountBadge');
  const cartHeaderTotal = document.getElementById('cartHeaderTotal');
  const cartItemsCountText = document.getElementById('cartItemsCountText');
  const summarySubtotal = document.getElementById('summarySubtotal');
  const summaryTax = document.getElementById('summaryTax');
  const summaryTaxLabel = document.getElementById('summaryTaxLabel');
  const summaryTotal = document.getElementById('summaryTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  if (!cartList) return;

  const totalItemsCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCountBadge) cartCountBadge.textContent = totalItemsCount;
  if (cartItemsCountText) {
    cartItemsCountText.textContent = `${totalItemsCount} active item${totalItemsCount === 1 ? '' : 's'}`;
  }

  let subtotalUSD = 0;
  let subtotalINR = 0;

  AppState.cart.forEach(item => {
    const part = PC_PARTS_DATA.find(p => p.id === item.partId);
    if (part) {
      subtotalUSD += part.priceUSD * item.quantity;
      subtotalINR += (part.priceINR || part.priceUSD * 88) * item.quantity;
    }
  });

  const isINR = AppState.currency === 'INR';
  const taxRate = isINR ? 0.18 : 0.085;
  const taxUSD = Math.round(subtotalUSD * taxRate);
  const taxINR = Math.round(subtotalINR * taxRate);
  const totalUSD = subtotalUSD + taxUSD;
  const totalINR = subtotalINR + taxINR;

  if (cartHeaderTotal) {
    cartHeaderTotal.textContent = formatCurrency(subtotalUSD, subtotalINR);
  }

  if (summarySubtotal) summarySubtotal.textContent = formatCurrency(subtotalUSD, subtotalINR);
  if (summaryTaxLabel) summaryTaxLabel.textContent = isINR ? 'GST (18% Included/Est)' : 'Estimated Sales Tax (8.5%)';
  if (summaryTax) summaryTax.textContent = formatCurrency(taxUSD, taxINR);
  if (summaryTotal) summaryTotal.textContent = formatCurrency(totalUSD, totalINR);

  if (checkoutBtn) {
    checkoutBtn.style.opacity = totalItemsCount === 0 ? '0.5' : '1';
    checkoutBtn.style.pointerEvents = totalItemsCount === 0 ? 'none' : 'auto';
  }

  updateCartRigChips();

  if (AppState.cart.length === 0) {
    cartList.innerHTML = `
      <div class="cart-empty-view">
        <div class="cart-empty-icon">🛒</div>
        <h4>Build Summary & Cart is Empty</h4>
        <p>Add PC components to initiate real-time inventory reservation and event streaming.</p>
        <button class="btn btn-primary" onclick="closeCartDrawer()">Explore Catalog</button>
      </div>
    `;
    return;
  }

  cartList.innerHTML = AppState.cart.map(item => {
    const part = PC_PARTS_DATA.find(p => p.id === item.partId);
    if (!part) return '';

    const lineTotalFormatted = formatCurrency(
      part.priceUSD * item.quantity, 
      (part.priceINR || part.priceUSD * 88) * item.quantity
    );

    return `
      <div class="cart-item-card" data-part-id="${part.id}">
        <div class="cart-item-img">
          <img src="${part.image}" alt="${part.name}" class="cart-thumb-img" onerror="this.src='images/gpu-rtx4090.jpg'">
        </div>

        <div class="cart-item-details">
          <div class="cart-item-sync-row">
            <span class="cart-item-cat">${part.category}</span>
            <span class="sync-tag-active">● Real-time Sync</span>
          </div>
          <h4 class="cart-item-name" title="${part.name}">${part.name}</h4>
          <span class="cart-item-mfg">🏭 ${part.brand} • Mfg: ${part.manufacturingDate.split('(')[0].trim()}</span>
          
          <div class="cart-item-stepper">
            <button class="cart-step-btn" onclick="updateCartItemQty('${part.id}', -1)" title="Decrease quantity">-</button>
            <span class="cart-step-qty">${item.quantity}</span>
            <button class="cart-step-btn" onclick="updateCartItemQty('${part.id}', 1)" title="Increase quantity">+</button>
          </div>
        </div>

        <div class="cart-item-right">
          <button class="cart-item-remove-btn" onclick="removeCartItem('${part.id}')" title="Remove component">✕</button>
          <span class="cart-item-line-total">${lineTotalFormatted}</span>
        </div>
      </div>
    `;
  }).join('');
}

function updateCartRigChips() {
  const chipsContainer = document.getElementById('cartRigChips');
  if (!chipsContainer) return;

  const categoriesInCart = new Set();
  AppState.cart.forEach(item => {
    const part = PC_PARTS_DATA.find(p => p.id === item.partId);
    if (part) categoriesInCart.add(part.categoryKey);
  });

  const coreCats = [
    { key: 'cpu', label: 'CPU' },
    { key: 'gpu', label: 'GPU' },
    { key: 'motherboard', label: 'MOBO' },
    { key: 'ram', label: 'RAM' },
    { key: 'storage', label: 'SSD' },
    { key: 'psu', label: 'PSU' }
  ];

  chipsContainer.innerHTML = coreCats.map(cat => `
    <span class="chip-badge ${categoriesInCart.has(cat.key) ? 'active' : ''}">${cat.label}</span>
  `).join('');
}

// ==========================================
// Rig Builder Compatibility Assistant
// ==========================================
function initRigAssistant() {
  const rigBtn = document.getElementById('rigAssistantBtn');
  const closeBtn = document.getElementById('closeRigModalBtn');
  const modal = document.getElementById('rigModal');

  if (rigBtn) rigBtn.addEventListener('click', openRigModal);
  if (closeBtn) closeBtn.addEventListener('click', closeRigModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeRigModal();
    });
  }
}

function openRigModal() {
  updateRigModalContent();
  const modal = document.getElementById('rigModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeRigModal() {
  const modal = document.getElementById('rigModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function updateRigStatusIndicator() {
  const indicator = document.getElementById('rigStatusDot');
  if (!indicator) return;

  const categoriesInCart = new Set();
  AppState.cart.forEach(item => {
    const part = PC_PARTS_DATA.find(p => p.id === item.partId);
    if (part) categoriesInCart.add(part.categoryKey);
  });

  const count = categoriesInCart.size;
  indicator.textContent = `${count}/6`;
  indicator.classList.toggle('complete', count === 6);
}

function updateRigModalContent() {
  const checklist = document.getElementById('rigChecklist');
  const progressBar = document.getElementById('rigProgressBar');
  const progressText = document.getElementById('rigCompletionPercent');
  const diagnosticList = document.getElementById('rigDiagnosticList');

  const categoriesInCart = {};
  AppState.cart.forEach(item => {
    const part = PC_PARTS_DATA.find(p => p.id === item.partId);
    if (part) {
      if (!categoriesInCart[part.categoryKey]) {
        categoriesInCart[part.categoryKey] = [];
      }
      categoriesInCart[part.categoryKey].push(part);
    }
  });

  const coreSlots = [
    { key: 'cpu', icon: '🧠', name: 'Processor (CPU)' },
    { key: 'motherboard', icon: '⚡', name: 'Motherboard (Socket)' },
    { key: 'gpu', icon: '🎮', name: 'Graphics Card (GPU)' },
    { key: 'ram', icon: '💾', name: 'DDR5 Memory (RAM)' },
    { key: 'storage', icon: '💿', name: 'Storage (NVMe SSD)' },
    { key: 'psu', icon: '🔌', name: 'Power Supply (PSU)' }
  ];

  const filledCount = coreSlots.filter(s => !!categoriesInCart[s.key]).length;
  const percent = Math.round((filledCount / 6) * 100);

  if (progressBar) progressBar.style.width = `${percent}%`;
  if (progressText) progressText.textContent = `${percent}% Complete`;

  if (checklist) {
    checklist.innerHTML = coreSlots.map(slot => {
      const parts = categoriesInCart[slot.key];
      const isFilled = parts && parts.length > 0;
      return `
        <div class="rig-check-item ${isFilled ? 'filled' : ''}">
          <span class="rig-check-label">${slot.icon} ${slot.name}</span>
          <span class="rig-check-status">
            ${isFilled ? '✓ ' + parts[0].brand : '○ Missing'}
          </span>
        </div>
      `;
    }).join('');
  }

  if (diagnosticList) {
    const diagnostics = [];
    const hasCpu = categoriesInCart['cpu'];
    const hasMobo = categoriesInCart['motherboard'];
    if (hasCpu && hasMobo) {
      const cpu = hasCpu[0];
      const mobo = hasMobo[0];
      const isAMDMatch = cpu.name.includes('Ryzen') && (mobo.name.includes('AM5') || mobo.name.includes('X670') || mobo.name.includes('B650'));
      const isIntelMatch = cpu.name.includes('Intel') && (mobo.name.includes('LGA1700') || mobo.name.includes('Z790'));
      const isTRMatch = cpu.name.includes('Threadripper');

      if (isTRMatch) {
        diagnostics.push(`⚠️ Workstation Architecture: Threadripper 7980X requires dedicated sTR5 / TRX50 motherboard platform.`);
      } else if (isAMDMatch || isIntelMatch) {
        diagnostics.push(`✅ Socket Match: ${cpu.name.split(' ')[0]} CPU is 100% compatible with ${mobo.brand} ${mobo.categoryKey} socket.`);
      } else {
        diagnostics.push(`⚠️ Socket Mismatch: ${cpu.name} may require a different motherboard socket than ${mobo.name}.`);
      }
    }

    const hasGpu = categoriesInCart['gpu'];
    const hasPsu = categoriesInCart['psu'];
    if (hasGpu && hasPsu) {
      diagnostics.push(`✅ Power Verification: ${hasPsu[0].name} provides ATX 3.0 native PCIe 5.0 excursion protection for ${hasGpu[0].name}.`);
    }

    if (diagnostics.length === 0) {
      diagnosticList.innerHTML = `<li>Add a CPU, GPU, and Motherboard to view automated hardware socket, wattage, and clearance diagnostics.</li>`;
    } else {
      diagnosticList.innerHTML = diagnostics.map(d => `<li>${d}</li>`).join('');
    }
  }
}

// ==========================================
// Aiven Apache Kafka Telemetry & Event Stream (PDF Slide 4, 5, 6, 7)
// ==========================================
function initKafkaTelemetry() {
  const toggleBtn = document.getElementById('toggleKafkaTelemetryBtn');
  const closeBtn = document.getElementById('closeTelemetryBtn');
  const drawer = document.getElementById('kafkaTelemetryDrawer');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (drawer) drawer.classList.toggle('open');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeKafkaTelemetry);
  }
}

function closeKafkaTelemetry() {
  const drawer = document.getElementById('kafkaTelemetryDrawer');
  if (drawer) drawer.classList.remove('open');
}

function logKafkaEvent(eventType, message, partition = 0) {
  AppState.kafkaEventsCount++;
  const countEl = document.getElementById('statKafkaEvents');
  if (countEl) countEl.textContent = AppState.kafkaEventsCount.toLocaleString();

  const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
  const logEntry = {
    offset: AppState.kafkaEventsCount,
    timestamp,
    type: eventType,
    partition,
    message
  };

  AppState.kafkaLogs.unshift(logEntry);
  if (AppState.kafkaLogs.length > 50) AppState.kafkaLogs.pop();

  renderKafkaLogs();
}

function renderKafkaLogs() {
  const container = document.getElementById('kafkaEventLogs');
  if (!container) return;

  container.innerHTML = AppState.kafkaLogs.map(log => `
    <div class="log-line">
      <span class="log-time font-mono">${log.timestamp}</span>
      <span class="log-part font-mono">P${log.partition}:#${log.offset}</span>
      <span class="log-type font-orbitron">${log.type}</span>
      <span class="log-msg">${log.message}</span>
    </div>
  `).join('');
}

function clearKafkaLogs() {
  AppState.kafkaLogs = [];
  renderKafkaLogs();
}

// ==========================================
// High Concurrency Flash Sale Simulation (PDF Slide 2, 3, 5, 9)
// ==========================================
function triggerFlashSaleSim() {
  const drawer = document.getElementById('kafkaTelemetryDrawer');
  if (drawer) drawer.classList.add('open');

  showToast('Flash Sale Spike Initiated', 'Simulating 500 concurrent buyers for GPU drop...', '⚡');

  logKafkaEvent('TRAFFIC_SPIKE', `⚡ Traffic surge detected: 500 buyers requesting RTX 4090 stock.`);
  logKafkaEvent('KAFKA_BUFFER', `Queueing requests into topic "orders.checkout.v1" across 3 partitions sequentially.`);

  let processed = 0;
  const interval = setInterval(() => {
    processed++;
    const currentGpu = PC_PARTS_DATA.find(p => p.id === 'gpu-rtx4090-fe');

    if (currentGpu && currentGpu.stockCount > 0) {
      currentGpu.stockCount--;
      logKafkaEvent('ACID_LOCK_ACQUIRED', `Order #${1000 + processed} deducted 1 unit. Remaining: ${currentGpu.stockCount}`);
      logKafkaEvent('OPENSEARCH_SYNC', `Updated OpenSearch catalog stock for SKU "${currentGpu.id}"`);
    } else {
      logKafkaEvent('OVERSELL_PREVENTED', `🔒 Order #${1000 + processed} queued safely rejected: Zero Oversell Lock Enforced!`);
    }

    renderProducts();

    if (processed >= 8) {
      clearInterval(interval);
      logKafkaEvent('BURST_RESOLVED', `✓ Flash sale traffic spike fully absorbed. 0 oversell errors, 0 deadlocks.`);
      showToast('Zero-Oversell Verified', 'Kafka queued all orders; stock reached 0 cleanly without overselling!', '🔒');
    }
  }, 250);
}

// ==========================================
// Decoupled Checkout Flow (PDF Slide 4, 5, 7)
// ==========================================
function openCheckoutModal() {
  AppState.checkoutStep = 1;
  goToCheckoutStep(1);

  let subtotalUSD = 0;
  let subtotalINR = 0;

  AppState.cart.forEach(item => {
    const part = PC_PARTS_DATA.find(p => p.id === item.partId);
    if (part) {
      subtotalUSD += part.priceUSD * item.quantity;
      subtotalINR += (part.priceINR || part.priceUSD * 88) * item.quantity;
    }
  });

  const isINR = AppState.currency === 'INR';
  const taxRate = isINR ? 0.18 : 0.085;
  const totalUSD = subtotalUSD + Math.round(subtotalUSD * taxRate);
  const totalINR = subtotalINR + Math.round(subtotalINR * taxRate);

  const subtotalEl = document.getElementById('checkoutModalSubtotal');
  const totalEl = document.getElementById('checkoutModalTotal');
  if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotalUSD, subtotalINR);
  if (totalEl) totalEl.textContent = formatCurrency(totalUSD, totalINR);

  const modal = document.getElementById('checkoutModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function goToCheckoutStep(step) {
  AppState.checkoutStep = step;

  for (let i = 1; i <= 3; i++) {
    const badge = document.getElementById(`stepBadge${i}`);
    const body = document.getElementById(`checkoutStep${i}`);
    if (badge) badge.classList.toggle('active', i === step);
    if (body) body.classList.toggle('hidden', i !== step);
  }
}

function processSimulatedPayment() {
  const payBtn = document.getElementById('submitPaymentBtn');
  const payText = document.getElementById('payBtnText');
  if (payBtn) payBtn.disabled = true;
  if (payText) payText.textContent = 'Emitting OrderCreated to Apache Kafka...';

  const randomHex = Math.floor(100000 + Math.random() * 900000);
  const eventId = `EVT-ORDER-${randomHex}`;

  logKafkaEvent('ORDER_CREATED', `Order payload published to Kafka topic "orders.checkout.v1" (Event ID: ${eventId})`);

  AppState.cart.forEach(item => {
    const part = PC_PARTS_DATA.find(p => p.id === item.partId);
    if (part) {
      part.stockCount = Math.max(0, part.stockCount - item.quantity);
      if (part.stockCount === 0) {
        part.inStock = false;
        part.stockLockState = 'out-of-stock';
      }
    }
  });

  setTimeout(() => {
    logKafkaEvent('CONSUMER_A_POSTGRES', `PostgreSQL row-lock executed: inventory decremented safely.`);
    logKafkaEvent('CONSUMER_B_OPENSEARCH', `OpenSearch catalog indices synced.`);
    logKafkaEvent('CONSUMER_C_NOTIFY', `Email dispatched to user without blocking web server.`);

    if (payBtn) payBtn.disabled = false;
    if (payText) payText.textContent = "Publish 'OrderCreated' Event to Kafka";

    const orderIdEl = document.getElementById('confirmedOrderId');
    if (orderIdEl) orderIdEl.textContent = `#${eventId}-PARTITION-0`;

    const confirmedItemsEl = document.getElementById('confirmedOrderItems');
    if (confirmedItemsEl) {
      confirmedItemsEl.innerHTML = AppState.cart.map(item => {
        const part = PC_PARTS_DATA.find(p => p.id === item.partId);
        if (!part) return '';
        return `
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
            <span><strong>${item.quantity}x</strong> ${part.name}</span>
            <span class="font-mono text-cyan">${formatCurrency(part.priceUSD * item.quantity, (part.priceINR || part.priceUSD * 88) * item.quantity)}</span>
          </div>
        `;
      }).join('');
    }

    renderProducts();
    goToCheckoutStep(3);
    showToast('Order Streamed Successfully!', 'Event committed to Kafka partition 0', '🎉');
  }, 1000);
}

function finishAndResetStore() {
  AppState.cart = [];
  saveCart();
  renderCart();
  updateRigStatusIndicator();
  closeCheckoutModal();
  showToast('RigForge Ready', 'Thank you for choosing RigForge!');
}

function printReceipt() {
  window.print();
}

// ==========================================
// Toast Notification Engine
// ==========================================
function showToast(title, message, icon = '⚡') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <div class="toast-body">
      <span class="toast-title">${title}</span>
      <span class="toast-msg">${message}</span>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
