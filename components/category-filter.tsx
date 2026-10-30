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
import { ROLES } from "@/lib/types";
import type { RoleKey } from "@/lib/types";

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
  selectedRole?: RoleKey | null;
  onRoleChange?: (role: RoleKey | null) => void;
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  selectedRole = null,
  onRoleChange,
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="sticky top-16 z-40 border-b border-foreground/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ハッシュタグ横スクロール */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            onClick={() => onCategoryChange(null)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50",
              selectedCategory === null && selectedRole === null
                ? "border-foreground bg-foreground text-background"
                : "border-foreground/25 bg-transparent text-foreground/75 hover:border-foreground hover:bg-marker hover:text-foreground"
            )}
          >
            すべて
          </button>
          {onRoleChange &&
            (Object.keys(ROLES) as RoleKey[]).map((key) => (
              <button
                key={key}
                onClick={() => onRoleChange(selectedRole === key ? null : key)}
                aria-pressed={selectedRole === key}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-1.5 font-serif text-sm font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50",
                  selectedRole === key
                    ? "border-foreground bg-marker text-foreground"
                    : "border-foreground bg-transparent text-foreground hover:bg-marker"
                )}
              >
                {ROLES[key].label.replace(/の方$/, "")}
              </button>
            ))}
          {onRoleChange && <span aria-hidden className="mx-1 h-5 w-px shrink-0 bg-foreground/30" />}
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onCategoryChange(tag)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50",
                selectedCategory === tag
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/25 bg-transparent text-foreground/75 hover:border-foreground hover:bg-marker hover:text-foreground"
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
                          "rounded-full px-3 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
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
