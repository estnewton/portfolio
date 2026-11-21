// Small original SVG decorations: tape, binder clip, disco ball, star, pin.
// All purely decorative, so they're hidden from screen readers.

type Props = { className?: string; style?: React.CSSProperties };

export function Tape({ className = "", style, color = "var(--tape)" }: Props & { color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 28" className={className} style={style} preserveAspectRatio="none">
      <path
        d="M2 3 L6 0 L10 4 L14 1 L18 3 L84 2 L88 0 L92 3 L96 1 L99 4 L98 24 L94 27 L90 24 L86 28 L82 25 L16 26 L12 28 L8 25 L4 27 L1 24 Z"
        fill={color}
      />
      <path d="M8 9 H92" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
    </svg>
  );
}

export function BinderClip({ className = "", style }: Props) {
  return (
    <svg aria-hidden viewBox="0 0 80 56" className={className} style={style}>
      <path d="M22 26 C22 6, 34 2, 40 2 C46 2, 58 6, 58 26" fill="none" stroke="#8d8a86" strokeWidth="4" />
      <path d="M22 26 C22 6, 34 2, 40 2 C46 2, 58 6, 58 26" fill="none" stroke="#d8d5d0" strokeWidth="1.5" />
      <rect x="6" y="24" width="68" height="28" rx="4" fill="#2a2724" />
      <rect x="10" y="28" width="60" height="5" rx="2.5" fill="#4a4540" />
    </svg>
  );
}

export function DiscoBall({ className = "", style }: Props) {
  const tiles: React.ReactNode[] = [];
  // Mirror tiles mapped onto a sphere, lit from the upper left.
  const R = 48;
  const LAT = 11;
  const LON = 12;
  const L = [-0.45, -0.6, 0.66];
  const r2 = (n: number) => Math.round(n * 100) / 100;
  for (let i = 0; i < LAT; i++) {
    const a0 = -Math.PI / 2 + (i / LAT) * Math.PI;
    const a1 = -Math.PI / 2 + ((i + 1) / LAT) * Math.PI;
    const mid = (a0 + a1) / 2;
    const y0 = 50 + R * Math.sin(a0);
    const y1 = 50 + R * Math.sin(a1);
    const rr = R * Math.cos(mid);
    for (let j = 0; j < LON; j++) {
      const b0 = -Math.PI / 2 + (j / LON) * Math.PI;
      const b1 = -Math.PI / 2 + ((j + 1) / LON) * Math.PI;
      const bm = (b0 + b1) / 2;
      const x0 = 50 + rr * Math.sin(b0);
      const x1 = 50 + rr * Math.sin(b1);
      const n = [Math.cos(mid) * Math.sin(bm), Math.sin(mid), Math.cos(mid) * Math.cos(bm)];
      const light = Math.max(0, n[0] * L[0] + n[1] * L[1] + n[2] * L[2]);
      const noise = (((i * 73 + j * 151) % 17) / 17 - 0.5) * 0.5;
      const v = Math.round(Math.min(1, Math.max(0, light * 0.9 + noise + 0.1)) * 200 + 40);
      tiles.push(
        <rect
          key={`${i}-${j}`}
          x={r2(x0 + 0.4)}
          y={r2(y0 + 0.4)}
          width={r2(Math.max(0, x1 - x0 - 0.8))}
          height={r2(Math.max(0, y1 - y0 - 0.8))}
          fill={`rgb(${v},${v},${Math.min(255, v + 6)})`}
        />,
      );
    }
  }
  return (
    <svg aria-hidden viewBox="-6 -6 112 112" className={className} style={style}>
      <circle cx="50" cy="50" r="55" fill="#fff" />
      <defs>
        <clipPath id="disco-clip">
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>
      <g clipPath="url(#disco-clip)">
        <rect width="100" height="100" fill="#2a2724" />
        {tiles}
      </g>
      <circle cx="50" cy="50" r="48" fill="none" stroke="#2a2724" strokeWidth="2" />
      <path d="M30 22 l3 -7 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 z" fill="#fff" />
    </svg>
  );
}

