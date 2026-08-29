export default function AdminLoading() {
  return (
    <div aria-busy="true" aria-label="Loading section" className="flex flex-col gap-10">
      <div>
        <div className="h-7 w-52 animate-pulse rounded-lg bg-ink/[0.06]" />
        <div className="mt-3 h-4 w-72 animate-pulse rounded bg-ink/[0.04]" />
      </div>

      {[0, 1, 2].map((i) => (
        <section
          key={i}
          className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] p-6"
          style={{ opacity: 1 - i * 0.22 }}
        >
          <div className="h-5 w-44 animate-pulse rounded bg-ink/[0.06]" />
          <div className="h-11 w-full animate-pulse rounded-[10px] bg-ink/[0.04]" />
          <div className="h-11 w-2/3 animate-pulse rounded-[10px] bg-ink/[0.04]" />
          <div className="flex gap-3">
            <div className="h-9 w-24 animate-pulse rounded-[10px] bg-accent/15" />
            <div className="h-9 w-28 animate-pulse rounded-[10px] bg-ink/[0.05]" />
          </div>
        </section>
      ))}
    </div>
  );
}
