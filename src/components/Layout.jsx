export const WHATSAPP = "5517974007400";

export function whatsappLink(text) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export function Chrome() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="scan" aria-hidden="true" />
      <div className="glow" aria-hidden="true" />
      <div className="progress" aria-hidden="true">
        <span className="progress__bar" />
      </div>
    </>
  );
}

export function Nav({ home = "#topo" }) {
  return (
    <header className="nav">
      <a className="nav__brand" href={home} data-magnetic>
        <span className="wordmark">
          SHINK<span>A</span>
        </span>
      </a>
      <p className="nav__meta">進化</p>
      <button className="nav__toggle" type="button" aria-label="Abrir menu" data-magnetic>
        <span />
        <span />
      </button>
    </header>
  );
}

export function Menu({ links }) {
  return (
    <nav className="menu" aria-hidden="true">
      <div className="menu__bg" />
      <div className="menu__inner">
        <p className="menu__label">Navegar</p>
        <ul className="menu__list">
          {links.map(([href, label], index) => (
            <li key={href}>
              <a href={href} data-index={String(index + 1).padStart(2, "0")}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="menu__foot">
          <p>進化</p>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__mark">
        SHINK<span>A</span>
      </p>
      <div className="footer__row">
        <p>進化</p>
        <div className="footer__social">
          <a href="https://www.instagram.com/shinkatechh/" target="_blank" rel="noreferrer" aria-label="Instagram @shinkatechh">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/shinka-techh" target="_blank" rel="noreferrer" aria-label="LinkedIn @shinkatechh">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
              <path d="M8.2 10.2v6.3M8.2 7.6v.1M11.4 16.5v-3.7c0-1.3.8-2.1 1.9-2.1s1.8.7 1.8 2.1v3.7" />
            </svg>
          </a>
        </div>
        <p>© 2026 SHINKA</p>
      </div>
    </footer>
  );
}
