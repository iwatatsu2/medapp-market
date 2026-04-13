import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppForm } from "@/components/app-form";

export default async function NewAppPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="font-serif text-2xl font-medium">新規アプリ出品</h1>
          <div className="mt-8">
            <AppForm userId={user.id} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
