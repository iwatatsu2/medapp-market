import Image from "next/image";
import { Globe, Award, GraduationCap, Stethoscope } from "lucide-react";

export function AboutSection() {
  return (
    <section className="border-t border-border bg-slate-50 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
          運営者について
        </h2>
        <div className="overflow-hidden rounded-lg border border-border bg-white p-6 sm:p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="shrink-0">
              <Image
                src="/dr-iwatatsu.png"
                alt="Dr. いわたつ"
                width={120}
                height={120}
                className="rounded-full"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-foreground">
                Dr. いわたつ
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                医学博士 / 糖尿病専門医・指導医 / 内分泌専門医
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                臨床現場で「こんなツールがあったら便利なのに」と感じた経験から、医療者向けWebアプリの開発を始めました。
                糖尿病・内分泌領域を中心に、研修医や病棟担当医がすぐに使える実践的なツールを提供しています。
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground sm:justify-start">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-3 py-1">
                  <GraduationCap className="size-3.5" />
                  和歌山県立医科大学卒
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-3 py-1">
                  <GraduationCap className="size-3.5" />
                  医学博士
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-3 py-1">
                  <Stethoscope className="size-3.5" />
                  内科認定医
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-3 py-1">
                  <Stethoscope className="size-3.5" />
                  糖尿病専門医・指導医
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-3 py-1">
                  <Stethoscope className="size-3.5" />
                  内分泌専門医
                </span>
              </div>

              <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground sm:justify-start">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1">
                  <Award className="size-3.5" />
                  オルガネラ・ゾーン若手の会 優秀発表賞
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1">
                  <Award className="size-3.5" />
                  看護師が選ぶベストレジデント賞
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1">
                  <Award className="size-3.5" />
                  研修医が選ぶベストチューター賞
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1">
                  <Award className="size-3.5" />
                  Medical Tribune 掲載
                </span>
              </div>

              <div className="mt-3 text-xs text-muted-foreground">
                <span className="font-medium">所属学会：</span>日本内科学会 / 日本糖尿病学会 / 日本内分泌学会 / 日本糖尿病合併症学会 / 日本体質医学会
              </div>

              <div className="mt-4 flex justify-center gap-4 sm:justify-start">
                <a
                  href="https://www.instagram.com/dr.iwatatsu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  @dr.iwatatsu
                </a>
                <a
                  href="https://driwatatsu.readdy.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Globe className="size-4" />
                  公式サイト
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
