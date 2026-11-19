export default function HillsScene({ className = "" }: { className?: string }) {
  const flowers: Array<[number, number]> = [
    [90, 505], [210, 545], [360, 520], [520, 565], [700, 530], [880, 560], [1040, 525], [1220, 555], [1360, 520],
    [150, 610], [430, 625], [760, 615], [980, 635], [1280, 620], [60, 665], [300, 680], [620, 675], [1120, 685], [1400, 670],
  ];
  return (
    <svg className={className} viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="hills-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#79BEE8" />
          <stop offset="55%" stopColor="#A8D8F0" />
          <stop offset="100%" stopColor="#D8F0FB" />
        </linearGradient>
      </defs>
      <rect width="1440" height="720" fill="url(#hills-sky)" />
      <circle cx="1180" cy="130" r="62" fill="#FFE98A" opacity="0.95" />
      <circle cx="1180" cy="130" r="88" fill="#FFF3B0" opacity="0.35" />
      <g fill="#ffffff">
        <ellipse cx="300" cy="130" rx="90" ry="34" />
        <ellipse cx="360" cy="112" rx="70" ry="42" />
        <ellipse cx="245" cy="112" rx="55" ry="30" />
        <ellipse cx="315" cy="148" rx="95" ry="26" />
      </g>
      <g fill="#ffffff" opacity="0.85">
        <ellipse cx="820" cy="88" rx="58" ry="20" />
        <ellipse cx="858" cy="76" rx="42" ry="24" />
      </g>
      <path d="M0 430 C240 350 420 400 720 365 C1020 330 1220 380 1440 340 L1440 720 L0 720 Z" fill="#7FB069" />
      <path d="M0 510 C220 440 520 500 820 455 C1100 415 1280 470 1440 430 L1440 720 L0 720 Z" fill="#55883C" />
      <path d="M0 600 C260 530 560 590 900 545 C1150 515 1300 560 1440 530 L1440 720 L0 720 Z" fill="#3E6B2F" />
      <path d="M0 665 C300 610 700 650 1440 600 L1440 720 L0 720 Z" fill="#335C27" opacity="0.55" />
      {flowers.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5" fill="#F2C230" />
          <circle cx={x} cy={y} r="2" fill="#FFF8D6" />
        </g>
      ))}
    </svg>
  );
}