export function StarDoodle({ className = "", style }: Props) {
  return (
    <svg aria-hidden viewBox="0 0 60 60" className={className} style={style}>
      <path
        d="M30 4 L36 22 L55 23 L40 35 L46 54 L30 43 L14 54 L20 35 L5 23 L24 22 Z"
        fill="none"
        stroke="var(--pen)"
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M27 18 L33 40 M22 30 L39 27" stroke="var(--pen)" strokeWidth="1.2" opacity="0.5" />
    </svg>
  );
}

export function PinIcon({ className = "", style }: Props) {
  return (
    <svg aria-hidden viewBox="0 0 24 32" className={className} style={style}>
      <path d="M12 31 L12 18" stroke="#6b6560" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="10" r="8" fill="var(--cherry)" />
      <circle cx="9" cy="7" r="2.4" fill="#fff" opacity="0.6" />
    </svg>
  );
}

export function SquiggleArrow({ className = "", style }: Props) {
  return (
    <svg aria-hidden viewBox="0 0 80 40" className={className} style={style} fill="none">
      <path
        d="M4 30 C14 8, 26 36, 38 18 S 60 6, 72 14"
        stroke="var(--pen)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M64 8 L73 14 L63 19" stroke="var(--pen)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Pushpin({ className = "", style, color = "var(--cherry)" }: Props & { color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className={className} style={style}>
      <ellipse cx="18" cy="24" rx="9" ry="3.5" fill="rgba(40,20,8,0.3)" />
      <circle cx="15" cy="14" r="10" fill={color} />
      <circle cx="15" cy="14" r="10" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      <ellipse cx="11.5" cy="10" rx="3.5" ry="2.4" fill="#fff" opacity="0.55" />
    </svg>
  );
}

export function PickleballPaddle({ className = "", style }: Props) {
  // Paddle with a perforated ball beside it.
  const holes = [
    [70, 18], [79, 22], [84, 31], [80, 40], [71, 43], [63, 38], [62, 28], [72, 31],
  ];
  return (
    <svg aria-hidden viewBox="0 0 96 120" className={className} style={style}>
      <rect x="31" y="78" width="14" height="38" rx="5" fill="#2a2724" transform="rotate(-14 38 97)" />
      <rect x="33" y="84" width="10" height="3" rx="1.5" fill="#4a4540" transform="rotate(-14 38 97)" />
      <rect x="33" y="92" width="10" height="3" rx="1.5" fill="#4a4540" transform="rotate(-14 38 97)" />
      <rect x="6" y="8" width="56" height="78" rx="24" fill="var(--pen)" transform="rotate(-14 34 47)" />
      <rect x="12" y="14" width="44" height="66" rx="19" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" transform="rotate(-14 34 47)" />
      <circle cx="73" cy="31" r="15" fill="#e8f04a" stroke="rgba(0,0,0,0.12)" />
      {holes.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.8" fill="#b9c22a" />
      ))}
    </svg>
  );
}

export function PaintPalette({ className = "", style }: Props) {
  const paints = [
    ["var(--cherry)", 26, 26],
    ["var(--bubblegum)", 44, 18],
    ["var(--pen)", 63, 21],
    ["#f2c14e", 76, 36],
    ["#3f9e7a", 72, 54],
  ] as const;
  return (
    <svg aria-hidden viewBox="0 0 100 84" className={className} style={style}>
      <path
        d="M50 4 C78 4, 97 22, 96 44 C95 60, 82 64, 72 60 C64 57, 58 62, 60 70 C62 79, 52 82, 42 80 C18 76, 4 60, 4 40 C4 18, 24 4, 50 4 Z"
        fill="#e9d2a8"
        stroke="rgba(90,60,30,0.35)"
        strokeWidth="1.5"
      />
      <ellipse cx="30" cy="58" rx="7" ry="6" fill="var(--board)" stroke="rgba(90,60,30,0.3)" />
      {paints.map(([fill, cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="7.5" fill={fill} />
      ))}
      <path d="M58 58 L92 82" stroke="#6b4a2b" strokeWidth="4" strokeLinecap="round" />
      <path d="M52 53 L60 59" stroke="#2a2724" strokeWidth="6" strokeLinecap="round" />
      <path d="M47 50 L53 54" stroke="var(--bubblegum)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
