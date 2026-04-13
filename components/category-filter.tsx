"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const categories = {
  内科系: [
    "内科",
    "消化器内科",
    "循環器内科",
    "呼吸器内科",
    "血液内科",
    "糖尿病内分泌代謝内科",
    "腎臓内科",
    "アレ膠リウマチ内科",
    "脳神経内科",
    "総合診療科",
    "アレルギー科",
    "腫瘍内科",
    "老年内科",
    "感染症科",
    "緩和ケア科",
  ],
  外科系: [
    "外科",
    "消化器外科",
    "呼吸器外科",
    "乳腺外科",
    "整形外科",
    "脳神経外科",
    "泌尿器科",
    "形成外科",
    "歯科口腔外科",
    "リハビリテーション科",
    "心臓血管外科",
    "頭頸部外科",
  ],
  その他: [
    "救急科",
    "集中治療科",
    "小児科",
    "産婦人科",
    "精神科",
    "放射線科",
    "麻酔科",
    "産業医",
    "初期研修医",
    "漢方医学",
    "基礎医学系",
    "皮膚科",
    "眼科",
    "耳鼻咽喉科",
    "医学生",
    "その他",
  ],
};

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="border-y border-border/50">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onCategoryChange(null)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm transition-colors",
                  selectedCategory === null
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                すべて
              </button>
              {selectedCategory && (
                <button className="rounded-full bg-foreground px-4 py-1.5 text-sm text-background">
                  {selectedCategory}
                </button>
              )}
            </div>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-muted-foreground"
              >
                {isOpen ? "閉じる" : "カテゴリを選ぶ"}
                <ChevronDown
                  className={cn(
                    "size-4 transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="mt-6">
            <div className="grid gap-8 md:grid-cols-3">
              {Object.entries(categories).map(([group, items]) => (
                <div key={group}>
                  <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {group}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((category) => (
                      <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs transition-colors",
                          selectedCategory === category
                            ? "bg-foreground text-background"
                            : "bg-muted text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
}
