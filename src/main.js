const STORAGE_KEY = 'op-auto-clicker-v1';

const DEFAULT_SETTINGS = {
  theme: 'system',
  language: 'en',
  interval: 100,
  clickType: 'single',
  button: 'left',
  repeatMode: 'infinite',
  repeatCount: 10000,
  randomInterval: false,
  randomMin: 80,
  randomMax: 150,
  startDelay: 0,
  hotkey: 'F6',
  simpleMode: true,
};

const translations = {
  en: {
    ready: 'Ready',
    running: 'Running',
    paused: 'Paused',
    stopped: 'Stopped',
    appName: 'OP Auto Clicker',
    home: 'Home',
    clicker: 'Clicker',
    presets: 'Presets',
    history: 'History',
    settings: 'Settings',
    interval: 'Interval',
    click: 'Click',
    type: 'Type',
    count: 'Count',
    start: 'Start',
    stop: 'Stop',
    pause: 'Pause',
    resume: 'Resume',
    reset: 'Reset',
    left: 'Left',
    right: 'Right',
    middle: 'Middle',
    single: 'Single Click',
    double: 'Double Click',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    milliseconds: 'Milliseconds',
    quickPresets: 'Quick Presets',
    recentSessions: 'Recent Sessions',
    noPresets: 'No presets yet.',
    noSessions: 'No sessions yet.',
    createPreset: '+ Create Preset',
    savePreset: 'Save preset',
    invalidInterval: 'Please enter a valid interval.',
    invalidCount: 'Click count must be greater than 0.',
    invalidRandomRange: 'Maximum interval must be greater than minimum interval.',
    theme: 'Theme',
    language: 'Language',
    export: 'Export',
    import: 'Import',
    clearHistory: 'Clear history',
    resetApp: 'Reset app',
    hotkey: 'Hotkey',
    simple: 'Simple',
    advanced: 'Advanced',
    randomInterval: 'Random Interval',
    min: 'Min',
    max: 'Max',
    cps: 'CPS',
    time: 'Time',
    clicks: 'Clicks',
    startDelay: 'Start delay',
    demoMode: 'Demo mode',
    close: 'Close',
    confirm: 'Confirm',
    cancel: 'Cancel',
    loaded: 'Preset loaded',
    created: 'Preset created',
    deleted: 'Preset deleted',
    exported: 'Configuration exported',
    imported: 'Configuration imported',
    started: 'Clicker started',
    stopped: 'Clicker stopped',
    resumed: 'Clicker resumed',
    paused: 'Clicker paused',
    ready: 'Ready',
    save: 'Save',
    noData: 'No data',
    infinite: '∞',
    all: 'All',
  },
  de: {
    ready: 'Bereit',
    running: 'Läuft',
    paused: 'Pausiert',
    stopped: 'Gestoppt',
    appName: 'OP Auto Clicker',
    home: 'Home',
    clicker: 'Clicker',
    presets: 'Presets',
    history: 'Verlauf',
    settings: 'Einstellungen',
    interval: 'Intervall',
    click: 'Klick',
    type: 'Typ',
    count: 'Anzahl',
    start: 'Start',
    stop: 'Stop',
    pause: 'Pause',
    resume: 'Fortsetzen',
    reset: 'Zurücksetzen',
    left: 'Links',
    right: 'Rechts',
    middle: 'Mitte',
    single: 'Single Click',
    double: 'Double Click',
    hours: 'Stunden',
    minutes: 'Minuten',
    seconds: 'Sekunden',
    milliseconds: 'Millisekunden',
    quickPresets: 'Schnellvorlagen',
    recentSessions: 'Letzte Sessions',
    noPresets: 'Noch keine Presets.',
    noSessions: 'Noch keine Sessions.',
    createPreset: '+ Preset erstellen',
    savePreset: 'Preset speichern',
    invalidInterval: 'Bitte gültiges Intervall eingeben.',
    invalidCount: 'Klickanzahl muss größer als 0 sein.',
    invalidRandomRange: 'Maximales Intervall muss größer als Minimum sein.',
    theme: 'Design',
    language: 'Sprache',
    export: 'Exportieren',
    import: 'Importieren',
    clearHistory: 'Verlauf löschen',
    resetApp: 'App zurücksetzen',
    hotkey: 'Hotkey',
    simple: 'Einfach',
    advanced: 'Erweitert',
    randomInterval: 'Zufallsintervall',
    min: 'Min',
    max: 'Max',
    cps: 'CPS',
    time: 'Zeit',
    clicks: 'Klicks',
    startDelay: 'Startverzögerung',
    demoMode: 'Demo Modus',
    close: 'Schließen',
    confirm: 'Bestätigen',
    cancel: 'Abbrechen',
    loaded: 'Preset geladen',
    created: 'Preset erstellt',
    deleted: 'Preset gelöscht',
    exported: 'Konfiguration exportiert',
    imported: 'Konfiguration importiert',
    started: 'Clicker gestartet',
    stopped: 'Clicker gestoppt',
    resumed: 'Clicker fortgesetzt',
    paused: 'Clicker pausiert',
    ready: 'Bereit',
    save: 'Speichern',
    noData: 'Keine Daten',
    infinite: '∞',
    all: 'Alle',
  }
};

