"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Heart, MessageCircle } from "lucide-react";
import { getCategoryLabel } from "@/lib/category-utils";

export interface AppData {
  id: string;
  slug: string;
  name: string;
  category: string | string[];
  price: number;
  tagline: string;
  description: string;
  app_url: string;
  demo_url: string | null;
  thumbnail_url?: string | null;
  screenshots?: string[];
  target_roles?: string[];
  is_tool?: boolean;
  developer_name: string;
  developer_specialty: string;
  access_count?: number;
  like_count?: number;
  comment_count?: number;
}

interface AppCardProps {
  app: AppData;
  /** 一覧の先頭など、大きく見せる号の扱い */
  featured?: boolean;
}

// サムネが無い・読めないときの「文字だけの表紙」。空白カードを出さない
const COVER_TONES = ["bg-marker", "bg-[#f3c8b6]", "bg-[#cfe0d4]", "bg-[#d9d2f0]", "bg-[#f1e3b8]"];
function TypeCover({ app }: { app: AppData }) {
  const tone = COVER_TONES[[...app.slug].reduce((n, c) => n + c.charCodeAt(0), 0) % COVER_TONES.length];
  return (
    <div className={`flex h-full flex-col justify-between p-5 ${tone}`}>
      <span className="kicker text-foreground/70">MedApp Market</span>
      <span className="font-serif text-[clamp(26px,4vw,40px)] font-extrabold leading-tight text-foreground">
        {app.name}
      </span>
      <span className="text-[13px] font-bold text-foreground/70 line-clamp-1">{app.tagline}</span>
    </div>
  );
}

export function AppCard({ app, featured = false }: AppCardProps) {
  const isFree = app.price === 0;
  const [broken, setBroken] = useState(false);
  const cats = (Array.isArray(app.category) ? app.category : [app.category]).slice(0, 2);

  return (
    <Link href={`/apps/${app.slug}`} className="group block h-full">
      <article className="flex h-full flex-col">
        <div
          className={`relative overflow-hidden rounded-md border border-foreground bg-card transition-shadow duration-500 group-hover:shadow-pop ${featured ? "aspect-[16/10] lg:aspect-[16/9]" : "aspect-[16/10]"}`}
        >
          {app.thumbnail_url && !broken ? (
            <Image
              src={app.thumbnail_url}
              alt={app.name}
              fill
              sizes={featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
              onError={() => setBroken(true)}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <TypeCover app={app} />
          )}
        </div>

        <div className="flex flex-1 flex-col pt-4">
          <div className="flex items-center gap-2">
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${isFree ? "bg-marker text-foreground" : "bg-foreground text-background"}`}
            >
              {isFree ? "無料" : `¥${app.price.toLocaleString()}`}
            </span>
            <p className="kicker truncate text-tomato">{cats.map((c) => getCategoryLabel(c)).join(" / ")}</p>
          </div>
          <h3
            className={`mt-1.5 flex items-start gap-2 font-serif font-extrabold leading-snug text-foreground ${featured ? "text-3xl sm:text-4xl" : "text-xl"}`}
          >
            <span className="group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">{app.name}</span>
            <ArrowUpRight className="mt-1 size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
          </h3>
          <p className={`mt-1.5 leading-relaxed text-foreground/70 ${featured ? "text-base" : "text-[14px]"}`}>
            {app.tagline}
          </p>

          <div className="mt-auto flex items-center gap-3 pt-3 text-[12px] font-bold tabular-nums text-foreground/55">
            {(app.access_count ?? 0) > 0 && <span>{(app.access_count ?? 0).toLocaleString()} 回ひらかれた</span>}
            {(app.like_count ?? 0) > 0 && (
              <span className="flex items-center gap-0.5">
                <Heart className="size-3 text-tomato" aria-hidden />
                {app.like_count}
              </span>
            )}
            {(app.comment_count ?? 0) > 0 && (
              <span className="flex items-center gap-0.5">
                <MessageCircle className="size-3" aria-hidden />
                {app.comment_count}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
