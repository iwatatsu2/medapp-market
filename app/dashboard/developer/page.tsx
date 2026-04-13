import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, AppWindow } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import type { App } from "@/lib/types";

export default async function DeveloperDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: apps } = await supabase
    .from("apps")
    .select("*")
    .eq("developer_id", user.id)
    .order("created_at", { ascending: false });

  const myApps = (apps ?? []) as App[];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-2xl font-medium">
              開発者ダッシュボード
            </h1>
            <Button asChild className="gap-2">
              <Link href="/dashboard/developer/new">
                <Plus className="size-4" />
                新規出品
              </Link>
            </Button>
          </div>

          <div className="mt-8 rounded-2xl bg-card p-8">
            <h2 className="font-serif text-lg font-medium">出品中のアプリ</h2>

            {myApps.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                まだアプリを出品していません。
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                {myApps.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center gap-4 rounded-lg border p-4"
                  >
                    {app.thumbnail_url ? (
                      <Image
                        src={app.thumbnail_url}
                        alt={app.name}
                        width={80}
                        height={50}
                        className="rounded object-cover"
                      />
                    ) : (
                      <div className="flex h-[50px] w-[80px] items-center justify-center rounded bg-muted">
                        <AppWindow className="size-6 text-muted-foreground/40" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{app.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {app.is_published ? "公開中" : "非公開"} ・{" "}
                        {app.price === 0
                          ? "無料"
                          : `¥${app.price.toLocaleString()}`}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/developer/edit/${app.id}`}>
                        <Pencil className="size-3.5" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
