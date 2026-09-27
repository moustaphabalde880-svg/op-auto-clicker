:root {
  --bg: #090611;
  --bg-2: #140d24;
  --panel: rgba(26, 19, 41, 0.8);
  --panel-strong: rgba(46, 34, 70, 0.9);
  --purple: #a86bff;
  --purple-2: #7d4fff;
  --glow: rgba(164, 108, 255, 0.9);
  --text: #f4f3ff;
  --muted: rgba(255,255,255,0.65);
  --border: rgba(255,255,255,0.09);
  --success: #39d98a;
  --warning: #ffb454;
  --danger: #ff6f7f;
  --shadow: rgba(0,0,0,0.32);
  --radius: 22px;
}

body[data-theme='light'] {
  --bg: #f5f1ff;
  --bg-2: #e8dcff;
  --panel: rgba(255,255,255,0.78);
  --panel-strong: rgba(230,219,255,0.9);
  --purple: #7d4fff;
  --purple-2: #914dff;
  --glow: rgba(125, 79, 255, 0.6);
  --text: #190d2f;
  --muted: rgba(25,13,47,0.68);
  --border: rgba(84, 50, 120, 0.12);
  --shadow: rgba(80, 60, 110, 0.18);
}

body {
  background:
    radial-gradient(circle at 50% 8%, rgba(132, 78, 255, 0.75), transparent 30%),
    linear-gradient(180deg, #090611, #120d1f 38%, #070711 100%);
  color: var(--text);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-x: hidden;
}

button, input, select {
  border: none;
  outline: none;
}

input, select {
  color: var(--text);
}

#app {
  width: min(100%, 430px);
  min-height: 100vh;
  padding: max(20px, env(safe-area-inset-top)) 14px max(18px, env(safe-area-inset-bottom));
}

.shell {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.page {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.glass-card, .panel, .hero-card, .stat-box, .preset-item, .history-card {
  background: rgba(22, 17, 33, 0.7);
  border: 1px solid var(--border);
  box-shadow: 0 8px 26px var(--shadow);
  border-radius: var(--radius);
  backdrop-filter: blur(14px);
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 4px 0;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(150, 102, 255, 0.35), rgba(255,255,255,0.05));
  border: 1px solid var(--border);
  box-shadow: 0 0 18px rgba(165, 112, 255, 0.5);
}

h1, h2, p { margin: 0; }

h1 {
  font-size: clamp(2.3rem, 6vw, 3rem);
  line-height: 1.1;
  letter-spacing: -0.05em;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  padding: 7px 12px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.85rem;
}

.status-pill [data-status-dot] {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 12px rgba(57, 217, 138, 0.8);
}

.status-pill [data-status-dot][data-state='running'] {
  background: var(--purple);
}

.status-pill [data-status-dot][data-state='paused'] {
  background: var(--warning);
}

.status-pill [data-status-dot][data-state='stopped'] {
  background: var(--danger);
}

.hero-card {
  padding: 18px 16px 14px;
  background: linear-gradient(180deg, rgba(64, 37, 98, 0.7), rgba(25, 18, 38, 0.8));
}

.hero-grid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.hero-left {
  display: grid;
  gap: 6px;
  flex: 1;
}

.mini-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  color: var(--muted);
}

.value-line {
  font-weight: 700;
  font-size: clamp(1.2rem, 3vw, 1.7rem);
}

.focus-btn {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.25);
  background: linear-gradient(135deg, rgba(165,108,255,0.4), rgba(122, 89, 255, 0.3));
  box-shadow: 0 0 28px rgba(160, 113, 255, 0.68);
  font-size: 2rem;
  color: white;
}