const state = {
  currentPage: 'home',
  settings: { ...DEFAULT_SETTINGS },
  presets: [],
  history: [],
  clickCount: 0,
  isRunning: false,
  isPaused: false,
  startedAt: null,
  elapsedBeforePause: 0,
  loopTimer: null,
  statsTimer: null,
  toastTimer: null,
};

const app = document.getElementById('app');

function getLang() {
  return state.settings.language || 'en';
}

function t(key) {
  const lang = translations[getLang()] || translations.en;
  return lang[key] || translations.en[key] || key;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    state.settings = { ...DEFAULT_SETTINGS, ...(saved.settings || {}) };
    state.presets = Array.isArray(saved.presets) ? saved.presets : [];
    state.history = Array.isArray(saved.history) ? saved.history : [];
  } catch (error) {
    console.warn('Storage load failed:', error);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    settings: state.settings,
    presets: state.presets,
    history: state.history,
  }));
}

function getCurrentStatusText() {
  if (state.isRunning) return t('running');
  if (state.isPaused) return t('paused');
  return t('ready');
}

function formatCount(value) {
  return Number(value || 0).toLocaleString();
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function getElapsedMs() {
  if (!state.startedAt) return state.elapsedBeforePause || 0;
  return state.elapsedBeforePause + (Date.now() - state.startedAt);
}

function getCps() {
  const elapsed = getElapsedMs() / 1000;
  if (elapsed <= 0 || state.clickCount <= 0) return 0;
  return state.clickCount / elapsed;
}

function setTheme() {
  const theme = state.settings.theme || 'system';
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.body.dataset.theme = theme === 'system' ? (dark ? 'dark' : 'light') : theme;
}

function showToast(message) {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => toast.classList.remove('visible'), 1800);
}

function renderHome() {
  const quickChips = [100, 250, 500, 1000].map((ms) => `
    <button class="chip" data-quick-interval="${ms}">${ms} ms</button>
  `).join('');

  const recentSessions = state.history.length
    ? state.history.slice(0, 2).map((entry) => `
        <div class="session-row">
          <div>
            <div class="session-title">Session #${entry.id}</div>
            <div class="session-sub">${formatCount(entry.clicks)} clicks • ${entry.duration}</div>
          </div>
          <span class="session-badge">${entry.interval} ms</span>
        </div>
      `).join('')
    : `<div class="empty-state">${t('noSessions')}</div>`;

  return `
    <section class="page home-page">
      <header class="topbar">
        <div class="brand-wrap">
          <div class="brand-mark">✦</div>
          <h1>${t('appName')}</h1>
        </div>
        <div class="status-pill ${state.isRunning ? 'running' : state.isPaused ? 'paused' : 'ready'}">
          <span class="status-dot"></span>
          <span>${getCurrentStatusText()}</span>
        </div>
      </header>

      <div class="hero-card panel">
        <div class="hero-row">
          <div class="hero-info">
            <div class="meta-label">${t('interval')}</div>
            <div class="meta-value">${state.settings.interval} ms</div>
            <div class="meta-label">${t('click')}</div>
            <div class="meta-value">${t(state.settings.button)}</div>
            <div class="meta-label">${t('type')}</div>
            <div class="meta-value">${state.settings.clickType === 'single' ? t('single') : t('double')}</div>
          </div>
          <div class="radar-target">
            <span class="target-core"></span>
          </div>
        </div>

        <button class="primary-btn" data-action="toggle-run">
          ${state.isRunning ? '■' : '▶'} ${state.isRunning ? t('stop') : t('start')}
        </button>
      </div>

      <div class="stats-grid">
        <div class="stat-card panel">
          <div class="stat-label">${t('clicks')}</div>
          <div class="stat-value" id="stat-clicks-home">${formatCount(state.clickCount)}</div>
        </div>
        <div class="stat-card panel">
          <div class="stat-label">${t('cps')}</div>
          <div class="stat-value" id="stat-cps-home">${getCps().toFixed(1)}</div>
        </div>
        <div class="stat-card panel">
          <div class="stat-label">${t('time')}</div>
          <div class="stat-value" id="stat-time-home">${formatDuration(getElapsedMs())}</div>
        </div>
      </div>

      <div class="quick-block">
        <div class="section-title">${t('quickPresets')}</div>
        <div class="chip-row">${quickChips}</div>
      </div>

      <div class="recent-block">
        <div class="section-title">${t('recentSessions')}</div>
        <div class="session-list">${recentSessions}</div>
      </div>
    </section>
  `;
}

