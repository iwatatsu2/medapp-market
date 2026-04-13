import Link from "next/link";
import { AppWindow, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface AppData {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  tagline: string;
  description: string;
  app_url: string;
  demo_url: string | null;
  developer_name: string;
  developer_specialty: string;
}

interface AppCardProps {
  app: AppData;
}

export function AppCard({ app }: AppCardProps) {
  const isFree = app.price === 0;

  return (
    <Link href={`/apps/${app.slug}`} className="group block">
      <article className="overflow-hidden rounded-2xl bg-card transition-all hover:shadow-lg">
        <div className="flex aspect-video items-center justify-center bg-muted">
          <AppWindow className="size-10 text-muted-foreground/50" />
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-lg font-medium text-foreground">
              {app.name}
            </h3>
            <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {app.tagline}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <Badge
              variant="secondary"
              className="rounded-full text-xs font-normal"
            >
              {app.category}
            </Badge>
            <span className="text-sm font-medium text-foreground">
              {isFree ? "無料" : `¥${app.price.toLocaleString()}`}
            </span>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            {app.developer_name}
          </p>
        </div>
      </article>
    </Link>
  );
}
