"use client";

import { useState } from "react";
import { AppCard } from "@/components/app-card";
import { CategoryFilter } from "@/components/category-filter";
import { SEED_APPS } from "@/lib/seed-apps";

export function AppGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredApps = selectedCategory
    ? SEED_APPS.filter((app) => app.category === selectedCategory)
    : SEED_APPS;

  return (
    <>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <section id="apps" className="scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-10 flex items-baseline justify-between">
            <h2 className="font-serif text-2xl font-medium text-foreground">
              アプリ一覧
            </h2>
            {selectedCategory && (
              <span className="text-sm text-muted-foreground">
                {selectedCategory}
              </span>
            )}
          </div>

          {filteredApps.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredApps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-card p-16 text-center">
              <p className="text-muted-foreground">
                該当するアプリが見つかりませんでした
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
