import { useCallback, useRef, useState } from 'react';
import { Logo, LogoPOS } from './Logos.jsx';
import {
  TAXONOMY,
  emptyFilters,
  matchEntry,
  sortEntries,
  totalSelected,
} from './filters.js';

const SUBMIT_EMAIL = 'hi@allscale.io';
const SUBMIT_MAILTO =
  'mailto:hi@allscale.io' +
  '?subject=Ecosystem%20%E2%80%94%20%3Cyour%20app%20name%3E' +
  '&body=Name%3A%0AURL%3A%0AOne-liner%3A%0ALogo%20%28attached%29%3A';

function SideItem({ on, count, onClick, children }) {
  return (
    <div className={'dirB-side-item' + (on ? ' on' : '')} onClick={onClick}>
      <span className="dirB-side-check">
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <span>{children}</span>
      <span className="n">{count}</span>
    </div>
  );
}

function SideGroup({ title, items, key_, filters, toggle }) {
  return (
    <div className="dirB-side-group">
      <div className="dirB-side-head">
        <h4>{title}</h4>
        <span className="count">{items.length}</span>
      </div>
      <div className="dirB-side-items">
        {items.map(([label, count]) => (
          <SideItem
            key={label}
            on={filters[key_].has(label)}
            count={count}
            onClick={() => toggle(key_, label)}
          >
            {label}
          </SideItem>
        ))}
      </div>
    </div>
  );
}

