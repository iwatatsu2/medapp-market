"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { SEED_APPS } from "@/lib/seed-apps";
import { createClient } from "@/lib/supabase/client";
import type { AppData } from "@/components/app-card";

const RANK_STYLES = [
  { bg: "from-yellow-400 to-amber-500", text: "text-yellow-900", label: "1" },
  { bg: "from-slate-300 to-slate-400", text: "text-slate-700", label: "2" },
  { bg: "from-amber-600 to-amber-700", text: "text-amber-100", label: "3" },
];

export function CoverFlow() {
  const [apps, setApps] = useState<(AppData & { accessCount: number })[]>(
    SEED_APPS.slice(0, 3).map((a) => ({ ...a, accessCount: a.access_count ?? 0 }))
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
    <section className="py-12 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-white mb-2 flex items-center justify-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          人気アプリランキング
        </h2>
        <p className="text-center text-white/40 text-sm mb-8">アクセス数順</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {apps.map((app, index) => {
            const rank = RANK_STYLES[index];
            return (
              <Link
                key={app.id}
                href={app.app_url !== "#" ? `/apps/${app.slug}` : "#"}
                className="group block"
              >
                <div className="relative">
                  {/* Rank badge */}
                  <div
                    className={`absolute -top-3 -left-3 z-10 w-12 h-12 rounded-full bg-gradient-to-br ${rank.bg} flex items-center justify-center shadow-lg`}
                  >
                    <span className={`font-black text-2xl ${rank.text}`}>
                      {rank.label}
                    </span>
                  </div>

                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10 group-hover:shadow-2xl transition-shadow">
                    {app.thumbnail_url ? (
                      <Image
                        src={app.thumbnail_url}
                        alt={app.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-indigo-600 to-purple-700">
                        <span className="text-3xl font-bold text-white/80">
                          {app.name}
                        </span>
                        <span className="text-white/50 text-sm mt-1">
                          {app.tagline}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* App info */}
                <div className="mt-3 text-center">
                  <p className="text-white font-bold text-lg">{app.name}</p>
                  <p className="text-white/50 text-xs mt-0.5">{app.tagline}</p>
                  <p className="text-white/70 text-sm mt-2 flex items-center justify-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
                    {app.accessCount.toLocaleString()} アクセス
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
