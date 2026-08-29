function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

interface Props { seed: string; className?: string; }

export default function FluidTile({ seed, className }: Props) {
  const h = hashString(seed || "void");
  const hues = [258, 182, 72, 268, 195];
  const hue = hues[h % hues.length];
  const hue2 = hues[(h + 2) % hues.length];
  const x1 = 18 + (h % 42);
  const y1 = 22 + ((h >> 3) % 34);
  const x2 = 58 + ((h >> 6) % 32);
  const y2 = 62 + ((h >> 9) % 28);

  return (
    <div
      aria-hidden
      className={className}
      style={{
        background: `
          radial-gradient(ellipse 62% 58% at ${x1}% ${y1}%, hsla(${hue} 92% 62% / 0.42), transparent 68%),
          radial-gradient(ellipse 56% 62% at ${x2}% ${y2}%, hsla(${hue2} 88% 60% / 0.30), transparent 70%),
          linear-gradient(135deg, #0E1119, #141824)
        `,
      }}
    />
  );
}
