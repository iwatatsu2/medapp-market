import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppCard } from "@/components/app-card";
import { createClient } from "@/lib/supabase/server";
import { ROLES } from "@/lib/types";
import { SEED_APPS } from "@/lib/seed-apps";
import type { RoleKey } from "@/lib/types";
import type { AppData } from "@/components/app-card";

export function generateStaticParams() {
  return Object.keys(ROLES).map((role) => ({ role }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  const roleData = ROLES[role as RoleKey];
  if (!roleData) return {};
  return {
    title: `${roleData.label}向けアプリ | MedApp Market`,
    description: roleData.description,
  };
}

export default async function RolePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  const roleData = ROLES[role as RoleKey];
  if (!roleData) notFound();

  const supabase = await createClient();
  const { data } = await supabase
    .from("apps")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  const dbApps: AppData[] = (data ?? []).map((a: Record<string, unknown>) => ({
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
    target_roles: a.target_roles as string[] | undefined,
    developer_name: "開発者",
    developer_specialty: "",
  }));

  const dbSlugs = new Set(dbApps.map((a) => a.slug));
  const seedOnly = SEED_APPS.filter((a) => !dbSlugs.has(a.slug));
  const allApps = [...dbApps, ...seedOnly];

  const filteredApps = allApps.filter(
    (app) => app.target_roles && app.target_roles.includes(role)
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* ヒーロー */}
        <section
          className={`bg-gradient-to-br ${roleData.color} text-white`}
        >
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" />
              トップに戻る
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-5xl">{roleData.icon}</span>
              <div>
                <h1 className="whitespace-pre-line text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                  {roleData.title}
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                  {roleData.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* アプリ一覧 */}
        <section className="bg-background">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <h2 className="mb-6 text-lg font-bold text-foreground">
              {roleData.label}向けアプリ（{filteredApps.length}件）
            </h2>

            {filteredApps.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredApps.map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-white p-12 text-center">
                <p className="text-sm text-muted-foreground">
                  現在{roleData.label}向けのアプリを準備中です。
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
