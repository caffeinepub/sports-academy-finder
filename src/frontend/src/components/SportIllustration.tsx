import type React from "react";
// Inline SVG sport illustrations — always loads, zero network dependency

interface SportIllustrationProps {
  sport: string;
  location?: string;
  className?: string;
}

const sportColors: Record<
  string,
  { bg: string; accent: string; secondary: string }
> = {
  Basketball: { bg: "#ff8c42", accent: "#c0392b", secondary: "#f9ca24" },
  Soccer: { bg: "#27ae60", accent: "#1e8449", secondary: "#f9ca24" },
  Tennis: { bg: "#2980b9", accent: "#1a5276", secondary: "#f39c12" },
  Swimming: { bg: "#1abc9c", accent: "#0e6655", secondary: "#3498db" },
  Volleyball: { bg: "#8e44ad", accent: "#6c3483", secondary: "#e74c3c" },
};

const locationColors: Record<string, string> = {
  Ramapuram: "#e74c3c",
  "Anna Nagar": "#2ecc71",
  Kolathur: "#3498db",
  Mylapore: "#f39c12",
  Santhome: "#9b59b6",
};

function BasketballSVG({ color }: { color: string }) {
  return (
    <svg
      role="img"
      aria-label="sport illustration"
      viewBox="0 0 400 270"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <rect width="400" height="270" fill={color} />
      <rect x="0" y="200" width="400" height="70" fill="rgba(0,0,0,0.2)" />
      {/* Court lines */}
      <rect
        x="50"
        y="60"
        width="300"
        height="180"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="3"
      />
      <circle
        cx="200"
        cy="150"
        r="50"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="3"
      />
      <line
        x1="200"
        y1="60"
        x2="200"
        y2="240"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
      />
      {/* Hoop */}
      <rect x="70" y="80" width="8" height="60" fill="rgba(255,255,255,0.7)" />
      <rect x="60" y="80" width="28" height="4" fill="rgba(255,255,255,0.7)" />
      <ellipse
        cx="88"
        cy="84"
        rx="14"
        ry="5"
        fill="none"
        stroke="#ff6b35"
        strokeWidth="3"
      />
      {/* Basketball */}
      <circle
        cx="200"
        cy="150"
        r="28"
        fill="#e86b1a"
        stroke="#333"
        strokeWidth="2"
      />
      <path
        d="M172 150 Q186 138 200 150 Q214 162 228 150"
        fill="none"
        stroke="#333"
        strokeWidth="2"
      />
      <path
        d="M200 122 Q212 136 200 150 Q188 164 200 178"
        fill="none"
        stroke="#333"
        strokeWidth="2"
      />
      {/* Players */}
      <circle cx="150" cy="130" r="12" fill="rgba(255,255,255,0.9)" />
      <rect
        x="142"
        y="142"
        width="16"
        height="30"
        rx="4"
        fill="rgba(255,255,255,0.9)"
      />
      <circle cx="260" cy="140" r="12" fill="rgba(255,220,0,0.9)" />
      <rect
        x="252"
        y="152"
        width="16"
        height="30"
        rx="4"
        fill="rgba(255,220,0,0.9)"
      />
      {/* Text */}
      <text
        x="200"
        y="255"
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontWeight="bold"
        fontFamily="Arial"
      >
        BASKETBALL
      </text>
    </svg>
  );
}

function SoccerSVG({ color }: { color: string }) {
  return (
    <svg
      role="img"
      aria-label="sport illustration"
      viewBox="0 0 400 270"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <rect width="400" height="270" fill={color} />
      {/* Field */}
      <rect
        x="30"
        y="50"
        width="340"
        height="190"
        rx="8"
        fill="rgba(255,255,255,0.15)"
        stroke="white"
        strokeWidth="2"
      />
      <circle
        cx="200"
        cy="145"
        r="40"
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
      <line x1="200" y1="50" x2="200" y2="240" stroke="white" strokeWidth="2" />
      {/* Goals */}
      <rect
        x="30"
        y="110"
        width="30"
        height="70"
        fill="none"
        stroke="white"
        strokeWidth="3"
      />
      <rect
        x="340"
        y="110"
        width="30"
        height="70"
        fill="none"
        stroke="white"
        strokeWidth="3"
      />
      {/* Soccer ball */}
      <circle
        cx="200"
        cy="145"
        r="22"
        fill="white"
        stroke="#333"
        strokeWidth="1"
      />
      <polygon points="200,125 208,132 205,142 195,142 192,132" fill="#333" />
      <polygon
        points="200,165 208,158 215,165 212,175 188,175 185,165 192,158"
        fill="#333"
      />
      {/* Players */}
      <circle cx="140" cy="130" r="11" fill="rgba(255,220,0,0.95)" />
      <rect
        x="133"
        y="141"
        width="14"
        height="28"
        rx="3"
        fill="rgba(255,220,0,0.95)"
      />
      <circle cx="270" cy="155" r="11" fill="rgba(255,255,255,0.95)" />
      <rect
        x="263"
        y="166"
        width="14"
        height="28"
        rx="3"
        fill="rgba(255,255,255,0.95)"
      />
      <text
        x="200"
        y="260"
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontWeight="bold"
        fontFamily="Arial"
      >
        SOCCER
      </text>
    </svg>
  );
}

