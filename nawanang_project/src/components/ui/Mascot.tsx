interface MascotProps {
  size?: number;
  className?: string;
}

export function Mascot({ size = 64, className }: MascotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Body */}
      <ellipse cx="32" cy="38" rx="18" ry="16" fill="var(--brand-100)" />
      {/* Head */}
      <circle cx="32" cy="22" r="14" fill="var(--brand-100)" />
      {/* Eyes */}
      <circle cx="27" cy="20" r="2.5" fill="var(--brand-500)" />
      <circle cx="37" cy="20" r="2.5" fill="var(--brand-500)" />
      {/* Smile */}
      <path
        d="M27 26 Q32 30 37 26"
        stroke="var(--brand-500)"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arms */}
      <path
        d="M14 36 Q10 32 12 28"
        stroke="var(--brand-100)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M50 36 Q54 32 52 28"
        stroke="var(--brand-100)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Shine */}
      <circle cx="29" cy="18" r="1.2" fill="white" opacity="0.8" />
    </svg>
  );
}