function renderClicker() {
  const intervalHours = String(Math.floor(state.settings.interval / 3600000)).padStart(2, '0');
  const intervalMinutes = String(Math.floor((state.settings.interval / 60000) % 60)).padStart(2, '0');
  const intervalSeconds = String(Math.floor((state.settings.interval / 1000) % 60)).padStart(2, '0');
  const intervalMs = String(state.settings.interval % 1000).padStart(3, '0');

  return `
    <section class="page clicker-page">
      <div class="page-heading">
        <h2>${t('clicker')}</h2>
      </div>

      <div class="segmented panel">
        <button class="segment ${state.settings.simpleMode ? 'active' : ''}" data-mode="simple">${t('simple')}</button>
        <button class="segment ${!state.settings.simpleMode ? 'active' : ''}" data-mode="advanced">${t('advanced')}</button>
      </div>

      <div class="panel block">
        <div class="row-head"><span>⏱</span> <strong>${t('interval')}</strong></div>
        <div class="time-grid">
          <label class="mini-input">
            <span>${t('hours')}</span>
            <input type="number" min="0" value="${intervalHours}" data-interval-unit="hours">
          </label>
          <label class="mini-input">
            <span>${t('minutes')}</span>
            <input type="number" min="0" value="${intervalMinutes}" data-interval-unit="minutes">
          </label>
          <label class="mini-input">
            <span>${t('seconds')}</span>
            <input type="number" min="0" value="${intervalSeconds}" data-interval-unit="seconds">
          </label>
          <label class="mini-input">
            <span>${t('milliseconds')}</span>
            <input type="number" min="0" max="999" value="${intervalMs}" data-interval-unit="milliseconds">
          </label>
        </div>
        <input type="range" min="1" max="5000" step="1" value="${Math.min(5000, Math.max(1, state.settings.interval))}" class="range-input" data-interval-range>
        <div class="range-display">${state.settings.interval} ms</div>
      </div>

      <div class="panel block">
        <div class="row-head"><span>🖱</span> <strong>${t('type')}</strong></div>
        <div class="button-row">
          <button class="choice-btn ${state.settings.clickType === 'single' ? 'active' : ''}" data-click-type="single">${t('single')}</button>
          <button class="choice-btn ${state.settings.clickType === 'double' ? 'active' : ''}" data-click-type="double">${t('double')}</button>
        </div>
      </div>

      <div class="panel block">
        <div class="row-head"><span>🎯</span> <strong>${t('click')}</strong></div>
        <div class="button-row">
          <button class="choice-btn ${state.settings.button === 'left' ? 'active' : ''}" data-button="left">${t('left')}</button>
          <button class="choice-btn ${state.settings.button === 'right' ? 'active' : ''}" data-button="right">${t('right')}</button>
          <button class="choice-btn ${state.settings.button === 'middle' ? 'active' : ''}" data-button="middle">${t('middle')}</button>
        </div>
      </div>

      <div class="panel block">
        <div class="row-head"><span>∞</span> <strong>${t('count')}</strong></div>
        <label class="radio-line">
          <input type="radio" name="repeat-mode" value="infinite" ${state.settings.repeatMode === 'infinite' ? 'checked' : ''}>
          <span>${t('infinite')}</span>
        </label>
        <label class="radio-line">
          <input type="radio" name="repeat-mode" value="count" ${state.settings.repeatMode === 'count' ? 'checked' : ''}>
          <span>${t('count')}</span>
        </label>
        <input class="count-input" type="number" value="${state.settings.repeatCount}" data-repeat-count>
      </div>

      <div class="panel block">
        <div class="row-head"><span>⟳</span> <strong>${t('randomInterval')}</strong></div>
        <label class="switch-line">
          <span>${t('randomInterval')}</span>
          <input type="checkbox" ${state.settings.randomInterval ? 'checked' : ''} data-random-toggle>
        </label>
        <div class="time-grid two-col">
          <label class="mini-input">
            <span>${t('min')}</span>
            <input type="number" min="1" value="${state.settings.randomMin}" data-random-min>
          </label>
          <label class="mini-input">
            <span>${t('max')}</span>
            <input type="number" min="1" value="${state.settings.randomMax}" data-random-max>
          </label>
        </div>
      </div>

      <button class="primary-btn large" data-action="toggle-run">
        ${state.isRunning ? t('stop') : t('start')}
      </button>
    </section>
  `;
}

