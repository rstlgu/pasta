interface PastaLogoProps {
  className?: string;
}

export function PastaLogo({ className = "w-8 h-8" }: PastaLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Singolo spaghetto ondulante */}
      <path
        d="M 10 50 Q 25 20 40 50 T 70 50 Q 85 80 90 50"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

