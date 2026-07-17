export function KrakenLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" rx="10" fill="#7132f5" />
      <path
        d="M10 28C10 28 12 20 16 18C18 17 19 19 18 21C17 23 14 24 13 26C12 28 13 30 15 30C17 30 20 28 22 25C24 22 25 18 28 16C31 14 33 15 32 18C31 21 28 24 26 26C24 28 22 29 22 29"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="13" r="2" fill="white" />
      <circle cx="25" cy="12" r="2" fill="white" />
      <circle cx="17" cy="13" r="0.8" fill="#7132f5" />
      <circle cx="25" cy="12" r="0.8" fill="#7132f5" />
    </svg>
  )
}
