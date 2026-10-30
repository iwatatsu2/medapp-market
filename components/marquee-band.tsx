import { SEED_APPS } from "@/lib/seed-apps";

// 墨のティッカー帯。アプリ名を雑誌の見出しのように流す（装飾なので読み上げ対象外）
export function MarqueeBand() {
  const names = SEED_APPS.map((a) => a.name);
  const row = [...names, ...names];

  return (
    <div aria-hidden className="overflow-hidden border-y border-foreground bg-foreground py-3.5 text-background">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((name, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className={i % 2 ? "font-serif text-lg font-extrabold" : "font-display text-xl italic"}>
              {name}
            </span>
            <span className="text-marker">✳︎</span>
          </span>
        ))}
      </div>
    </div>
  );
}
