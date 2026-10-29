"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";

// 記事メディア（m3.com など）から来た医師を、トップで迷わせずに症例トレーニングへ案内する帯。
// 判定は参照元のみ（セッション中は維持）。計測は iwt.track("referrer_welcome_*")。
const SOURCES: { match: RegExp; key: string; label: string }[] = [
  { match: /(^|\.)m3\.com$/, key: "m3", label: "m3.comの記事" },
];
const CASE_URL =
  "https://dm-compass-training.vercel.app/case/kenshin-hba1c-87?utm_source=medapp&utm_medium=referral&utm_campaign=welcome-";

type Iwt = { track?: (name: string, props?: Record<string, string>) => void };

function readKey(): string | null {
  let key: string | null = null;
  try {
    key = sessionStorage.getItem("medapp:welcome");
  } catch {}
  if (!key && document.referrer) {
    try {
      const host = new URL(document.referrer).hostname;
      key = SOURCES.find((s) => s.match.test(host))?.key ?? null;
      if (key) sessionStorage.setItem("medapp:welcome", key);
    } catch {}
  }
  return key;
}
const noop = () => () => {};

export function ReferrerWelcome() {
  const key = useSyncExternalStore(noop, readKey, () => null);
  const src = SOURCES.find((s) => s.key === key) ?? null;

  useEffect(() => {
    if (src) (window as unknown as { iwt?: Iwt }).iwt?.track?.("referrer_welcome_view", { src: src.key });
  }, [src]);

  if (!src) return null;
  const click = (to: string) =>
    (window as unknown as { iwt?: Iwt }).iwt?.track?.("referrer_welcome_click", { src: src.key, to });

  return (
    <section className="border-b border-white/10 bg-[oklch(0.2_0.03_285)] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-[15px] leading-relaxed">
          {src.label}からお越しの先生へ。
          <br className="sm:hidden" />
          まずは5分、外来の症例を1問どうぞ（無料）。
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <a
            href={CASE_URL + src.key}
            onClick={() => click("case")}
            className="rounded-full bg-white px-5 py-2 text-[15px] font-bold text-[oklch(0.23_0.03_285)]"
          >
            HbA1c 8.7%の症例を解く
          </a>
          <Link
            href="/for/doctors"
            onClick={() => click("doctors")}
            className="rounded-full border border-white/30 px-5 py-2 text-[15px] text-white"
          >
            医師向けのツール一覧
          </Link>
        </div>
      </div>
    </section>
  );
}
