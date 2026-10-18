// Hand-drawn style 2x2 for the Execute lesson: channel noise (up = quieter)
// vs. message impact (right = more unique and valuable).
const BLUE = "#4f9bff";
const AMBER = "#f5b524";
const GREEN = "#22b07d";
const INK = "#a1a2aa";
const TEXT = "#f2f2f4";

// A slightly wobbly pill around a label, centered at (cx, cy).
function blob(cx: number, cy: number, w: number, h = 32) {
  const l = cx - w / 2, r = cx + w / 2, t = cy - h / 2, b = cy + h / 2;
  return `M${l + 2} ${cy} Q ${l} ${t - 1} ${cx} ${t} Q ${r + 1} ${t + 1} ${r} ${cy} Q ${r + 2} ${b + 1} ${cx} ${b} Q ${l - 1} ${b + 1} ${l + 2} ${cy} Z`;
}

function Item({ cx, cy, w, color, label, dashed = false }: { cx: number; cy: number; w: number; color: string; label: string; dashed?: boolean }) {
  return (
    <g>
      <path
        d={blob(cx, cy, w)}
        fill={color}
        fillOpacity={dashed ? 0.1 : 0.22}
        stroke={color}
        strokeWidth={1.6}
        strokeDasharray={dashed ? "5 4" : undefined}
      />
      <text x={cx} y={cy + 6} textAnchor="middle" fill={TEXT} fontSize={20} className="font-hand">
        {label}
      </text>
    </g>
  );
}

function Swatch({ x, color, label, dashed = false }: { x: number; color: string; label: string; dashed?: boolean }) {
  return (
    <g>
      <path d={blob(x + 7, 444, 14, 14)} fill={dashed ? "none" : color} fillOpacity={0.35} stroke={color} strokeWidth={1.4} strokeDasharray={dashed ? "3 3" : undefined} />
      <text x={x + 22} y={450} fill={INK} fontSize={18} className="font-hand">
        {label}
      </text>
    </g>
  );
}

export function ChannelMap() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-c-line bg-c-card p-4 sm:p-6">
      <svg viewBox="0 0 680 470" className="h-auto w-full" role="img" aria-labelledby="channel-map-title">
        <title id="channel-map-title">
          Channel noise vs. message impact: LinkedIn and email are crowded, a phone call is in the middle, and a physical
          letter, event or personal item sit in the sweet spot. Email with your High Value Product moves toward higher impact.
        </title>
        <defs>
          <marker id="cm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* Axes and quadrant lines */}
        <path d="M108 392 C 230 389, 420 395, 612 390" fill="none" stroke={INK} strokeWidth={1.8} strokeLinecap="round" markerEnd="url(#cm-arrow)" />
        <path d="M110 394 C 107 300, 113 160, 109 52" fill="none" stroke={INK} strokeWidth={1.8} strokeLinecap="round" markerEnd="url(#cm-arrow)" />
        <path d="M361 60 C 357 140, 364 260, 359 384" fill="none" stroke={INK} strokeWidth={1} strokeDasharray="6 7" opacity={0.5} />
        <path d="M116 222 C 250 218, 470 226, 606 220" fill="none" stroke={INK} strokeWidth={1} strokeDasharray="6 7" opacity={0.5} />

        {/* Axis labels */}
        <g className="font-hand">
          <text x={110} y={36} fill={TEXT} fontSize={22} fontWeight={700}>Channel noise</text>
          <text x={98} y={72} textAnchor="end" fill={INK} fontSize={18}>Quiet</text>
          <text x={98} y={386} textAnchor="end" fill={INK} fontSize={18}>Crowded</text>
          <text x={112} y={416} fill={INK} fontSize={18}>Generic</text>
          <text x={610} y={416} textAnchor="end" fill={INK} fontSize={18}>Unique + valuable</text>
          <text x={360} y={416} textAnchor="middle" fill={TEXT} fontSize={22} fontWeight={700}>Message impact</text>

          {/* Quadrant names */}
          <text x={236} y={88} textAnchor="middle" fill={INK} fontSize={18} opacity={0.8}>Nice gesture, empty message</text>
          <text x={545} y={84} textAnchor="middle" fill={GREEN} fontSize={23} fontWeight={700}>Sweet spot</text>
          <text x={236} y={374} textAnchor="middle" fill={INK} fontSize={18} opacity={0.8}>Ignored</text>
          <text x={486} y={374} textAnchor="middle" fill={INK} fontSize={18} opacity={0.8}>Needs a killer message</text>
        </g>

        {/* Channels */}
        <Item cx={555} cy={114} w={112} color={GREEN} label="Personal item" />
        <Item cx={434} cy={152} w={126} color={GREEN} label="Physical letter" />
        <Item cx={556} cy={178} w={78} color={GREEN} label="Event" />
        <Item cx={300} cy={252} w={106} color={AMBER} label="Phone call" />
        <Item cx={190} cy={332} w={98} color={BLUE} label="LinkedIn" />
        <Item cx={300} cy={322} w={88} color={BLUE} label="Email" />
        <Item cx={500} cy={302} w={164} color={BLUE} label="Email + your HVP" dashed />
        <path d="M348 320 C 372 326, 392 315, 414 306" fill="none" stroke={BLUE} strokeWidth={1.6} strokeLinecap="round" markerEnd="url(#cm-arrow)" />

        {/* Legend */}
        <Swatch x={120} color={BLUE} label="Online" />
        <Swatch x={226} color={AMBER} label="Voice" />
        <Swatch x={324} color={GREEN} label="In person / physical" />
        <Swatch x={490} color={BLUE} label="Upgraded message" dashed />
      </svg>
    </figure>
  );
}
