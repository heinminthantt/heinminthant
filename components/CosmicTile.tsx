function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

const PALETTES = [
  ["rgb(230 185 95 / 0.30)", "rgb(56 76 178 / 0.35)"],
  ["rgb(148 84 211 / 0.28)", "rgb(20 118 140 / 0.32)"],
  ["rgb(56 76 178 / 0.34)", "rgb(230 185 95 / 0.18)"],
  ["rgb(20 118 140 / 0.30)", "rgb(148 84 211 / 0.24)"],
];

interface CosmicTileProps {
  seed: string;
  label?: string;
  className?: string;
}

/* Deterministic nebula-gradient placeholder for entities that have no
   uploaded image yet. Decorative atmosphere, not a fake screenshot. */
export default function CosmicTile({ seed, className }: CosmicTileProps) {
  const h = hashString(seed || "void");
  const [c1, c2] = PALETTES[h % PALETTES.length];
  const x1 = 18 + (h % 40);
  const y1 = 14 + ((h >> 3) % 36);
  const x2 = 55 + ((h >> 6) % 38);

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        background: `
          radial-gradient(ellipse 70% 60% at ${x1}% ${y1}%, ${c1}, transparent 72%),
          radial-gradient(ellipse 60% 65% at ${x2}% 78%, ${c2}, transparent 74%),
          #0a0d18
        `,
      }}
    />
  );
}
