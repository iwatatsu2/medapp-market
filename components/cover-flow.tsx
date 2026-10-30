"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SEED_APPS } from "@/lib/seed-apps";
import { createClient } from "@/lib/supabase/client";
import type { AppData } from "@/components/app-card";

export function CoverFlow() {
  const [apps, setApps] = useState<(AppData & { accessCount: number })[]>(
    SEED_APPS.filter((a) => !a.is_tool)
      .slice(0, 3)
      .map((a) => ({ ...a, accessCount: a.access_count ?? 0 }))
  );

  // Supabaseからアプリ情報＋アクセス数を取得し、アクセス数順にソート
  useEffect(() => {
    async function fetchApps() {
      try {
        const supabase = createClient();
        const [appsRes, viewsRes] = await Promise.all([
          supabase.from("apps").select("*").eq("is_published", true),
          supabase.from("app_views").select("slug, view_count"),
        ]);

        // アクセス数マップ
        const viewMap = new Map<string, number>();
        if (viewsRes.data) {
          for (const v of viewsRes.data) {
            viewMap.set(v.slug, v.view_count);
          }
        }

        // DB + SEEDをマージ
        let allApps: (AppData & { accessCount: number })[];
        if (appsRes.data && appsRes.data.length > 0) {
          const dbMap = new Map<string, Record<string, unknown>>();
          for (const a of appsRes.data) {
            dbMap.set(a.slug as string, a);
          }
          const dbSlugs = new Set(appsRes.data.map((a) => a.slug as string));

          const dbApps = appsRes.data.map((a) => ({
            id: a.id as string,
            slug: a.slug as string,
            name: a.name as string,
            category: a.category as string | string[],
            price: a.price as number,
            tagline: a.tagline as string,
            description: a.description as string,
            app_url: a.app_url as string,
            demo_url: a.demo_url as string | null,
            thumbnail_url: a.thumbnail_url as string | null,
            is_tool: a.is_tool as boolean | undefined,
            developer_name: "開発者",
            developer_specialty: "",
            access_count: viewMap.get(a.slug as string) ?? 0,
            accessCount: viewMap.get(a.slug as string) ?? 0,
          }));

          const seedOnly = SEED_APPS
            .filter((a) => !dbSlugs.has(a.slug))
            .map((a) => ({
              ...a,
              accessCount: viewMap.get(a.slug) ?? 0,
              access_count: viewMap.get(a.slug) ?? 0,
            }));

          allApps = [...dbApps, ...seedOnly];
        } else {
          allApps = SEED_APPS.map((a) => ({
            ...a,
            accessCount: viewMap.get(a.slug) ?? 0,
            access_count: viewMap.get(a.slug) ?? 0,
          }));
        }

        // くらしのツール行きのアプリはランキングから除外
        allApps = allApps.filter((a) => !a.is_tool);
        // アクセス数降順でソートし、上位3件を表示
        allApps.sort((a, b) => b.accessCount - a.accessCount);
        setApps(allApps.slice(0, 3));
      } catch {
        // fallback to seed data
      }
    }
    fetchApps();
  }, []);

  return (
    <section className="bg-paper-2 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b-2 border-foreground pb-4">
          <div>
            <p className="kicker text-tomato">Ranking</p>
            <h2 className="mt-1 font-serif text-3xl font-extrabold tracking-tight sm:text-4xl">
              いま<span className="marker">人気</span>のアプリ
            </h2>
          </div>
          <p className="text-[13px] font-bold text-foreground/60">アクセス数の多い順</p>
        </div>

        <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
          {apps.map((app, index) => (
            <li key={app.id}>
              <Link
                href={app.app_url !== "#" ? `/apps/${app.slug}` : "#"}
                className="group block"
              >
                <div className="flex items-end gap-3">
                  <span className="font-display text-[72px] font-semibold italic leading-[0.8] text-foreground sm:text-[88px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {app.accessCount > 0 && (
                    <span className="mb-1 flex items-center gap-1.5 text-[13px] font-bold tabular-nums text-foreground/70">
                      <span className="inline-block size-1.5 rounded-full bg-tomato" />
                      {app.accessCount.toLocaleString()} 回ひらかれた
                    </span>
                  )}
                </div>
                <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-md border border-foreground bg-card transition-shadow duration-500 group-hover:shadow-pop">
                  {app.thumbnail_url ? (
                    <Image
                      src={app.thumbnail_url}
                      alt={app.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="grid h-full place-items-center bg-marker">
                      <span className="font-serif text-3xl font-extrabold">{app.name}</span>
                    </div>
                  )}
                </div>
                <h3 className="mt-4 font-serif text-2xl font-extrabold group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
                  {app.name}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-foreground/70">{app.tagline}</p>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
