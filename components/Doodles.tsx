export function Squiggle({ className = "", color = "#E53935" }: { className?: string; color?: string }) {
  return (<svg className={className} viewBox="0 0 120 18" fill="none" aria-hidden="true"><path d="M2 10 C14 2 24 18 36 10 C48 2 58 18 70 10 C82 2 92 18 104 10 C110 6 114 8 118 9" stroke={color} strokeWidth="3.5" strokeLinecap="round" /></svg>);
}
export function DoodleStar({ className = "", color = "#FF9F43" }: { className?: string; color?: string }) {
  return (<svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M20 3 L24 15 L37 16 L27 24 L30 37 L20 29 L10 37 L13 24 L3 16 L16 15 Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" fill="none" /></svg>);
}
export function CloudOutline({ className = "", color = "#6B93A8" }: { className?: string; color?: string }) {
  return (<svg className={className} viewBox="0 0 80 44" fill="none" aria-hidden="true"><path d="M14 36 a10 10 0 1 1 2-19 a14 14 0 0 1 26-4 a11 11 0 0 1 18 7 a9 9 0 0 1-2 16 Z" stroke={color} strokeWidth="2.5" strokeLinecap="round" /></svg>);
}
export function DoodleArrow({ className = "", color = "#111111" }: { className?: string; color?: string }) {
  return (<svg className={className} viewBox="0 0 70 50" fill="none" aria-hidden="true"><path d="M6 6 C30 4 58 14 56 36 M56 36 L46 28 M56 36 L64 26" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>);
}
export function Pushpin({ className = "" }: { className?: string }) {
  return (<span className={`pointer-events-none absolute h-4 w-4 rounded-full bg-[#E53935] shadow-[inset_-2px_-2px_3px_rgba(0,0,0,0.25),0_2px_4px_rgba(0,0,0,0.25)] ${className}`} aria-hidden="true"><span className="absolute left-[3px] top-[3px] h-1.5 w-1.5 rounded-full bg-white/70" /></span>);
}
export function FoldedCorner({ className = "" }: { className?: string }) {
  return (<span className={`pointer-events-none absolute right-0 top-0 h-7 w-7 ${className}`} aria-hidden="true" style={{ background: "#C6F135", clipPath: "polygon(100% 0, 0 0, 100% 100%)", borderTopRightRadius: "24px" }} />);
}
export function SectionPill({ children, rotate = "-rotate-2", bg = "bg-[#BFE3F5]" }: { children: React.ReactNode; rotate?: string; bg?: string }) {
  return (<span className={`inline-flex items-center gap-1.5 rounded-full ${bg} px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-[#111] shadow-sm ${rotate}`}>✦ {children}</span>);
}
export const headingCls = "text-[clamp(2.2rem,5.5vw,4.2rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.03em] text-[#111]";
