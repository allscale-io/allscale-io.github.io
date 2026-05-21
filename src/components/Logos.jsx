// Brand logos for directory items.
// SVG approximations using each brand's iconic mark + palette.

export function LogoTelegram({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" aria-hidden>
      <defs>
        <linearGradient id="tg-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#37BBFE" />
          <stop offset="1" stopColor="#007DBB" />
        </linearGradient>
      </defs>
      <circle cx="28" cy="28" r="28" fill="url(#tg-grad)" />
      <path
        d="M12 27.5 L42 16 L37.5 41 L29 35.5 L25 39.5 L25 33 L37 21 L22.5 31.5 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function LogoWordPress({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" aria-hidden>
      <circle cx="28" cy="28" r="28" fill="#21759B" />
      <circle cx="28" cy="28" r="22" fill="none" stroke="#FFFFFF" strokeWidth="2" />
      <g
        fill="#FFFFFF"
        fontFamily="Archivo, sans-serif"
        fontWeight="700"
        fontSize="22"
        textAnchor="middle"
        letterSpacing="-1.2"
      >
        <text x="28" y="36">W</text>
      </g>
    </svg>
  );
}

export function LogoWooCommerce({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" aria-hidden>
      <rect width="56" height="56" rx="14" fill="#873EFF" />
      <path
        d="M9 18 Q9 14 13 14 H43 Q47 14 47 18 V32 Q47 36 43 36 H36 L31 42 L31 36 H13 Q9 36 9 32 Z"
        fill="#FFFFFF"
      />
      <g
        fill="#873EFF"
        fontFamily="Archivo, sans-serif"
        fontWeight="700"
        fontSize="9.5"
        textAnchor="middle"
        letterSpacing="-0.5"
      >
        <text x="28" y="29">Woo</text>
      </g>
    </svg>
  );
}

export function LogoClaude({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" aria-hidden>
      <rect width="56" height="56" rx="14" fill="#F0EEE6" />
      <g fill="#CC785C">
        <path d="M22.2 16 L25.2 16 L31 31 L28 31 Z" />
        <path d="M33.8 16 L36.8 16 L42 40 L39 40 Z" />
        <path d="M14 40 L17.2 40 L22.5 26 L26 26 L24 40 L20 40 Z" />
      </g>
    </svg>
  );
}

export function LogoSolana({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" aria-hidden>
      <defs>
        <linearGradient id="sol-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9945FF" />
          <stop offset="1" stopColor="#14F195" />
        </linearGradient>
      </defs>
      <rect width="56" height="56" rx="14" fill="#0C0C0C" />
      <g fill="url(#sol-grad)">
        <path d="M14 19 L40 19 L46 14 L20 14 Z" />
        <path d="M14 31 L40 31 L46 26 L20 26 Z" />
        <path d="M14 43 L40 43 L46 38 L20 38 Z" opacity="0.9" />
      </g>
    </svg>
  );
}

export function LogoPOS({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" aria-hidden>
      <rect width="56" height="56" rx="14" fill="#0C3124" />
      <rect x="14" y="13" width="28" height="20" rx="3" fill="#12D16B" />
      <rect x="17" y="17" width="22" height="9" rx="1.5" fill="#0C3124" />
      <rect x="17" y="28" width="6" height="2" rx="0.5" fill="#0C3124" opacity="0.5" />
      <rect x="24" y="28" width="6" height="2" rx="0.5" fill="#0C3124" opacity="0.5" />
      <rect x="31" y="28" width="6" height="2" rx="0.5" fill="#0C3124" opacity="0.5" />
      <rect x="11" y="36" width="34" height="9" rx="2" fill="#009859" />
      <rect x="14" y="39" width="28" height="3" rx="1" fill="#0C3124" opacity="0.3" />
    </svg>
  );
}

export function LogoX402({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" aria-hidden>
      <rect width="56" height="56" rx="14" fill="#0C3124" />
      <text
        x="28"
        y="36"
        fill="#12D16B"
        fontFamily="Archivo, sans-serif"
        fontWeight="700"
        fontSize="20"
        textAnchor="middle"
        letterSpacing="-1"
      >
        x402
      </text>
    </svg>
  );
}

const LOGOS = {
  telegram: LogoTelegram,
  wordpress: LogoWordPress,
  woocommerce: LogoWooCommerce,
  claude: LogoClaude,
  solana: LogoSolana,
  pos: LogoPOS,
  x402: LogoX402,
};

export function Logo({ k, size }) {
  const C = LOGOS[k];
  if (!C) {
    return <div style={{ width: size, height: size, background: '#F2F8F5', borderRadius: 14 }} />;
  }
  return <C size={size} />;
}
