"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useState } from "react";

const popularTags = [
  "研修医",
  "総合診療",
  "救急外来",
  "糖尿病",
  "感染症",
  "循環器内科",
  "プライマリケア",
  "初期研修医向け",
  "脳神経内科",
];

const allCategories = {
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
    <section className="border-b border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ハッシュタグ横スクロール */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            onClick={() => onCategoryChange(null)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors",
              selectedCategory === null
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-white text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            )}
          >
            すべて
          </button>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onCategoryChange(tag)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors",
                selectedCategory === tag
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-white text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              )}
            >
              #{tag}
            </button>
          ))}

          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="shrink-0 gap-1 text-sm text-muted-foreground"
              >
                診療科
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>

        {/* 全カテゴリ展開 */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent>
            <div className="grid gap-6 border-t border-border pb-6 pt-4 md:grid-cols-3">
              {Object.entries(allCategories).map(([group, items]) => (
                <div key={group}>
                  <h3 className="mb-3 text-xs font-medium text-muted-foreground">
                    {group}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          onCategoryChange(category);
                          setIsOpen(false);
                        }}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs transition-colors",
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground hover:text-foreground"
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