function TennisSVG({ color }: { color: string }) {
  return (
    <svg
      role="img"
      aria-label="sport illustration"
      viewBox="0 0 400 270"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <rect width="400" height="270" fill={color} />
      {/* Court */}
      <rect
        x="40"
        y="50"
        width="320"
        height="180"
        fill="rgba(255,255,255,0.15)"
        stroke="white"
        strokeWidth="2"
      />
      <line x1="200" y1="50" x2="200" y2="230" stroke="white" strokeWidth="2" />
      <line x1="40" y1="140" x2="360" y2="140" stroke="white" strokeWidth="2" />
      {/* Net */}
      <rect
        x="40"
        y="135"
        width="320"
        height="10"
        fill="rgba(255,255,255,0.5)"
      />
      <line
        x1="200"
        y1="50"
        x2="200"
        y2="230"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1"
      />
      {/* Tennis ball */}
      <circle
        cx="280"
        cy="90"
        r="18"
        fill="#c8ff00"
        stroke="white"
        strokeWidth="1"
      />
      <path
        d="M268 84 Q280 95 292 84"
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
      <path
        d="M268 96 Q280 85 292 96"
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
      {/* Racket */}
      <ellipse
        cx="130"
        cy="105"
        rx="25"
        ry="32"
        fill="none"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="3"
      />
      <line
        x1="130"
        y1="137"
        x2="130"
        y2="175"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="5"
      />
      <line
        x1="110"
        y1="85"
        x2="150"
        y2="85"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
      />
      <line
        x1="110"
        y1="95"
        x2="150"
        y2="95"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
      />
      <line
        x1="110"
        y1="105"
        x2="150"
        y2="105"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
      />
      <line
        x1="110"
        y1="115"
        x2="150"
        y2="115"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
      />
      <line
        x1="110"
        y1="125"
        x2="150"
        y2="125"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
      />
      <line
        x1="120"
        y1="73"
        x2="120"
        y2="137"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
      />
      <line
        x1="130"
        y1="73"
        x2="130"
        y2="137"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
      />
      <line
        x1="140"
        y1="73"
        x2="140"
        y2="137"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
      />
      {/* Player */}
      <circle cx="120" cy="85" r="11" fill="rgba(255,220,0,0.95)" />
      <rect
        x="113"
        y="96"
        width="14"
        height="28"
        rx="3"
        fill="rgba(255,220,0,0.95)"
      />
      <text
        x="200"
        y="260"
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontWeight="bold"
        fontFamily="Arial"
      >
        TENNIS
      </text>
    </svg>
  );
}

function SwimmingSVG({ color }: { color: string }) {
  return (
    <svg
      role="img"
      aria-label="sport illustration"
      viewBox="0 0 400 270"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <rect width="400" height="270" fill={color} />
      {/* Pool lanes */}
      <rect x="30" y="80" width="340" height="160" rx="5" fill="#1a7ab5" />
      {/* Lane dividers */}
      <line
        x1="30"
        y1="113"
        x2="370"
        y2="113"
        stroke="#ffd700"
        strokeWidth="3"
        strokeDasharray="10,8"
      />
      <line
        x1="30"
        y1="147"
        x2="370"
        y2="147"
        stroke="#ffd700"
        strokeWidth="3"
        strokeDasharray="10,8"
      />
      <line
        x1="30"
        y1="181"
        x2="370"
        y2="181"
        stroke="#ffd700"
        strokeWidth="3"
        strokeDasharray="10,8"
      />
      {/* Swimmers */}
      <ellipse cx="200" cy="96" rx="40" ry="8" fill="rgba(255,255,255,0.4)" />
      <circle cx="160" cy="96" r="10" fill="#ffcd94" />
      <path
        d="M170 96 Q200 88 240 96"
        fill="none"
        stroke="#ffcd94"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <ellipse cx="200" cy="130" rx="40" ry="8" fill="rgba(255,255,255,0.3)" />
      <circle cx="240" cy="130" r="10" fill="#ffb3b3" />
      <path
        d="M230 130 Q200 122 160 130"
        fill="none"
        stroke="#ffb3b3"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Water ripples */}
      <path
        d="M40 165 Q80 158 120 165 Q160 172 200 165 Q240 158 280 165 Q320 172 360 165"
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="2"
      />
      <path
        d="M40 185 Q80 178 120 185 Q160 192 200 185 Q240 178 280 185 Q320 192 360 185"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="2"
      />
      <path
        d="M40 205 Q80 198 120 205 Q160 212 200 205 Q240 198 280 205 Q320 212 360 205"
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
      />
      {/* Blocks */}
      <rect
        x="30"
        y="50"
        width="30"
        height="30"
        rx="3"
        fill="rgba(255,255,255,0.7)"
      />
      <rect
        x="80"
        y="50"
        width="30"
        height="30"
        rx="3"
        fill="rgba(255,255,255,0.7)"
      />
      <rect
        x="130"
        y="50"
        width="30"
        height="30"
        rx="3"
        fill="rgba(255,255,255,0.7)"
      />
      <text
        x="200"
        y="260"
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontWeight="bold"
        fontFamily="Arial"
      >
        SWIMMING
      </text>
    </svg>
  );
}

