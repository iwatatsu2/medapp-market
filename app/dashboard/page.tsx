import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ProfileForm } from "@/components/profile-form";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("market_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="font-serif text-2xl font-medium">マイページ</h1>

          <div className="mt-8">
            <ProfileForm
              userId={user.id}
              email={user.email || ""}
              profile={profile}
            />
          </div>

          <div className="mt-8 rounded-2xl bg-card p-8">
            <h2 className="font-serif text-lg font-medium">購入済みアプリ</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              まだ購入したアプリはありません。
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Link
              href="/dashboard/developer"
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              開発者ダッシュボードへ
            </Link>
            <form
              action={async () => {
                "use server";
                const supabase = await createClient();
                await supabase.auth.signOut();
                redirect("/");
              }}
            >
              <Button variant="outline" size="sm" className="rounded-full">
                ログアウト
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
