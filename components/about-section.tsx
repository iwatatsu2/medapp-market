import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const CREDENTIALS = [
  "医学博士",
  "糖尿病専門医・指導医",
  "内分泌専門医・指導医",
  "内科認定医",
  "和歌山県立医科大学卒",
];

const AWARDS = [
  "看護師が選ぶベストレジデント賞",
  "研修医が選ぶベストチューター賞",
  "オルガネラ・ゾーン若手の会 優秀発表賞",
  "Medical Tribune 掲載",
];

const LINKS = [
  { label: "公式サイト", href: "https://driwatatsu-hp.vercel.app" },
  { label: "Instagram", href: "https://www.instagram.com/dr.iwatatsu/" },
  { label: "X", href: "https://x.com/KenKyu1019799" },
  { label: "note", href: "https://note.com/dr_iwatatsu" },
  { label: "グッズ", href: "https://suzuri.jp/Dr_Iwatatsu" },
];

export function AboutSection() {
  return (
    <section id="editor" className="scroll-mt-20 border-t-2 border-foreground bg-paper-2 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[280px_1fr] md:gap-14 lg:px-8">
        <div className="relative mx-auto w-full max-w-[280px] self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-foreground bg-marker">
            <Image
              src="/dr-iwatatsu.png"
              alt="Dr.いわたつ"
              fill
              sizes="280px"
              className="object-contain object-bottom"
            />
          </div>
          <span className="absolute -bottom-4 -right-3 rotate-[-6deg] rounded-full bg-foreground px-4 py-2 font-display text-lg italic text-background">
            Editor
          </span>
        </div>

        <div>
          <p className="kicker text-tomato">From the Editor</p>
          <h2 className="mt-2 font-serif text-3xl font-extrabold leading-snug tracking-tight sm:text-4xl">
            「こんなのがあったらいいのに」を、
            <br className="hidden sm:block" />
            <span className="marker">自分でつくっています。</span>
          </h2>
          <p className="mt-6 max-w-2xl text-[15px] leading-loose text-foreground/80 sm:text-base">
            はじめまして、糖尿病・内分泌の専門医のDr.いわたつです。外来や病棟で、患者さんやスタッフが困っている場面に何度も出会ってきました。
            その「困った」をひとつずつアプリにして、ここに並べています。むずかしい説明より、さわって分かることを大事にしています。
          </p>

          <div className="mt-8 grid gap-6 border-t border-foreground/30 pt-6 sm:grid-cols-2">
            <div>
              <p className="kicker mb-2 text-foreground/55">Profile</p>
              <p className="text-[14px] leading-relaxed">{CREDENTIALS.join(" / ")}</p>
            </div>
            <div>
              <p className="kicker mb-2 text-foreground/55">Awards</p>
              <p className="text-[14px] leading-relaxed">{AWARDS.join(" / ")}</p>
            </div>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 rounded-full border border-foreground px-4 py-2 text-[14px] font-bold transition-colors hover:bg-foreground hover:text-background ${l.label === "公式サイト" ? "bg-foreground text-background hover:bg-tomato hover:border-tomato" : ""}`}
                >
                  {l.label}
                  <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