function Card({ entry, onPOS }) {
  const status =
    entry.status === 'Live' ? 'live' : entry.status === 'Experiment' ? 'exp' : 'beta';
  return (
    <div
      className={'dirB-card' + (entry.status === 'Experiment' ? ' experiment' : '')}
      onClick={(e) => {
        if (entry.primary?.modal === 'pos' && onPOS) {
          e.preventDefault();
          onPOS();
          return;
        }
        if (entry.primary?.url) window.open(entry.primary.url, '_blank', 'noopener');
      }}
    >
      <div className="dirB-card-top">
        <div className="logo-wrap">
          <Logo k={entry.logo_key} size={44} />
        </div>
        <div className="dirB-card-h">
          <h3>{entry.name}</h3>
          <div className="built">by {entry.built_by}</div>
        </div>
        <span className={'dirB-status ' + status}>{entry.status}</span>
      </div>
      <div className="dirB-card-body">{entry.one_liner}</div>
      <div className="dirB-card-tags">
        {entry.surface.map((s) => (
          <span key={s} className="dirB-card-tag">
            {s}
          </span>
        ))}
        {entry.type.slice(0, 2).map((t) => (
          <span key={t} className="dirB-card-tag">
            {t}
          </span>
        ))}
      </div>
      {entry.primary && (
        <div className="dirB-card-cta">
          {entry.primary.label}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );
}

function POSModal({ onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 80,
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 27,
          width: 520,
          maxWidth: 'calc(100% - 40px)',
          padding: 36,
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <LogoPOS size={56} />
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#F2F8F5',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              color: '#0C3124',
            }}
          >
            ×
          </button>
        </div>
        <h3 style={{ fontSize: 26, fontWeight: 500, letterSpacing: '-0.02em', marginTop: 18 }}>
          Embed AllScale in your POS
        </h3>
        <p style={{ fontSize: 15, color: '#83968F', marginTop: 10, lineHeight: 1.55 }}>
          White-label stablecoin checkout for POS hardware vendors, payment processors, and merchant
          platforms. Single integration, multi-chain support, settlement in USDT or USDC.
        </p>
        <ul
          style={{
            marginTop: 18,
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {[
            'Drop-in SDK or QR-based flow',
            'Branded checkout surfaces',
            'Settlement in USDT, USDC, or local currency',
            'POS-grade reliability SLAs',
          ].map((t) => (
            <li
              key={t}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 14,
                color: '#0C3124',
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: '#E5FAF1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#009859',
                  flexShrink: 0,
                }}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              {t}
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${SUBMIT_EMAIL}?subject=AllScale%20POS%20enquiry`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginTop: 24,
            height: 48,
            background: '#009859',
            color: '#FFFFFF',
            borderRadius: 999,
            fontSize: 15,
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Email {SUBMIT_EMAIL}
        </a>
      </div>
    </div>
  );
}

export default function EcosystemDirectory({ entries }) {
  const [filters, setFilters] = useState(emptyFilters());
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [posOpen, setPosOpen] = useState(false);
  const [spotIdx, setSpotIdx] = useState(0);

  const toggle = (key, value) => {
    setFilters((f) => {
      const next = { ...f, [key]: new Set(f[key]) };
      if (next[key].has(value)) next[key].delete(value);
      else next[key].add(value);
      return next;
    });
  };

  const filtered = sortEntries(
    entries.filter((e) => matchEntry(e, filters, search)),
    sort,
  );

  const featured = entries.filter((e) => e.featured);
  const spot = featured[spotIdx] || featured[0];
  const sideTiles = featured.filter((e) => e.slug !== spot.slug).slice(0, 3);
  while (sideTiles.length < 3 && featured.length > 0) {
    sideTiles.push(featured[sideTiles.length % featured.length]);
  }

  const prevSpot = useCallback(
    () => setSpotIdx((i) => (i - 1 + featured.length) % featured.length),
    [featured.length],
  );
  const nextSpot = useCallback(
    () => setSpotIdx((i) => (i + 1) % featured.length),
    [featured.length],
  );
  const spotCardRef = useRef(null);
  const touchRef = useRef({ x: 0, dx: 0, t: 0 });
  const onSpotTouchStart = (e) => {
    touchRef.current = { x: e.touches[0].clientX, dx: 0, t: Date.now() };
  };
  const onSpotTouchMove = (e) => {
    touchRef.current.dx = e.touches[0].clientX - touchRef.current.x;
  };
  const onSpotTouchEnd = () => {
    const { dx, t } = touchRef.current;
    const dt = Date.now() - t;
    if (Math.abs(dx) > 40 || (Math.abs(dx) > 20 && dt > 0 && Math.abs(dx) / dt > 0.3)) {
      if (dx < 0) nextSpot();
      else prevSpot();
    }
  };

  const countsFor = (key) => {
    const otherFilters = { ...filters, [key]: new Set() };
    const pool = entries.filter((e) => matchEntry(e, otherFilters, search));
    const out = {};
    for (const v of TAXONOMY[key]) {
      out[v] = pool.filter((e) => {
        if (['status', 'built_by'].includes(key)) return e[key] === v;
        return e[key].includes(v);
      }).length;
    }
    return TAXONOMY[key].map((v) => [v, out[v]]);
  };

  const anySelected = totalSelected(filters) > 0 || search.trim();

  return (
    <div className="dirB">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <filter id="grain" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
              result="n"
            />
            <feColorMatrix type="saturate" values="0" in="n" result="g" />
            <feBlend in="SourceGraphic" in2="g" mode="overlay" result="b" />
            <feComposite in="b" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      <header className="dirB-top">
        <div className="dirB-brand">
          <img
            src="/allscale-logo.png"
            alt="AllScale"
            style={{ height: 26, width: 'auto', display: 'block' }}
          />
          <span className="dirB-brand-tag">Ecosystem</span>
        </div>
        <nav className="dirB-topnav">
          <a href="#submit">Submit your app</a>
          <a href="https://allscale.io" className="build">
            Build with AllScale →
          </a>
        </nav>
      </header>

      <section className="dirB-hero">
        <div className="dirB-eyebrow">AllScale Ecosystem</div>
        <h1>
          The ecosystem<br />built on <em>AllScale</em>.
        </h1>
        <div className="dirB-hero-row">
          <p>
            Stablecoin payments, payouts, and the APIs that power them — everywhere your customers
            already are. Browse official integrations, products built on AllScale, and Labs
            experiments. One directory, no marketing fluff.
          </p>
          <div className="dirB-hero-meta">
            <div className="stat">
              <b>{entries.length}</b>apps · live
            </div>
            <div className="stat">
              <b>{new Set(entries.flatMap((e) => e.surface)).size}</b>surfaces
            </div>
            <div className="stat">
              <b>{entries.filter((e) => e.status === 'Experiment').length}</b>experiments
            </div>
          </div>
        </div>
      </section>

      {spot && (
        <section className="dirB-spotlight">
          <div className="dirB-spot-eyebrow">Spotlight</div>
          <div
            className="dirB-spot-card"
            tabIndex="0"
            ref={spotCardRef}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSpot();
              }
              if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSpot();
              }
            }}
            onTouchStart={onSpotTouchStart}
            onTouchMove={onSpotTouchMove}
            onTouchEnd={onSpotTouchEnd}
          >
            <div className="dirB-spot-content">
              <span className="dirB-spot-tag">Featured · {spot.surface[0]}</span>
              <h2>{spot.name}</h2>
              <p>{spot.long_description}</p>
              <div className="dirB-spot-actions">
                {spot.primary && (
                  <a
                    className="primary"
                    href={spot.primary.url}
                    onClick={(e) => {
                      if (spot.primary.modal === 'pos') {
                        e.preventDefault();
                        setPosOpen(true);
                      }
                    }}
                  >
                    {spot.primary.label}
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
                {spot.secondary && (
                  <a className="secondary" href={spot.secondary.url}>
                    {spot.secondary.label}
                  </a>
                )}
              </div>
              <div className="dirB-spot-nav">
                <div className="dots">
                  {featured.map((e, i) => (
                    <span
                      key={e.slug}
                      className={'dot' + (i === spotIdx ? ' on' : '')}
                      onClick={() => setSpotIdx(i)}
                    />
                  ))}
                </div>
                <div className="arrows">
                  <button
                    className="dirB-spot-arrow"
                    onClick={prevSpot}
                    aria-label="Previous featured app"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    className="dirB-spot-arrow"
                    onClick={nextSpot}
                    aria-label="Next featured app"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="dirB-spot-visual">
              <div className="stack">
                {sideTiles[0] && (
                  <div className="tile t1">
                    <Logo k={sideTiles[0].logo_key} size={84} />
                  </div>
                )}
                {sideTiles[1] && (
                  <div className="tile t2">
                    <Logo k={sideTiles[1].logo_key} size={84} />
                  </div>
                )}
                {sideTiles[2] && (
                  <div className="tile t3">
                    <Logo k={sideTiles[2].logo_key} size={84} />
                  </div>
                )}
                <div className="tile t4">
                  <Logo k={spot.logo_key} size={84} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="dirB-toolrow">
        <div className="dirB-search">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            placeholder="Search the ecosystem"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="dirB-result-count">
          <b>{filtered.length}</b> of {entries.length} apps
        </div>
        <div className="dirB-sort-wrap">
          Sort by
          <button
            className="dirB-sort"
            onClick={() => {
              setSort((s) => (s === 'featured' ? 'newest' : s === 'newest' ? 'az' : 'featured'));
            }}
          >
            {sort === 'featured' ? 'Featured' : sort === 'newest' ? 'Newest' : 'A–Z'}
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>

      <div className="dirB-body">
        <aside className="dirB-sidebar">
          <SideGroup title="Surface" key_="surface" items={countsFor('surface')} filters={filters} toggle={toggle} />
          <SideGroup title="Audience" key_="audience" items={countsFor('audience')} filters={filters} toggle={toggle} />
          <SideGroup title="Type" key_="type" items={countsFor('type')} filters={filters} toggle={toggle} />
          <SideGroup title="Status" key_="status" items={countsFor('status')} filters={filters} toggle={toggle} />
          <SideGroup title="Built by" key_="built_by" items={countsFor('built_by')} filters={filters} toggle={toggle} />
          {anySelected && (
            <div
              className="dirB-side-clear"
              onClick={() => {
                setFilters(emptyFilters());
                setSearch('');
              }}
            >
              ← Reset filters
            </div>
          )}
        </aside>

        <div className="dirB-grid">
          {filtered.length === 0 ? (
            <div className="dirB-empty">
              <b>Nothing matches yet.</b>
              No apps fit those filters. Adjust your selection above.
            </div>
          ) : (
            filtered.map((e) => <Card key={e.slug} entry={e} onPOS={() => setPosOpen(true)} />)
          )}
        </div>
      </div>

      <section className="dirB-submit" id="submit">
        <div className="dirB-submit-col">
          <h3>Already building with AllScale, or want to?</h3>
          <p>
            Get listed in this directory, or talk to us about embedding AllScale in your POS, SaaS,
            or payment app. Send your name, link, one-liner, and logo — we&apos;ll review and
            publish within a week.
          </p>
        </div>
        <a className="dirB-submit-cta" href={SUBMIT_MAILTO}>
          Reach out
          <span className="mail">{SUBMIT_EMAIL}</span>
        </a>
      </section>

      <footer className="dirB-footer">
        <span>© AllScale 2026 · labs.allscale.io</span>
        <div className="dirB-footer-links">
          <a href="https://allscale.io">allscale.io</a>
          <a href="https://docs.allscale.io">Docs</a>
        </div>
      </footer>

      {posOpen && <POSModal onClose={() => setPosOpen(false)} />}
    </div>
  );
}