.primary-action {
  width: 100%;
  border: none;
  background: linear-gradient(135deg, var(--purple), #bc72ff);
  color: white;
  padding: 18px 20px;
  border-radius: 22px;
  font-size: clamp(1.2rem, 4vw, 2rem);
  font-weight: 800;
  letter-spacing: 0.04em;
  box-shadow: 0 14px 26px rgba(150, 96, 255, 0.42);
  margin-top: 18px;
}

.primary-action.big {
  margin-top: 12px;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.stat-box {
  min-height: 118px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px 14px;
}

.stat-label {
  color: var(--muted);
  font-size: 0.78rem;
  text-transform: uppercase;
}

.stat-box strong {
  margin-top: 10px;
  font-size: clamp(1.7rem, 4vw, 2.5rem);
  letter-spacing: -0.06em;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  color: var(--muted);
  padding: 8px 2px;
}

.chip-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.chip {
  background: linear-gradient(135deg, rgba(161, 109, 255, 0.8), rgba(137, 80, 255, 0.7));
  color: white;
  border-radius: 14px;
  padding: 14px 12px;
  font-weight: 700;
}

.session-list, .preset-list, .history-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.history-row, .history-card, .preset-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
}

.history-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.history-title {
  font-weight: 700;
}

.history-sub {
  color: var(--muted);
  font-size: 0.83rem;
}

.history-pill {
  border-radius: 999px;
  padding: 8px 10px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
}

.bottom-nav {
  position: sticky;
  bottom: 12px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px;
  background: rgba(16, 12, 24, 0.8);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 8px 8px 10px;
  box-shadow: 0 12px 26px rgba(5,5,15,0.45);
}

.nav-item {
  border-radius: 14px;
  background: transparent;
  color: var(--muted);
  padding: 12px 10px;
  font-size: 1.6rem;
}

.nav-item.active {
  background: linear-gradient(135deg, rgba(150,99,255,0.45), rgba(109, 97, 255, 0.38));
  color: white;
}

.page-clicker, .page-presets, .page-history, .page-settings {
  padding-top: 4px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 6px 4px;
}

.section-header h2 {
  font-size: clamp(2rem, 5vw, 2.8rem);
  letter-spacing: -0.05em;
}

.segmented {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  background: rgba(255,255,255,0.04);
  border-radius: 18px;
  padding: 7px;
}

.segment {
  border-radius: 14px;
  background: transparent;
  padding: 14px 10px;
  color: var(--muted);
  font-weight: 700;
}

.segment.active {
  background: linear-gradient(135deg, rgba(165,108,255,0.7), rgba(109,95,255,0.55));
  color: white;
}

.panel {
  padding: 16px 14px;
}

.row-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.3rem;
  margin-bottom: 14px;
}

.row-label span {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  color: var(--purple);
}

.time-grid, .double-inputs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.numeric-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 8px;
  border-radius: 14px;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border);
}

.numeric-box.small {
  min-width: 0;
}

.numeric-box span {
  color: var(--muted);
  font-size: 0.7rem;
  text-transform: uppercase;
}

.numeric-box input {
  width: 100%;
  background: transparent;
  font-size: 1.7rem;
  font-weight: 700;
  text-align: center;
}

.range {
  width: 100%;
  margin-top: 18px;
  accent-color: var(--purple);
}

.value-row {
  margin-top: 8px;
  font-size: 0.9rem;
  color: var(--muted);
  text-align: right;
}

.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.pill-btn {
  background: rgba(255,255,255,0.04);
  color: var(--text);
  padding: 12px 18px;
  border-radius: 999px;
  border: 1px solid var(--border);
  font-weight: 700;
}

.pill-btn.active {
  background: linear-gradient(135deg, rgba(163, 117, 255, 0.85), rgba(124, 90, 255, 0.7));
  color: white;
}

.toggle-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  margin-bottom: 12px;
}

.toggle-row input,
.switch-row input {
  accent-color: var(--purple);
  width: 18px;
  height: 18px;
}

.switch-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-weight: 600;
}

.count-input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  font-size: 1.2rem;
  font-weight: 700;
}

.field-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
}

.field-row:last-child {
  border-bottom: none;
}

.field-row select {
  width: 130px;
  padding: 10px 12px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: 10px;
}

.small-action {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 12px;
  padding: 10px 12px;
  font-weight: 700;
}

.small-action.destructive {
  background: rgba(255,111,127,0.12);
  color: #ffc2ca;
}

.small-action.full {
  width: 100%;
  margin-bottom: 10px;
}

.empty-text {
  color: var(--muted);
  padding: 20px 8px;
  text-align: center;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 86px;
  transform: translateX(-50%) translateY(30px);
  padding: 12px 16px;
  border-radius: 999px;
  background: rgba(18, 13, 29, 0.9);
  border: 1px solid var(--border);
  color: var(--text);
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease;
  z-index: 99;
}

.toast.visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

@media (min-width: 768px) {
  #app {
    width: min(100%, 980px);
  }

  .shell {
    padding: 14px 12px 0;
  }

  .bottom-nav {
    max-width: 520px;
    margin: 0 auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}

@media (max-width: 360px) {
  .time-grid, .double-inputs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .chip-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