function renderPresets() {
  const list = state.presets.length
    ? state.presets.map((preset) => `
      <div class="preset-card panel">
        <div class="preset-main">
          <div class="preset-name">${preset.name}</div>
          <div class="preset-meta">${preset.interval} ms • ${preset.button} • ${preset.clickType}</div>
        </div>
        <div class="preset-actions">
          <button class="small-btn" data-load-preset="${preset.id}">Load</button>
          <button class="small-btn danger" data-delete-preset="${preset.id}">Delete</button>
        </div>
      </div>
    `).join('')
    : `<div class="empty-state">${t('noPresets')}</div>`;

  return `
    <section class="page presets-page">
      <div class="page-heading">
        <h2>${t('presets')}</h2>
        <button class="small-btn" data-create-preset>${t('createPreset')}</button>
      </div>
      <div class="preset-list">${list}</div>
    </section>
  `;
}

function renderHistory() {
  const list = state.history.length
    ? state.history.map((entry) => `
      <div class="history-card panel">
        <div>
          <div class="history-title">Session #${entry.id}</div>
          <div class="history-sub">${formatCount(entry.clicks)} clicks • ${entry.duration}</div>
        </div>
        <span class="history-badge">${entry.interval} ms</span>
      </div>
    `).join('')
    : `<div class="empty-state">${t('noSessions')}</div>`;

  return `
    <section class="page history-page">
      <div class="page-heading">
        <h2>${t('history')}</h2>
        <button class="small-btn danger" data-clear-history>${t('clearHistory')}</button>
      </div>
      <div class="history-list">${list}</div>
    </section>
  `;
}

function renderSettings() {
  return `
    <section class="page settings-page">
      <div class="page-heading">
        <h2>${t('settings')}</h2>
      </div>

      <div class="panel block settings-block">
        <label class="settings-row">
          <span>${t('theme')}</span>
          <select data-setting-theme>
            <option value="dark" ${state.settings.theme === 'dark' ? 'selected' : ''}>Dark</option>
            <option value="light" ${state.settings.theme === 'light' ? 'selected' : ''}>Light</option>
            <option value="system" ${state.settings.theme === 'system' ? 'selected' : ''}>System</option>
          </select>
        </label>

        <label class="settings-row">
          <span>${t('language')}</span>
          <select data-setting-language>
            <option value="en" ${state.settings.language === 'en' ? 'selected' : ''}>English</option>
            <option value="de" ${state.settings.language === 'de' ? 'selected' : ''}>Deutsch</option>
          </select>
        </label>

        <label class="settings-row">
          <span>${t('hotkey')}</span>
          <button class="small-btn" data-change-hotkey>${state.settings.hotkey}</button>
        </label>
      </div>

      <div class="panel block settings-block">
        <button class="action-btn" data-export-json>${t('export')}</button>
        <button class="action-btn" data-import-json>${t('import')}</button>
        <button class="action-btn danger" data-clear-history>${t('clearHistory')}</button>
        <button class="action-btn danger" data-reset-app>${t('resetApp')}</button>
      </div>
    </section>
  `;
}