function VolleyballSVG({ color }: { color: string }) {
  return (
    <svg
      role="img"
      aria-label="sport illustration"
      viewBox="0 0 400 270"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <rect width="400" height="270" fill={color} />
      {/* Court */}
      <rect
        x="40"
        y="80"
        width="320"
        height="150"
        fill="rgba(255,255,255,0.12)"
        stroke="white"
        strokeWidth="2"
      />
      <line x1="200" y1="80" x2="200" y2="230" stroke="white" strokeWidth="2" />
      {/* Net */}
      <rect
        x="40"
        y="148"
        width="320"
        height="8"
        fill="rgba(255,255,255,0.7)"
      />
      <line x1="200" y1="80" x2="200" y2="150" stroke="white" strokeWidth="2" />
      {/* Volleyball */}
      <circle
        cx="200"
        cy="110"
        r="22"
        fill="white"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
      />
      <path
        d="M185 98 Q200 108 215 98"
        fill="none"
        stroke="#e74c3c"
        strokeWidth="3"
      />
      <path
        d="M178 112 Q192 100 200 112 Q208 124 222 112"
        fill="none"
        stroke="#3498db"
        strokeWidth="3"
      />
      <path
        d="M185 126 Q200 116 215 126"
        fill="none"
        stroke="#f39c12"
        strokeWidth="3"
      />
      {/* Players */}
      <circle cx="130" cy="180" r="12" fill="rgba(255,220,0,0.95)" />
      <rect
        x="122"
        y="192"
        width="16"
        height="30"
        rx="4"
        fill="rgba(255,220,0,0.95)"
      />
      <line
        x1="122"
        y1="205"
        x2="108"
        y2="215"
        stroke="rgba(255,220,0,0.95)"
        strokeWidth="4"
      />
      <circle cx="280" cy="175" r="12" fill="rgba(255,255,255,0.95)" />
      <rect
        x="272"
        y="187"
        width="16"
        height="30"
        rx="4"
        fill="rgba(255,255,255,0.95)"
      />
      <line
        x1="288"
        y1="200"
        x2="302"
        y2="210"
        stroke="rgba(255,255,255,0.95)"
        strokeWidth="4"
      />
      <text
        x="200"
        y="260"
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontWeight="bold"
        fontFamily="Arial"
      >
        VOLLEYBALL
      </text>
    </svg>
  );
}

const sportSVGMap: Record<string, (color: string) => React.ReactElement> = {
  Basketball: (c) => <BasketballSVG color={c} />,
  Soccer: (c) => <SoccerSVG color={c} />,
  Tennis: (c) => <TennisSVG color={c} />,
  Swimming: (c) => <SwimmingSVG color={c} />,
  Volleyball: (c) => <VolleyballSVG color={c} />,
};

export function SportIllustration({
  sport,
  location,
  className,
}: SportIllustrationProps) {
  const colors = sportColors[sport] ?? {
    bg: "#555",
    accent: "#333",
    secondary: "#999",
  };
  const locColor = location ? locationColors[location] : null;
  const bg = locColor ?? colors.bg;

  const SvgComponent = sportSVGMap[sport];
  if (!SvgComponent) {
    return (
      <div
        className={className}
        style={{
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "white", fontWeight: "bold" }}>{sport}</span>
      </div>
    );
  }

  return (
    <div className={className} style={{ background: bg, overflow: "hidden" }}>
      {SvgComponent(bg)}
    </div>
  );
}
