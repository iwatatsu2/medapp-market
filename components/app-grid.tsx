"use client";

import { useState, useEffect } from "react";
import { AppCard } from "@/components/app-card";
import { CategoryFilter } from "@/components/category-filter";
import { SEED_APPS } from "@/lib/seed-apps";
import { createClient } from "@/lib/supabase/client";
import { getCategoryLabel } from "@/lib/category-utils";
import type { AppData } from "@/components/app-card";

// DBのthumbnail_urlがnullでも、seed側にサムネがあればそれを使う（DB制限中でも表示を守る）
const SEED_THUMB = new Map(SEED_APPS.map((a) => [a.slug, a.thumbnail_url]));

export function AppGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [apps, setApps] = useState<AppData[]>(
    SEED_APPS.filter((a) => !a.is_tool)
  );

  useEffect(() => {
    async function fetchApps() {
      const supabase = createClient();

      // DBアプリとアクセス数・いいね数・コメント数を並行取得
      const [appsRes, viewsRes, likesRes, commentsRes] = await Promise.all([
        supabase
          .from("apps")
          .select("*")
          .eq("is_published", true)
          .order("created_at", { ascending: false }),
        supabase.from("app_views").select("slug, view_count"),
        supabase.from("app_likes").select("app_slug"),
        supabase.from("app_comments").select("app_slug"),
      ]);

      if (viewsRes.error) {
        console.error("[AppGrid] app_views fetch error:", viewsRes.error);
      }

      // アクセス数マップ
      const viewMap = new Map<string, number>();
      if (viewsRes.data) {
        for (const v of viewsRes.data) {
          viewMap.set(v.slug, v.view_count);
        }
      }

      // いいね数マップ
      const likeMap = new Map<string, number>();
      for (const l of likesRes.data ?? []) {
        likeMap.set(l.app_slug, (likeMap.get(l.app_slug) ?? 0) + 1);
      }

      // コメント数マップ
      const commentMap = new Map<string, number>();
      for (const c of commentsRes.data ?? []) {
        commentMap.set(c.app_slug, (commentMap.get(c.app_slug) ?? 0) + 1);
      }

      let merged: AppData[];

      if (appsRes.data && appsRes.data.length > 0) {
        const dbApps: AppData[] = appsRes.data.map((a: Record<string, unknown>) => ({
          id: a.id as string,
          slug: a.slug as string,
          name: a.name as string,
          category: a.category as string | string[],
          price: a.price as number,
          tagline: a.tagline as string,
          description: a.description as string,
          app_url: a.app_url as string,
          demo_url: a.demo_url as string | null,
          thumbnail_url:
            (a.thumbnail_url as string | null) ??
            SEED_THUMB.get(a.slug as string) ??
            null,
          is_tool: a.is_tool as boolean | undefined,
          developer_name: "開発者",
          developer_specialty: "",
          access_count: viewMap.get(a.slug as string) ?? 0,
          like_count: likeMap.get(a.slug as string) ?? 0,
          comment_count: commentMap.get(a.slug as string) ?? 0,
        }));
        const dbSlugs = new Set(dbApps.map((a) => a.slug));
        const seedOnly = SEED_APPS.map((a) => ({
          ...a,
          access_count: viewMap.get(a.slug) ?? 0,
          like_count: likeMap.get(a.slug) ?? 0,
          comment_count: commentMap.get(a.slug) ?? 0,
        })).filter((a) => !dbSlugs.has(a.slug));
        merged = [...seedOnly, ...dbApps];
      } else {
        merged = SEED_APPS.map((a) => ({
          ...a,
          access_count: viewMap.get(a.slug) ?? 0,
          like_count: likeMap.get(a.slug) ?? 0,
          comment_count: commentMap.get(a.slug) ?? 0,
        }));
      }

      // くらしのツール行きのアプリ（子供向け等）はトップページに表示しない
      setApps(merged.filter((a) => !a.is_tool));
    }
    fetchApps();
  }, []);

  const filteredApps = selectedCategory
    ? apps.filter((app) => {
        const cats = Array.isArray(app.category) ? app.category : [app.category];
        return cats.includes(selectedCategory);
      })
    : apps;

  return (
    <>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <section id="apps" className="scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b-2 border-foreground pb-4">
            <div>
              <p className="kicker text-tomato">{selectedCategory ? "Tag" : "All Apps"}</p>
              <h2 className="mt-1 font-serif text-3xl font-extrabold tracking-tight sm:text-4xl">
                {selectedCategory ? `#${getCategoryLabel(selectedCategory)}` : "ぜんぶのアプリ"}
              </h2>
            </div>
            <div className="flex items-center gap-4 text-[13px] font-bold text-foreground/60">
              <span className="tabular-nums">{filteredApps.length} 本</span>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-foreground underline decoration-2 underline-offset-4 hover:decoration-tomato"
                >
                  すべて見る
                </button>
              )}
            </div>
          </div>

          {filteredApps.length > 0 ? (
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {filteredApps.map((app, i) => {
                const featured = i === 0 && !selectedCategory;
                return (
                  <div key={app.id} className={featured ? "sm:col-span-2" : undefined}>
                    <AppCard app={app} featured={featured} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="border border-dashed border-foreground/40 p-12 text-center">
              <p className="text-sm text-foreground/60">
                このタグのアプリはまだありません
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
