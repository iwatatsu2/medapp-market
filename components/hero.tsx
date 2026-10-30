import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ROLES } from "@/lib/types";
import { SEED_APPS } from "@/lib/seed-apps";

const APP_COUNT = SEED_APPS.length;

// 表紙のコラージュ（一般の人が見て楽しい3本）
const COVER = ["glucose-rush", "carb-master", "aruita-map"]
  .map((slug) => SEED_APPS.find((a) => a.slug === slug))
  .filter((a): a is (typeof SEED_APPS)[number] => !!a?.thumbnail_url);

// 回転スタンプ（円周に沿う文字）
function Stamp() {
  return (
    <div className="pointer-events-none absolute -left-1 -top-6 z-20 size-24 sm:-left-10 sm:-top-8 sm:size-32">
      <svg viewBox="0 0 100 100" className="animate-spin-slow size-full">
        <defs>
          <path id="stamp-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <circle cx="50" cy="50" r="49" fill="var(--marker)" />
        <text fontSize="9.6" fontWeight="700" letterSpacing="1.6" fill="#161412">
          <textPath href="#stamp-circle">DOCTOR MADE ✳︎ 専門医がつくった ✳︎</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center font-display text-2xl italic text-foreground">
        Dr.
      </span>
    </div>
  );
}

export function Hero() {
  const [main, sub1, sub2] = COVER;

  return (
    <section className="paper-grain relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 号数の帯 */}
        <div className="kicker flex items-center justify-between gap-4 border-b border-foreground/80 py-2.5 text-foreground/80">
          <span>
            Issue <span className="font-display text-[13px] normal-case italic tracking-normal">No.{APP_COUNT}</span>
          </span>
          <span className="hidden sm:block">病院で生まれた、暮らしのアプリ</span>
          <span>Free / No Install</span>
        </div>

        <div className="grid items-center gap-12 py-10 sm:py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:py-20">
          {/* 見出し */}
          <div className="animate-rise">
            <p className="text-sm font-bold text-tomato">現役の糖尿病専門医が、ひとりでつくっています。</p>
            <h1 className="mt-4 font-serif text-[40px] font-extrabold leading-[1.18] tracking-tight text-foreground sm:text-6xl lg:text-[68px]">
              <span className="whitespace-nowrap">病院で生まれた、</span>
              <br />
              <span className="marker whitespace-nowrap">ちょっと気の利く</span>
              <br />
              <span className="whitespace-nowrap">アプリたち。</span>
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-foreground/75 sm:text-base">
              血糖や食事のこと、子どもの1型糖尿病、病棟の仕事まで。
              ダウンロードはいりません。タップしたらすぐ使えます。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="#apps"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-[15px] font-bold text-background transition-colors hover:bg-tomato"
              >
                アプリを見てみる
                <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href="#editor"
                className="text-[15px] font-bold text-foreground underline decoration-2 underline-offset-[6px] hover:decoration-tomato"
              >
                つくった人のこと
              </a>
            </div>
          </div>

          {/* 表紙コラージュ */}
          {main && (
            <div className="relative mx-auto w-full max-w-[560px] pb-10 pl-4 pt-6 sm:pl-8">
              <Stamp />
              <Link
                href={`/apps/${main.slug}`}
                className="group relative z-10 block overflow-hidden rounded-md border border-foreground bg-card shadow-pop"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={main.thumbnail_url!}
                    alt={main.name}
                    fill
                    loading="eager"
                    sizes="(max-width: 1024px) 92vw, 560px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex items-center justify-between border-t border-foreground px-4 py-2.5">
                  <span className="kicker text-tomato">今号の表紙</span>
                  <span className="font-serif text-[15px] font-extrabold">{main.name}</span>
                </div>
              </Link>
              {sub1 && (
                <Link
                  href={`/apps/${sub1.slug}`}
                  className="absolute -right-2 -top-2 z-20 w-[38%] rotate-[5deg] overflow-hidden rounded-sm border border-foreground bg-card p-1.5 shadow-pop transition-transform duration-500 hover:rotate-0 sm:-right-6"
                >
                  <div className="relative aspect-[16/10]">
                    <Image src={sub1.thumbnail_url!} alt={sub1.name} fill loading="eager" sizes="220px" className="object-cover" />
                  </div>
                </Link>
              )}
              {sub2 && (
                <Link
                  href={`/apps/${sub2.slug}`}
                  className="absolute -bottom-1 right-6 z-20 w-[42%] -rotate-[4deg] overflow-hidden rounded-sm border border-foreground bg-card p-1.5 shadow-pop transition-transform duration-500 hover:rotate-0"
                >
                  <div className="relative aspect-[16/10]">
                    <Image src={sub2.thumbnail_url!} alt={sub2.name} fill loading="eager" sizes="240px" className="object-cover" />
                  </div>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* 数字 */}
        <dl className="grid grid-cols-2 border-t-2 border-foreground sm:grid-cols-4">
          {[
            [String(APP_COUNT), "本のアプリ"],
            ["0", "円から使える"],
            ["0", "回のダウンロード"],
            ["1", "人の専門医がつくる"],
          ].map(([n, label], i) => (
            <div
              key={label}
              className={`py-4 ${i % 2 === 1 ? "border-l border-foreground/30 pl-4" : "pr-4"} ${i >= 2 ? "border-t border-foreground/30 sm:border-t-0" : ""} ${i === 2 ? "sm:border-l sm:pl-4" : ""}`}
            >
              <dt className="sr-only">{label}</dt>
              <dd className="flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-semibold leading-none sm:text-5xl">{n}</span>
                <span className="text-[13px] font-bold text-foreground/70">{label}</span>
              </dd>
            </div>
          ))}
        </dl>

        {/* 目次 */}
        <nav aria-label="だれ向けで探す" className="border-t-2 border-foreground pb-14 pt-6 sm:pb-20">
          <p className="kicker mb-3 text-foreground/60">Contents ─ だれのためのアプリ？</p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-10">
            {[
              ...Object.entries(ROLES).map(([key, role]) => ({ href: `#for-${key}`, label: `${role.label.replace(/の方$/, "")}のかたへ` })),
              { href: "/tools", label: "くらしのツール" },
            ].map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group flex items-baseline gap-4 border-b border-foreground/20 py-3.5 transition-colors hover:border-foreground"
                >
                  <span className="font-display w-7 text-lg italic text-tomato">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-lg font-extrabold">{item.label}</span>
                  <ArrowUpRight className="ml-auto size-4 self-center transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
