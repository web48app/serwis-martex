import { useId } from 'react';
import './Wheel.css';

const C = 300;
const r1 = (n: number) => Math.round(n * 10) / 10;

/** Punkt na okręgu o promieniu r, kąt w stopniach (0 = góra, zgodnie z ruchem wskazówek). */
function at(r: number, deg: number): [number, number] {
  const t = ((deg - 90) * Math.PI) / 180;
  return [r1(C + r * Math.cos(t)), r1(C + r * Math.sin(t))];
}

function arc(rIn: number, rOut: number, a1: number, a2: number): string {
  const [x1, y1] = at(rOut, a1);
  const [x2, y2] = at(rOut, a2);
  const [x3, y3] = at(rIn, a2);
  const [x4, y4] = at(rIn, a1);
  return `M${x1},${y1}A${rOut},${rOut} 0 0,1 ${x2},${y2}L${x3},${y3}A${rIn},${rIn} 0 0,0 ${x4},${y4}Z`;
}

const TREAD = Array.from({ length: 72 }, (_, i) => {
  const a = i * 5;
  const p = [at(291, a - 1.4), at(291, a + 1.4), at(268, a + 3.2), at(268, a + 0.6)];
  return `M${p.map((q) => q.join(',')).join('L')}Z`;
});

const HOLES = [
  ...Array.from({ length: 18 }, (_, i) => at(130, i * 20)),
  ...Array.from({ length: 18 }, (_, i) => at(112, i * 20 + 10)),
];

const SPOKES = Array.from({ length: 5 }).flatMap((_, i) =>
  [-9, 9].map((d) => {
    const a = i * 72 + d;
    const p = [at(70, a - 4.5), at(70, a + 4.5), at(196, a + d * 0.55 + 5), at(196, a + d * 0.55 - 5)];
    return `M${p.map((q) => q.join(',')).join('L')}Z`;
  }),
);

const LUGS = Array.from({ length: 5 }, (_, i) => at(56, i * 72 + 36));

/** Realistyczne koło: opona z bieżnikiem, alufelga, tarcza z otworami i nieruchomy czerwony zacisk. */
export function Wheel() {
  const uid = useId().replace(/:/g, '');
  const id = (name: string) => `${uid}-${name}`;
  const url = (name: string) => `url(#${id(name)})`;
  const [tx, ty] = at(146, 46);

  return (
    <svg
      className="wheel"
      viewBox="0 0 600 600"
      role="img"
      aria-label="Koło z oponą, alufelgą i czerwonym zaciskiem hamulcowym"
    >
      <defs>
        <radialGradient id={id('rub')} cx="50%" cy="50%" r="50%">
          <stop offset="66%" stopColor="#1b1c1f" />
          <stop offset="80%" stopColor="#2a2b30" />
          <stop offset="92%" stopColor="#17181a" />
          <stop offset="100%" stopColor="#0c0c0d" />
        </radialGradient>
        <linearGradient id={id('side')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#34353b" />
          <stop offset=".5" stopColor="#1d1e21" />
          <stop offset="1" stopColor="#2b2c31" />
        </linearGradient>
        <linearGradient id={id('metal')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f2f3f5" />
          <stop offset=".35" stopColor="#a9adb4" />
          <stop offset=".6" stopColor="#e3e5e8" />
          <stop offset="1" stopColor="#6d7178" />
        </linearGradient>
        <linearGradient id={id('spoke')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dfe2e6" />
          <stop offset=".5" stopColor="#9aa0a8" />
          <stop offset="1" stopColor="#cfd3d8" />
        </linearGradient>
        <radialGradient id={id('disc')} cx="50%" cy="50%" r="50%">
          <stop offset="35%" stopColor="#55585e" />
          <stop offset="70%" stopColor="#8a8e95" />
          <stop offset="100%" stopColor="#5b5e64" />
        </radialGradient>
        <linearGradient id={id('red')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff3b30" />
          <stop offset=".55" stopColor="#e10600" />
          <stop offset="1" stopColor="#8f0400" />
        </linearGradient>
        <radialGradient id={id('cap')} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#3a3b40" />
          <stop offset="1" stopColor="#0d0d0f" />
        </radialGradient>
        <path id={id('txt')} d="M300,300 m-238,0 a238,238 0 1,1 476,0 a238,238 0 1,1 -476,0" />
      </defs>

      <ellipse cx="300" cy="575" rx="230" ry="18" fill="#000" opacity=".45" />

      <g className="wheel__spin">
        <circle cx={C} cy={C} r="292" fill={url('rub')} />
        {TREAD.map((d, i) => (
          <path key={i} d={d} fill="#0b0b0c" />
        ))}
        <circle cx={C} cy={C} r="266" fill={url('side')} stroke="#0e0e10" strokeWidth="3" />
        <text className="wheel__text">
          <textPath href={`#${id('txt')}`}>
            MARTEX · SERWIS OPON · TARNÓW · 225/45 R17 94W · MARTEX · WINTER ❄ M+S ·
          </textPath>
        </text>
        <circle cx={C} cy={C} r="212" fill="#0f0f11" />
        <circle cx={C} cy={C} r="204" fill={url('metal')} />
        <circle cx={C} cy={C} r="194" fill="#141518" />
        <circle cx={C} cy={C} r="150" fill={url('disc')} stroke="#3d4045" strokeWidth="2" />
        {HOLES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4.2" fill="#2a2c30" />
        ))}
        <circle cx={C} cy={C} r="78" fill="#3b3e43" />
      </g>

      <g>
        <path
          d={arc(118, 172, 18, 74)}
          fill={url('red')}
          stroke="#5e0200"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d={arc(150, 166, 26, 66)} fill="#ff5a50" opacity=".35" />
        <text x={tx} y={ty} transform={`rotate(46 ${tx} ${ty})`} className="wheel__caliper-text">
          MARTEX
        </text>
      </g>

      <g className="wheel__spin">
        {SPOKES.map((d, i) => (
          <path key={i} d={d} fill={url('spoke')} stroke="#5f646b" strokeWidth="1.5" strokeLinejoin="round" />
        ))}
        <circle cx={C} cy={C} r="196" fill="none" stroke={url('metal')} strokeWidth="10" />
        <circle cx={C} cy={C} r="74" fill={url('metal')} stroke="#6d7178" strokeWidth="2" />
        {LUGS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6.5" fill="#2b2d31" stroke="#c9ccd1" strokeWidth="2" />
        ))}
        <circle cx={C} cy={C} r="36" fill={url('cap')} stroke="#9aa0a8" strokeWidth="2.5" />
        <text x={C} y={C + 2} className="wheel__cap-text">
          M
        </text>
      </g>
    </svg>
  );
}
