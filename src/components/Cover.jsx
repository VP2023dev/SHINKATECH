// Capa do projeto. Se o projeto tiver `imagem`, mostra a imagem.
// Se não tiver, desenha uma capa no estilo da SHINKA de acordo com o tipo.

const KANJI = { landing: "頁", sistemas: "系", integracao: "繋" };

function seeded(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LINE = "rgba(243,243,241,0.22)";
const SOFT = "rgba(243,243,241,0.1)";
const RED = "#e30613";

function Flow({ rnd }) {
  const xs = [110, 250, 400, 550, 690];
  const nodes = xs.map((x) => ({ x, y: 200 + Math.round((rnd() - 0.5) * 120) }));
  const hot = 1 + Math.floor(rnd() * 3);
  const path = nodes.map((n, i) => `${i ? "L" : "M"}${n.x} ${n.y}`).join(" ");
  return (
    <g>
      <path d={path} fill="none" stroke={LINE} strokeWidth="1.5" className="cover__dash" />
      {nodes.map((n, i) =>
        i === hot ? (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="58" fill="url(#cv-glow)" />
            <rect x={n.x - 26} y={n.y - 26} width="52" height="52" fill={RED} transform={`rotate(45 ${n.x} ${n.y})`} />
          </g>
        ) : i === nodes.length - 1 ? (
          <g key={i}>
            <rect x={n.x - 42} y={n.y - 26} width="84" height="52" fill="#141416" stroke={RED} />
            <path d={`M${n.x - 12} ${n.y} l8 8 l16 -18`} fill="none" stroke={RED} strokeWidth="2.5" />
          </g>
        ) : (
          <g key={i}>
            <rect x={n.x - 42} y={n.y - 26} width="84" height="52" fill="#141416" stroke={LINE} />
            <rect x={n.x - 28} y={n.y - 10} width={34 + Math.round(rnd() * 22)} height="5" fill={SOFT} />
            <rect x={n.x - 28} y={n.y + 4} width={20 + Math.round(rnd() * 20)} height="5" fill={SOFT} />
          </g>
        ),
      )}
      {nodes.map((n, i) => (
        <text key={`t${i}`} x={n.x} y={n.y + 60 + (i === hot ? 10 : 0)} className="cover__label" textAnchor="middle">
          {String(i + 1).padStart(2, "0")}
        </text>
      ))}
    </g>
  );
}

function Dashboard({ rnd }) {
  const bars = Array.from({ length: 11 }, () => 40 + Math.round(rnd() * 120));
  const top = bars.indexOf(Math.max(...bars));
  return (
    <g>
      <rect x="90" y="64" width="620" height="372" fill="#121214" stroke={LINE} />
      <rect x="90" y="64" width="620" height="34" fill="#18181b" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={110 + i * 16} cy="81" r="4" fill={i === 0 ? RED : SOFT} />
      ))}
      <rect x="90" y="98" width="120" height="338" fill="#0f0f11" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="108" y={124 + i * 30} width={i === 1 ? 70 : 50 + Math.round(rnd() * 30)} height="6" fill={i === 1 ? RED : SOFT} />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={`k${i}`}>
          <rect x={232 + i * 158} y="118" width="142" height="70" fill="none" stroke={SOFT} />
          <rect x={248 + i * 158} y="136" width="40" height="5" fill={SOFT} />
          <rect x={248 + i * 158} y="152" width={50 + Math.round(rnd() * 50)} height="16" fill={i === 0 ? RED : "rgba(243,243,241,0.35)"} />
        </g>
      ))}
      <line x1="232" y1="412" x2="690" y2="412" stroke={LINE} />
      {bars.map((h, i) => (
        <rect key={`b${i}`} x={240 + i * 41} y={412 - h} width="24" height={h} fill={i === top ? RED : "rgba(243,243,241,0.16)"} />
      ))}
    </g>
  );
}

function Hub({ rnd }) {
  const cx = 400;
  const cy = 250;
  const count = 6;
  const offset = rnd() * Math.PI;
  const sats = Array.from({ length: count }, (_, i) => {
    const a = offset + (i / count) * Math.PI * 2;
    const r = 175 + rnd() * 30;
    return { x: cx + Math.cos(a) * r * 1.45, y: cy + Math.sin(a) * r * 0.82 };
  });
  return (
    <g>
      {sats.map((s, i) => (
        <line key={`l${i}`} x1={cx} y1={cy} x2={s.x} y2={s.y} stroke={LINE} strokeWidth="1.5" className="cover__dash" />
      ))}
      {sats.map((s, i) => (
        <g key={i}>
          <rect x={s.x - 46} y={s.y - 20} width="92" height="40" fill="#141416" stroke={LINE} />
          <rect x={s.x - 32} y={s.y - 3} width={30 + Math.round(rnd() * 30)} height="6" fill={SOFT} />
        </g>
      ))}
      <circle cx={cx} cy={cy} r="90" fill="url(#cv-glow)" />
      <rect x={cx - 34} y={cy - 34} width="68" height="68" fill={RED} transform={`rotate(45 ${cx} ${cy})`} />
      <rect x={cx - 12} y={cy - 12} width="24" height="24" fill="#070708" transform={`rotate(45 ${cx} ${cy})`} />
    </g>
  );
}

export default function Cover({ projeto, className = "" }) {
  if (projeto.imagem) {
    return (
      <div className={`cover ${className}`}>
        <img src={projeto.imagem} alt={projeto.titulo} loading="lazy" />
      </div>
    );
  }

  const rnd = seeded(projeto.slug);
  const id = projeto.slug;
  const glowX = 20 + Math.round(rnd() * 60);

  return (
    <div className={`cover ${className}`}>
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label={projeto.titulo}>
        <defs>
          <linearGradient id={`cv-bg-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1a1a1d" />
            <stop offset="1" stopColor="#0c0c0e" />
          </linearGradient>
          <radialGradient id={`cv-red-${id}`} cx={`${glowX}%`} cy="100%" r="70%">
            <stop offset="0" stopColor="rgba(227,6,19,0.22)" />
            <stop offset="1" stopColor="rgba(227,6,19,0)" />
          </radialGradient>
          <pattern id={`cv-grid-${id}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="rgba(243,243,241,0.045)" />
          </pattern>
        </defs>
        <rect width="800" height="500" fill={`url(#cv-bg-${id})`} />
        <rect width="800" height="500" fill={`url(#cv-grid-${id})`} />
        <rect width="800" height="500" fill={`url(#cv-red-${id})`} />
        <text x="780" y="470" textAnchor="end" className="cover__kanji">
          {KANJI[projeto.tipo] ?? "進"}
        </text>
        {projeto.tipo === "sistemas" && <Dashboard rnd={rnd} />}
        {projeto.tipo === "landing" && <Flow rnd={rnd} />}
        {projeto.tipo === "integracao" && <Hub rnd={rnd} />}
      </svg>
    </div>
  );
}

export function CoverDefs() {
  // Gradiente de brilho compartilhado por todas as capas.
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <radialGradient id="cv-glow">
          <stop offset="0" stopColor="rgba(227,6,19,0.45)" />
          <stop offset="1" stopColor="rgba(227,6,19,0)" />
        </radialGradient>
      </defs>
    </svg>
  );
}
