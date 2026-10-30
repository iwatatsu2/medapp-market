import Link from "next/link";

const COLUMNS: { title: string; links: { label: string; href?: string }[] }[] = [
  {
    title: "Apps",
    links: [
      { label: "アプリ一覧", href: "/#apps" },
      { label: "くらしのツール", href: "/tools" },
      { label: "ショップ", href: "/shop" },
      { label: "アプリ投稿（準備中）" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "ログイン", href: "/auth/login" },
      { label: "新規登録", href: "/auth/register" },
      { label: "マイページ", href: "/dashboard" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "つくった人", href: "/#editor" },
      { label: "公式サイト", href: "https://driwatatsu-hp.vercel.app" },
      { label: "利用規約", href: "/terms" },
      { label: "プライバシーポリシー", href: "/privacy" },
      { label: "特定商取引法に基づく表記", href: "/tokushoho" },
      { label: "お問い合わせ", href: "/contact" },
      { label: "ホーム画面に追加", href: "/#install" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <p className="kicker text-marker">The Doctor-Made App Magazine</p>
            <Link href="/" className="mt-3 block font-serif text-4xl font-extrabold leading-tight sm:text-5xl">
              MedApp
              <br />
              Market<span className="text-tomato">.</span>
            </Link>
            <p className="mt-4 text-[14px] leading-relaxed text-background/60">
              病院で生まれた、ちょっと気の利くアプリたち。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="font-display text-lg italic text-marker">{col.title}</h3>
                <ul className="mt-3 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label} className="text-[13px]">
                      {l.href ? (
                        l.href.startsWith("http") ? (
                          <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-background/75 hover:text-background hover:underline">
                            {l.label}
                          </a>
                        ) : (
                          <Link href={l.href} className="text-background/75 hover:text-background hover:underline">
                            {l.label}
                          </Link>
                        )
                      ) : (
                        <span className="text-background/40">{l.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-background/20 pt-6 text-[12px] leading-relaxed text-background/50">
          <p>当サイトに掲載されたアプリは医療行為の代替ではありません。医療上の判断は必ず医療専門家にご相談ください。</p>
          <p className="mt-2">&copy; 2026 MedApp Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
