import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LikeButton } from "@/components/like-button";
import { ShareButton } from "@/components/share-button";
import { CommentSection } from "@/components/comment-section";
import { SEED_TOOLS } from "@/lib/seed-tools";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

function getTool(slug: string) {
  return SEED_TOOLS.find((t) => t.slug === slug) ?? null;
}

export function generateStaticParams() {
  return SEED_TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} | くらしのツール | MedApp Market`,
    description: tool.tagline,
  };
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pageUrl = `https://medapp-market.vercel.app/tools/${slug}`;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/tools"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            くらしのツールに戻る
          </Link>

          <div className="overflow-hidden rounded-lg border border-border bg-white">
            {/* ヒーロー */}
            <div
              className={`bg-gradient-to-br ${tool.color} flex items-center justify-center py-16`}
            >
              <span className="text-8xl">{tool.emoji}</span>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                  {tool.name}
                </h1>
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {tool.tagline}
              </p>

              {/* アクションボタン */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-3 text-base font-bold text-white shadow-sm transition-all hover:scale-105 hover:bg-emerald-700"
                >
                  つかってみる
                  <ExternalLink className="size-4" />
                </a>
                <LikeButton slug={`tool-${slug}`} />
                <ShareButton url={pageUrl} title={`${tool.name} | MedApp Market`} />
              </div>

              {/* 説明 */}
              <div className="mt-8 border-t border-border pt-6">
                <h2 className="text-lg font-bold text-foreground">説明</h2>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-loose text-muted-foreground">
                  {tool.description}
                </p>
              </div>

              {/* コメント */}
              <CommentSection slug={`tool-${slug}`} currentUserId={user?.id} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