function renderCurrentPage() {
  switch (state.currentPage) {
    case 'clicker': return renderClicker();
    case 'presets': return renderPresets();
    case 'history': return renderHistory();
    case 'settings': return renderSettings();
    default: return renderHome();
  }
}

function renderNav() {
  const pages = [
    { key: 'home', label: '⌂' },
    { key: 'clicker', label: '⚡' },
    { key: 'presets', label: '★' },
    { key: 'history', label: '◷' },
    { key: 'settings', label: '⚙' },
  ];

  return `
    <nav class="bottom-nav">
      ${pages.map((page) => `
        <button class="nav-btn ${state.currentPage === page.key ? 'active' : ''}" data-page="${page.key}">${page.label}</button>
      `).join('')}
    </nav>
  `;
}

function render() {
  app.innerHTML = `
    <div class="app-shell">
      <div class="view-shell">${renderCurrentPage()}</div>
      ${renderNav()}
      <div class="toast">${t('started')}</div>
    </div>
  `;

  setTheme();
  bindGlobalEvents();
}

function bindGlobalEvents() {
  document.querySelectorAll('[data-page]').forEach((button) => {
    button.addEventListener('click', () => {
      state.currentPage = button.dataset.page;
      render();
    });
  });

  const toggleButton = document.querySelector('[data-action="toggle-run"]');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      if (state.isRunning || state.isPaused) {
        stopClicker();
      } else {
        startClicker();
      }
    });
  }

  document.querySelectorAll('[data-quick-interval]').forEach((button) => {
    button.addEventListener('click', () => {
      state.settings.interval = Number(button.dataset.quickInterval);
      saveState();
      render();
      showToast('Preset applied');
    });
  });

  document.querySelectorAll('[data-mode]').forEach((button) => {
    button.addEventListener('click', () => {
      state.settings.simpleMode = button.dataset.mode === 'simple';
      saveState();
      render();
    });
  });

  document.querySelectorAll('[data-click-type]').forEach((button) => {
    button.addEventListener('click', () => {
      state.settings.clickType = button.dataset.clickType;
      saveState();
      render();
    });
  });

  document.querySelectorAll('[data-button]').forEach((button) => {
    button.addEventListener('click', () => {
      state.settings.button = button.dataset.button;
      saveState();
      render();
    });
  });

  document.querySelectorAll('input[name="repeat-mode"]').forEach((input) => {
    input.addEventListener('change', (event) => {
      state.settings.repeatMode = event.target.value;
      saveState();
      render();
    });
  });

  const repeatInput = document.querySelector('[data-repeat-count]');
  if (repeatInput) {
    repeatInput.addEventListener('input', (event) => {
      state.settings.repeatCount = Number(event.target.value || 1);
      saveState();
    });
  }

  document.querySelectorAll('[data-interval-unit]').forEach((input) => {
    input.addEventListener('input', () => {
      const hours = Number(document.querySelector('[data-interval-unit="hours"]')?.value || 0);
      const minutes = Number(document.querySelector('[data-interval-unit="minutes"]')?.value || 0);
      const seconds = Number(document.querySelector('[data-interval-unit="seconds"]')?.value || 0);
      const milliseconds = Number(document.querySelector('[data-interval-unit="milliseconds"]')?.value || 0);
      const total = (((hours * 60 + minutes) * 60 + seconds) * 1000) + milliseconds;
      if (Number.isFinite(total) && total >= 0) {
        state.settings.interval = total;
        saveState();
        render();
      }
    });
  });

  const rangeInput = document.querySelector('[data-interval-range]');
  if (rangeInput) {
    rangeInput.addEventListener('input', (event) => {
      state.settings.interval = Number(event.target.value || 100);
      saveState();
      render();
    });
  }

  const randomToggle = document.querySelector('[data-random-toggle]');
  if (randomToggle) {
    randomToggle.addEventListener('change', (event) => {
      state.settings.randomInterval = event.target.checked;
      saveState();
      render();
    });
  }

  const randomMin = document.querySelector('[data-random-min]');
  const randomMax = document.querySelector('[data-random-max]');
  if (randomMin) {
    randomMin.addEventListener('input', (event) => {
      state.settings.randomMin = Number(event.target.value || 1);
      saveState();
    });
  }
  if (randomMax) {
    randomMax.addEventListener('input', (event) => {
      state.settings.randomMax = Number(event.target.value || 1);
      saveState();
    });
  }

  document.querySelectorAll('[data-load-preset]').forEach((button) => {
    button.addEventListener('click', () => {
      const preset = state.presets.find((entry) => entry.id === button.dataset.loadPreset);
      if (!preset) return;
      state.settings = { ...state.settings, ...preset.settings };
      saveState();
      render();
      showToast(t('loaded'));
    });
  });

  document.querySelectorAll('[data-delete-preset]').forEach((button) => {
    button.addEventListener('click', () => {
      state.presets = state.presets.filter((entry) => entry.id !== button.dataset.deletePreset);
      saveState();
      render();
      showToast(t('deleted'));
    });
  });

  document.querySelector('[data-create-preset]')?.addEventListener('click', () => {
    const name = window.prompt('Preset name', `Preset ${state.presets.length + 1}`);
    if (!name) return;
    state.presets.unshift({
      id: crypto.randomUUID(),
      name,
      settings: {
        interval: state.settings.interval,
        clickType: state.settings.clickType,
        button: state.settings.button,
        repeatMode: state.settings.repeatMode,
        repeatCount: state.settings.repeatCount,
        randomInterval: state.settings.randomInterval,
        randomMin: state.settings.randomMin,
        randomMax: state.settings.randomMax,
      }
    });
    saveState();
    render();
    showToast(t('created'));
  });

  document.querySelector('[data-clear-history]')?.addEventListener('click', () => {
    state.history = [];
    saveState();
    render();
  });

  document.querySelector('[data-reset-app]')?.addEventListener('click', () => {
    localStorage.clear();
    state.settings = { ...DEFAULT_SETTINGS };
    state.presets = [];
    state.history = [];
    state.clickCount = 0;
    state.isRunning = false;
    state.isPaused = false;
    state.startedAt = null;
    state.elapsedBeforePause = 0;
    stopClicker(true);
    render();
  });

  document.querySelector('[data-export-json]')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({ settings: state.settings, presets: state.presets, history: state.history }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'op-auto-clicker.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast(t('exported'));
  });

  document.querySelector('[data-import-json]')?.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result));
          if (!parsed || typeof parsed !== 'object') throw new Error('invalid');
          if (parsed.settings) state.settings = { ...DEFAULT_SETTINGS, ...parsed.settings };
          if (Array.isArray(parsed.presets)) state.presets = parsed.presets;
          if (Array.isArray(parsed.history)) state.history = parsed.history;
          saveState();
          render();
          showToast(t('imported'));
        } catch (error) {
          console.warn('Import failed', error);
          showToast('Import failed');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  });

  document.querySelector('[data-setting-theme]')?.addEventListener('change', (event) => {
    state.settings.theme = event.target.value;
    saveState();
    setTheme();
  });

  document.querySelector('[data-setting-language]')?.addEventListener('change', (event) => {
    state.settings.language = event.target.value;
    saveState();
    render();
  });

  document.querySelector('[data-change-hotkey]')?.addEventListener('click', () => {
    const next = window.prompt('Press new hotkey key (eg. F6)', state.settings.hotkey);
    if (!next) return;
    state.settings.hotkey = next.trim().toUpperCase();
    saveState();
    render();
  });

  updateStatsReadouts();
}

