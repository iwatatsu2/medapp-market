import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default async function DeveloperDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="font-serif text-2xl font-medium">
            開発者ダッシュボード
          </h1>

          <div className="mt-8 rounded-2xl bg-card p-8">
            <h2 className="font-serif text-lg font-medium">出品中のアプリ</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              まだアプリを出品していません。
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-card p-8">
            <h2 className="font-serif text-lg font-medium">売上サマリー</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              売上データはまだありません。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
