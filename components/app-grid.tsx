"use client";

import { useState } from "react";
import { AppCard } from "@/components/app-card";
import { CategoryFilter } from "@/components/category-filter";
import { SEED_APPS } from "@/lib/seed-apps";

export function AppGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredApps = selectedCategory
    ? SEED_APPS.filter(
        (app) =>
          app.category === selectedCategory ||
          app.category.includes(selectedCategory)
      )
    : SEED_APPS;

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
              {selectedCategory ? selectedCategory : "新着のアプリ"}
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
