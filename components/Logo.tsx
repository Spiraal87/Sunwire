export default function Logo() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoCore" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F2C870" />
          <stop offset="100%" stopColor="#D38A34" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10.5" stroke="rgba(230,168,75,0.35)" strokeWidth="1" fill="none" />
      <circle cx="12" cy="12" r="7" stroke="rgba(230,168,75,0.55)" strokeWidth="1" fill="none" />
      <circle cx="12" cy="12" r="3" fill="url(#logoCore)" />
    </svg>
  );
}
