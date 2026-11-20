import type { SVGProps } from "react";

/** Glowing traditional diya lamp */
export function Diya({ className = "", glow = true, ...rest }: SVGProps<SVGSVGElement> & { glow?: boolean }) {
  return (
    <svg viewBox="0 0 120 110" className={className} aria-hidden="true" {...rest}>
      {glow && (
        <radialGradient id="diyaGlow" cx="50%" cy="38%" r="55%">
          <stop offset="0%" stopColor="#ffcf5c" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#e8963c" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#e8963c" stopOpacity="0" />
        </radialGradient>
      )}
      {glow && <circle cx="60" cy="42" r="46" fill="url(#diyaGlow)" className="animate-glow-pulse" />}
      <g className="origin-[60px_46px] animate-flame">
        <path d="M60 16 C66.5 28 71 35 60 48 C49 35 53.5 28 60 16 Z" fill="#f7b733" />
        <path d="M60 26 C63.4 33 65.6 37.6 60 45 C54.4 37.6 56.6 33 60 26 Z" fill="#fde9a8" />
      </g>
      <path d="M58.5 46 H61.5 V56 H58.5 Z" fill="#7a4a1e" />
      <path
        d="M22 60 C22 60 98 60 98 60 C97 76 82 88 60 88 C38 88 23 76 22 60 Z"
        fill="#8b2b1c"
      />
      <path d="M22 60 C22 60 98 60 98 60 L92 66 H28 Z" fill="#b8452a" />
      <path d="M30 72 Q60 84 90 72" stroke="#e2c87e" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="60" rx="38" ry="4" fill="#d98145" />
      <path d="M46 90 h28 l4 8 h-36 Z" fill="#6d2013" />
    </svg>
  );
}

/** Ornamental divider with lotus-diamond centre */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 28" className={className} aria-hidden="true">
      <g stroke="#c9a227" fill="none" strokeWidth="1.1" opacity="0.9">
        <path d="M0 14 H118" strokeLinecap="round" />
        <path d="M202 14 H320" strokeLinecap="round" />
        <path d="M112 14 l-8 -4 v8 Z" fill="#c9a227" stroke="none" />
        <path d="M208 14 l8 -4 v8 Z" fill="#c9a227" stroke="none" />
        <path d="M160 3 C166 9 166 19 160 25 C154 19 154 9 160 3 Z" />
        <path d="M138 14 C144 8 154 8 160 14 C154 20 144 20 138 14 Z" />
        <path d="M182 14 C176 8 166 8 160 14 C166 20 176 20 182 14 Z" />
        <circle cx="160" cy="14" r="3" fill="#c9a227" stroke="none" />
        <circle cx="126" cy="14" r="1.6" fill="#c9a227" stroke="none" />
        <circle cx="194" cy="14" r="1.6" fill="#c9a227" stroke="none" />
      </g>
    </svg>
  );
}

/** Paisley corner flourish */
export function Corner({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <g fill="none" stroke="#c9a227" strokeWidth="1.4" opacity="0.75" strokeLinecap="round">
        <path d="M8 8 H74 C74 32 32 74 8 74 Z" />
        <path d="M20 20 H60 C60 38 38 60 20 60 Z" opacity="0.7" />
        <path d="M34 34 C46 34 46 46 34 46 C34 40 34 36 34 34 Z" fill="#c9a227" stroke="none" opacity="0.85" />
        <circle cx="84" cy="12" r="2.4" fill="#c9a227" stroke="none" />
        <circle cx="12" cy="84" r="2.4" fill="#c9a227" stroke="none" />
        <circle cx="96" cy="24" r="1.6" fill="#c9a227" stroke="none" />
        <circle cx="24" cy="96" r="1.6" fill="#c9a227" stroke="none" />
      </g>
    </svg>
  );
}

/** 4-point sparkle */
export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 1 C13 7 17 11 23 12 C17 13 13 17 12 23 C11 17 7 13 1 12 C7 11 11 7 12 1 Z" fill="currentColor" />
    </svg>
  );
}

/** Traditional Ganesha line motif */
export function Ganesha({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 200" className={className} aria-hidden="true">
      <g stroke="#d4af5f" strokeLinecap="round" strokeLinejoin="round">
        <path d="M42 164c18-15 78-15 96 0l-10 24H52Z" fill="#9d2921" strokeWidth="2" />
        <path d="M58 150c10-30 54-30 64 0l-8 15H66Z" fill="#c96a1e" strokeWidth="2" />
        <path d="M50 91c-24 7-31 29-18 43 9 10 24 8 31-2" fill="#e5a43f" strokeWidth="3" />
        <path d="M130 91c24 7 31 29 18 43-9 10-24 8-31-2" fill="#e5a43f" strokeWidth="3" />
        <path d="M58 78c0-28 14-46 32-46s32 18 32 46c0 33-13 55-32 55S58 111 58 78Z" fill="#e5a43f" strokeWidth="3" />
        <path d="M69 70c-15-5-22 4-19 15 4 14 19 20 31 11M111 70c15-5 22 4 19 15-4 14-19 20-31 11" fill="#f2b85b" strokeWidth="3" />
        <path d="M78 88c1 34 12 47 31 48 16 1 26-10 17-23-6-9-19-4-17 7" fill="none" stroke="#d4af5f" strokeWidth="8" />
        <path d="M78 88c1 34 12 47 31 48" fill="none" stroke="#7d2117" strokeWidth="2.5" />
        <path d="M72 62c5-3 11-3 16 0M92 62c5-3 11-3 16 0" fill="none" stroke="#7d2117" strokeWidth="2.5" />
        <path d="M90 49c-2 8 2 13 8 14" fill="none" stroke="#9d2921" strokeWidth="2" />
        <path d="M54 33c18-22 54-22 72 0l-8 16H62Z" fill="#a62d22" strokeWidth="3" />
        <path d="M64 29c16-10 36-10 52 0l-6 12H70Z" fill="#d4af5f" strokeWidth="2" />
        <circle cx="90" cy="18" r="7" fill="#d4af5f" strokeWidth="2" />
        <path d="M48 178c-14-10-25-8-34 4 14 12 27 12 40 4M132 178c14-10 25-8 34 4-14 12-27 12-40 4" fill="#e8963c" strokeWidth="2" />
        <circle cx="90" cy="56" r="4" fill="#c9a227" stroke="none" />
      </g>
    </svg>
  );
}

/** Small marigold flower */
export function Marigold({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g>
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse
            key={i}
            cx="24"
            cy="11"
            rx="4.4"
            ry="9.5"
            fill={i % 2 ? "#e8963c" : "#f2a944"}
            transform={`rotate(${i * 30} 24 24)`}
            opacity="0.95"
          />
        ))}
        <circle cx="24" cy="24" r="6.4" fill="#c96a1e" />
        <circle cx="24" cy="24" r="3" fill="#8f4a12" />
      </g>
    </svg>
  );
}
