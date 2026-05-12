export const premiumStyles = `
:root {
  --ink: #101418;
  --muted: #66736d;
  --line: #dfe5df;
  --wash: #f3f6f1;
  --surface: #ffffff;
  --surface-strong: #f9fbf7;
  --accent: #1d6b57;
  --accent-strong: #154f42;
  --lime: #d8f56d;
  --mint: #dff5e8;
  --shadow: 0 24px 80px rgba(16, 20, 24, 0.1);
  --font: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background:
    radial-gradient(circle at 18% 0%, rgba(216, 245, 109, 0.28), transparent 28rem),
    linear-gradient(180deg, #fbfcf8 0%, #f4f7f1 45%, #fbfcf8 100%);
  color: var(--ink);
  font-family: var(--font);
  margin: 0;
}

a {
  transition: color 180ms ease, border-color 180ms ease, background 180ms ease, transform 180ms ease, box-shadow 180ms ease;
}

.topbar {
  align-items: center;
  backdrop-filter: blur(18px);
  background: rgba(251, 252, 248, 0.86);
  border-bottom: 1px solid rgba(223, 229, 223, 0.82);
  display: flex;
  gap: 28px;
  justify-content: space-between;
  padding: 16px clamp(18px, 4vw, 56px);
  position: sticky;
  top: 0;
  z-index: 10;
}

.brand {
  align-items: center;
  color: var(--ink);
  display: flex;
  font-weight: 900;
  gap: 10px;
  text-decoration: none;
}

.brand span {
  align-items: center;
  background: linear-gradient(145deg, var(--ink), #25332d);
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12), 0 12px 24px rgba(16, 20, 24, 0.18);
  color: var(--lime);
  display: inline-flex;
  height: 36px;
  justify-content: center;
  width: 36px;
}

.topbar nav,
.footer nav {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.topbar a,
.footer a {
  color: var(--muted);
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
}

.topbar nav a:hover,
.footer a:hover {
  color: var(--ink);
}

.hero {
  display: grid;
  gap: 44px;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 380px);
  min-height: 560px;
  overflow: hidden;
  padding: 82px clamp(18px, 4vw, 56px) 52px;
  position: relative;
}

.hero::after {
  background: linear-gradient(135deg, rgba(29, 107, 87, 0.14), rgba(216, 245, 109, 0.16));
  border: 1px solid rgba(29, 107, 87, 0.12);
  border-radius: 999px;
  content: "";
  height: 360px;
  position: absolute;
  right: -160px;
  top: 80px;
  transform: rotate(-14deg);
  width: 360px;
  z-index: -1;
}

.hero h1 {
  font-size: clamp(46px, 6.5vw, 84px);
  letter-spacing: 0;
  line-height: 0.92;
  margin: 0;
  max-width: 920px;
}

.hero p {
  color: var(--muted);
  font-size: 18px;
  line-height: 1.65;
  max-width: 740px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.primary,
.secondary,
.tool-card a {
  border-radius: 8px;
  display: inline-flex;
  font-weight: 900;
  min-height: 44px;
  padding: 11px 15px;
  text-decoration: none;
}

.primary,
.tool-card a {
  background: var(--accent);
  box-shadow: 0 12px 28px rgba(29, 107, 87, 0.2);
  color: white;
}

.primary:hover,
.tool-card a:hover {
  background: var(--accent-strong);
  transform: translateY(-2px);
}

.secondary {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid var(--line);
  color: var(--ink);
}

.secondary:hover,
.category-card:hover,
.tool-card:hover {
  box-shadow: var(--shadow);
  transform: translateY(-3px);
}

.finder-panel {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent),
    #101418;
  border-radius: 10px;
  box-shadow: var(--shadow);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 330px;
  overflow: hidden;
  padding: 26px;
  position: relative;
}

.finder-panel::before {
  animation: slow-sweep 8s ease-in-out infinite alternate;
  background: linear-gradient(90deg, transparent, rgba(216, 245, 109, 0.22), transparent);
  content: "";
  height: 120%;
  left: -70%;
  position: absolute;
  top: -10%;
  transform: rotate(18deg);
  width: 55%;
}

.finder-panel > * {
  position: relative;
}

.finder-panel span,
.tool-card span {
  color: var(--muted);
  display: block;
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
}

.finder-panel span {
  color: var(--lime);
}

.finder-panel strong {
  display: block;
  font-size: 30px;
  line-height: 1.08;
}

.section,
.finder-app,
.content,
.legal {
  border-top: 1px solid var(--line);
  padding: 48px clamp(18px, 4vw, 56px);
}

.section h2 {
  font-size: 36px;
  line-height: 1.05;
  margin: 0 0 20px;
}

.section-heading {
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  margin-bottom: 20px;
}

.section-heading h2 {
  margin: 0;
}

.section-heading a {
  background: white;
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--ink);
  font-size: 14px;
  font-weight: 900;
  padding: 10px 12px;
  text-decoration: none;
}

.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.category-card,
.tool-card,
.content,
.legal,
.result {
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(223, 229, 223, 0.95);
  border-radius: 10px;
  color: var(--ink);
  padding: 22px;
  text-decoration: none;
}

.category-card,
.tool-card {
  box-shadow: 0 10px 30px rgba(16, 20, 24, 0.04);
}

.category-card h3,
.tool-card h3 {
  margin: 0 0 10px;
}

.category-card p,
.tool-card p,
.content p,
.legal p,
.legal li {
  color: var(--muted);
  line-height: 1.65;
}

.tool-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: space-between;
  min-height: 280px;
}

.tool-card ul {
  color: var(--muted);
  line-height: 1.55;
  margin: 0;
  padding-left: 18px;
}

.card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tool-card a.secondary-action {
  background: white;
  border: 1px solid var(--line);
  box-shadow: none;
  color: var(--ink);
}

.content-blocks {
  border-top: 1px solid var(--line);
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: 48px clamp(18px, 4vw, 56px);
}

.table-section,
.faq-section,
.email-cta {
  border-top: 1px solid var(--line);
  padding: 48px clamp(18px, 4vw, 56px);
}

.table-section h2,
.faq-section h2,
.email-cta h2 {
  font-size: 34px;
  line-height: 1.05;
  margin: 0 0 20px;
}

.table-section table {
  background: white;
  border: 1px solid var(--line);
  border-collapse: collapse;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(16, 20, 24, 0.04);
  overflow: hidden;
  width: 100%;
}

.table-section th,
.table-section td {
  border-bottom: 1px solid var(--line);
  line-height: 1.55;
  padding: 15px;
  text-align: left;
  vertical-align: top;
}

.table-section th {
  background: var(--surface-strong);
  font-size: 13px;
  text-transform: uppercase;
}

.table-section td {
  color: var(--muted);
}

.table-section a {
  color: var(--accent);
  font-weight: 900;
}

.faq-grid {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.faq-grid details {
  background: white;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 18px;
}

.faq-grid summary {
  cursor: pointer;
  font-weight: 900;
}

.faq-grid p {
  color: var(--muted);
  line-height: 1.65;
  margin: 12px 0 0;
}

.email-cta {
  align-items: end;
  background: #101418;
  color: white;
  display: grid;
  gap: 28px;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 420px);
}

.email-cta span {
  color: var(--lime);
  display: block;
  font-size: 12px;
  font-weight: 900;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.email-cta h2 {
  color: white;
  margin-bottom: 12px;
}

.email-cta p {
  color: #c6cec4;
  line-height: 1.65;
  margin: 0;
  max-width: 760px;
}

.email-cta form {
  display: grid;
  gap: 12px;
}

.email-cta label {
  color: #c6cec4;
}

.email-cta button {
  background: var(--lime);
  border: 0;
  border-radius: 8px;
  color: var(--ink);
  cursor: pointer;
  font: 900 15px/1 var(--font);
  min-height: 46px;
  padding: 0 16px;
}

.content ul,
.content ol {
  color: var(--muted);
  line-height: 1.65;
  margin: 16px 0 0;
  padding-left: 20px;
}

.mini-link-grid {
  display: grid;
  gap: 10px;
  margin-top: 16px;
}

.mini-link-grid a {
  background: var(--surface-strong);
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--ink);
  display: grid;
  gap: 4px;
  padding: 14px;
  text-decoration: none;
}

.mini-link-grid span {
  color: var(--muted);
  line-height: 1.5;
}

.tool-meta {
  background: var(--surface-strong);
  border: 1px solid var(--line);
  border-radius: 8px;
  display: grid;
  gap: 4px;
  padding: 12px;
}

.tool-meta strong {
  font-size: 14px;
}

.tool-meta small {
  color: var(--muted);
  font-weight: 800;
}

.finder-app {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.finder-app .grid {
  grid-column: 1 / -1;
}

label {
  color: var(--muted);
  display: grid;
  font-size: 12px;
  font-weight: 900;
  gap: 8px;
  text-transform: uppercase;
}

input,
select {
  background: white;
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--ink);
  font: 800 14px/1.35 var(--font);
  min-height: 44px;
  padding: 0 12px;
  width: 100%;
}

.compare {
  border-top: 1px solid var(--line);
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: 48px clamp(18px, 4vw, 56px);
}

.result strong {
  display: block;
  font-size: 34px;
}

.result span {
  color: var(--muted);
}

.footer {
  background: #101418;
  color: white;
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 36px clamp(18px, 4vw, 56px);
}

.footer p {
  color: #c6cec4;
  margin: 8px 0 0;
}

.footer a:hover {
  color: white;
}

@keyframes slow-sweep {
  from {
    transform: translateX(0) rotate(18deg);
  }
  to {
    transform: translateX(210%) rotate(18deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}

@media (max-width: 900px) {
  .topbar,
  .footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .hero,
  .grid,
  .finder-app,
  .compare,
  .content-blocks,
  .faq-grid,
  .email-cta {
    grid-template-columns: 1fr;
  }

  .table-section {
    overflow-x: auto;
  }

  .hero {
    min-height: auto;
    padding-top: 48px;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
  }
}
`
