const ITEMS = ["Next.js", "TypeScript", "React", "Laravel", "Spring Boot", "PostgreSQL", "Supabase", "Tailwind CSS", "Docker", "Flutter"];
export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative z-20 overflow-hidden bg-[#111] py-3.5 text-white" aria-hidden="true">
      <div className="animate-marquee flex w-max items-center gap-6 whitespace-nowrap pr-6">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-6">
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-6 text-[15px] font-bold uppercase tracking-wide">
                {item} <span className="text-[#C6F135]">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
