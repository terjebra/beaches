interface CompassProps {
  windFrom: number;
}

export function Compass({ windFrom }: CompassProps) {
  const rot = (windFrom + 180) % 360;

  return (
    <div className="compass" aria-hidden="true">
      <svg viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="rgba(255,255,255,.07)"
          stroke="rgba(255,255,255,.35)"
          strokeWidth="1.5"
        />
        <g
          fill="#BFDCE8"
          fontFamily="Familjen Grotesk"
          fontSize="11"
          fontWeight="600"
          textAnchor="middle"
        >
          <text x="60" y="16">
            N
          </text>
          <text x="108" y="64">
            Ø
          </text>
          <text x="60" y="112">
            S
          </text>
          <text x="12" y="64">
            V
          </text>
        </g>
        <g className="arrow" style={{ transform: `rotate(${rot}deg)` }}>
          <path d="M60 24 L68 52 L60 46 L52 52 Z" fill="#FFC94D" />
          <line
            x1="60"
            y1="46"
            x2="60"
            y2="92"
            stroke="#FFC94D"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
