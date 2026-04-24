"use client";

import { useState, useEffect } from "react";
import { AppCard } from "@/components/app-card";
import { CategoryFilter } from "@/components/category-filter";
import { SEED_APPS } from "@/lib/seed-apps";
import { createClient } from "@/lib/supabase/client";
import { getCategoryLabel } from "@/lib/category-utils";
import type { AppData } from "@/components/app-card";

export function AppGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [apps, setApps] = useState<AppData[]>(SEED_APPS);

  useEffect(() => {
    async function fetchApps() {
      const supabase = createClient();

      // DBアプリとアクセス数を並行取得
      const [appsRes, viewsRes] = await Promise.all([
        supabase
          .from("apps")
          .select("*")
          .eq("is_published", true)
          .order("created_at", { ascending: false }),
        supabase.from("app_views").select("slug, view_count"),
      ]);

      // アクセス数マップ
      const viewMap = new Map<string, number>();
      if (viewsRes.data) {
        for (const v of viewsRes.data) {
          viewMap.set(v.slug, v.view_count);
        }
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
          thumbnail_url: a.thumbnail_url as string | null,
          developer_name: "開発者",
          developer_specialty: "",
          access_count: viewMap.get(a.slug as string) ?? 0,
        }));
        const dbSlugs = new Set(dbApps.map((a) => a.slug));
        const seedOnly = SEED_APPS.map((a) => ({
          ...a,
          access_count: viewMap.get(a.slug) ?? 0,
        })).filter((a) => !dbSlugs.has(a.slug));
        merged = [...dbApps, ...seedOnly];
      } else {
        merged = SEED_APPS.map((a) => ({
          ...a,
          access_count: viewMap.get(a.slug) ?? 0,
        }));
      }

      setApps(merged);
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

      <section id="apps" className="scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-6 flex items-baseline gap-3">
            <h2 className="text-lg font-bold text-foreground">
              {selectedCategory ? getCategoryLabel(selectedCategory) : "新着のアプリ"}
            </h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-sm text-primary hover:underline"
              >
                すべて見る
              </button>
            )}
          </div>

          {filteredApps.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredApps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-white p-12 text-center">
              <p className="text-sm text-muted-foreground">
                該当するアプリが見つかりませんでした
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
