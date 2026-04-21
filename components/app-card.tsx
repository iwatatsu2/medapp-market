import Link from "next/link";
import Image from "next/image";
import { AppWindow } from "lucide-react";
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
  developer_name: string;
  developer_specialty: string;
  access_count?: number;
}

interface AppCardProps {
  app: AppData;
}

export function AppCard({ app }: AppCardProps) {
  const isFree = app.price === 0;

  return (
    <Link href={`/apps/${app.slug}`} className="group block">
      <article className="overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-shadow hover:shadow-lg">
        {/* サムネイル */}
        <div className="relative aspect-[16/9] bg-gradient-to-br from-slate-100 to-indigo-50">
          {app.thumbnail_url ? (
            <Image
              src={app.thumbnail_url}
              alt={app.name}
              fill
              className="object-contain"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <AppWindow className="size-12 text-primary/30" />
            </div>
          )}
        </div>

        {/* コンテンツ */}
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded bg-primary/10 px-2 py-0.5 text-xs text-primary whitespace-nowrap">
              {isFree ? "無料" : `¥${app.price.toLocaleString()}`}
            </span>
            {(Array.isArray(app.category) ? app.category : [app.category]).map((cat) => (
              <span key={cat} className="text-xs text-muted-foreground whitespace-nowrap">
                {getCategoryLabel(cat)}
              </span>
            ))}
          </div>

          <h3 className="mt-2 text-base font-medium leading-snug text-foreground">
            {app.name}
          </h3>

          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {app.tagline}
          </p>

          <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
            <div className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
              {app.developer_name.charAt(0)}
            </div>
            <span className="text-xs text-muted-foreground">
              {app.developer_name}
            </span>
            <span className="text-xs text-muted-foreground">
              {app.developer_specialty}
            </span>
            {app.access_count != null && (
              <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                {app.access_count.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
