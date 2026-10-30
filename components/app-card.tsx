import Link from "next/link";
import Image from "next/image";
import { AppWindow, Heart, MessageCircle } from "lucide-react";
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
}

export function AppCard({ app }: AppCardProps) {
  const isFree = app.price === 0;

  return (
    <Link href={`/apps/${app.slug}`} className="group block">
      <article className="lift relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card hover:shadow-card-hover hover:border-primary/30">
        {/* ホバーで伸びるブランドアクセント */}
        <div className="brand-bar absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
        {/* サムネイル */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-secondary to-accent">
          {app.thumbnail_url ? (
            <Image
              src={app.thumbnail_url}
              alt={app.name}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <AppWindow className="size-12 text-primary/30" />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 rounded-t-2xl ring-1 ring-inset ring-black/[0.04]" />
        </div>

        {/* コンテンツ */}
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${isFree ? "bg-primary/10 text-primary" : "bg-foreground/[0.06] text-foreground"}`}>
              {isFree ? "無料" : `¥${app.price.toLocaleString()}`}
            </span>
            {(Array.isArray(app.category) ? app.category : [app.category]).map((cat) => (
              <span key={cat} className="text-xs text-muted-foreground whitespace-nowrap">
                {getCategoryLabel(cat)}
              </span>
            ))}
          </div>

          <h3 className="mt-2.5 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {app.name}
          </h3>

          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {app.tagline}
          </p>

          <div className="mt-3.5 flex items-center gap-2 border-t border-border/70 pt-3">
            <div className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.42_0.17_285)] text-xs font-semibold text-primary-foreground">
              {app.developer_name.charAt(0)}
            </div>
            <span className="text-xs text-muted-foreground">
              {app.developer_name}
            </span>
            <span className="text-xs text-muted-foreground">
              {app.developer_specialty}
            </span>
            <span className="ml-auto flex items-center gap-3 text-xs text-muted-foreground tabular-nums">
              {app.access_count != null && (
                <span className="flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                  {app.access_count.toLocaleString()}
                </span>
              )}
              {(app.like_count ?? 0) > 0 && (
                <span className="flex items-center gap-0.5">
                  <Heart className="size-3 text-red-400" aria-hidden />
                  {app.like_count}
                </span>
              )}
              {(app.comment_count ?? 0) > 0 && (
                <span className="flex items-center gap-0.5">
                  <MessageCircle className="size-3" aria-hidden />
                  {app.comment_count}
                </span>
              )}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