function updateStatsReadouts() {
  const homeClicks = document.getElementById('stat-clicks-home');
  const homeCps = document.getElementById('stat-cps-home');
  const homeTime = document.getElementById('stat-time-home');
  if (homeClicks) homeClicks.textContent = formatCount(state.clickCount);
  if (homeCps) homeCps.textContent = getCps().toFixed(1);
  if (homeTime) homeTime.textContent = formatDuration(getElapsedMs());
}

function validateSettings() {
  if (!Number.isFinite(state.settings.interval) || state.settings.interval <= 0) {
    showToast(t('invalidInterval'));
    return false;
  }
  if (state.settings.repeatMode === 'count' && state.settings.repeatCount <= 0) {
    showToast(t('invalidCount'));
    return false;
  }
  if (state.settings.randomInterval && Number(state.settings.randomMax) <= Number(state.settings.randomMin)) {
    showToast(t('invalidRandomRange'));
    return false;
  }
  return true;
}

function computeNextInterval() {
  if (!state.settings.randomInterval) return state.settings.interval;
  const min = Math.max(1, Number(state.settings.randomMin || 1));
  const max = Math.max(min + 1, Number(state.settings.randomMax || min + 1));
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function triggerClickPulse() {
  const orb = document.querySelector('.radar-target');
  if (!orb) return;
  orb.classList.remove('pulse');
  void orb.offsetWidth;
  orb.classList.add('pulse');
}

function performDemoClick() {
  state.clickCount += 1;
  triggerClickPulse();
  updateStatsReadouts();

  if (state.settings.repeatMode === 'count' && state.clickCount >= state.settings.repeatCount) {
    stopClicker();
    return;
  }

  if (!state.isRunning) return;
  state.loopTimer = setTimeout(() => {
    if (!state.isRunning) return;
    performDemoClick();
  }, computeNextInterval());
}

function startClicker() {
  if (!validateSettings()) return;

  if (state.isRunning || state.isPaused) return;

  state.isRunning = true;
  state.isPaused = false;
  state.startedAt = Date.now() - state.elapsedBeforePause;
  if (state.settings.startDelay > 0) {
    const warmup = state.settings.startDelay * 1000;
    state.isRunning = false;
    state.isPaused = true;
    render();
    const startAt = Date.now();
    const countdown = () => {
      const remaining = warmup - (Date.now() - startAt);
      if (remaining <= 0) {
        state.isPaused = false;
        state.isRunning = true;
        state.startedAt = Date.now() - state.elapsedBeforePause;
        performDemoClick();
        render();
        return;
      }
      setTimeout(countdown, 100);
    };
    countdown();
    showToast(`Starts in ${state.settings.startDelay}s`);
    return;
  }

  state.statsTimer = setInterval(() => updateStatsReadouts(), 100);
  render();
  performDemoClick();
  showToast(t('started'));
}

function stopClicker(forceReset = false) {
  clearTimeout(state.loopTimer);
  clearInterval(state.statsTimer);
  state.loopTimer = null;
  state.statsTimer = null;

  if (state.isRunning || state.isPaused) {
    if (!forceReset) {
      const sessionEntry = {
        id: Date.now(),
        clicks: state.clickCount,
        duration: formatDuration(getElapsedMs()),
        interval: state.settings.interval,
      };
      state.history.unshift(sessionEntry);
      state.history = state.history.slice(0, 10);
      saveState();
    }
  }

  state.isRunning = false;
  state.isPaused = false;
  state.elapsedBeforePause = getElapsedMs();
  state.startedAt = null;
  if (forceReset) {
    state.elapsedBeforePause = 0;
    state.clickCount = 0;
  }
  render();
  if (!forceReset) showToast(t('stopped'));
}

function pauseClicker() {
  if (!state.isRunning) return;
  state.isRunning = false;
  state.isPaused = true;
  clearTimeout(state.loopTimer);
  state.elapsedBeforePause = getElapsedMs();
  state.startedAt = null;
  render();
  showToast(t('paused'));
}

function resumeClicker() {
  if (!state.isPaused) return;
  state.isRunning = true;
  state.isPaused = false;
  state.startedAt = Date.now() - state.elapsedBeforePause;
  state.statsTimer = setInterval(() => updateStatsReadouts(), 100);
  performDemoClick();
  render();
  showToast(t('resumed'));
}

function resetClicker() {
  clearTimeout(state.loopTimer);
  clearInterval(state.statsTimer);
  state.isRunning = false;
  state.isPaused = false;
  state.startedAt = null;
  state.elapsedBeforePause = 0;
  state.clickCount = 0;
  render();
}

window.addEventListener('keydown', (event) => {
  const key = event.key.toUpperCase();
  const target = state.settings.hotkey.toUpperCase();

  if (key === target) {
    if (state.isRunning) {
      stopClicker();
    } else if (state.isPaused) {
      resumeClicker();
    } else {
      startClicker();
    }
  }

  if (event.key.toUpperCase() === 'F7' && state.isRunning) {
    pauseClicker();
  }

  if (event.key.toUpperCase() === 'F8') {
    resetClicker();
  }
});

function init() {
  loadState();
  setTheme();
  render();
}

init();
