import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppForm } from "@/components/app-form";
import type { App } from "@/lib/types";

export default async function EditAppPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data } = await supabase
    .from("apps")
    .select("*")
    .eq("id", id)
    .eq("developer_id", user.id)
    .single();

  if (!data) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="font-serif text-2xl font-medium">アプリ編集</h1>
          <div className="mt-8">
            <AppForm app={data as App} userId={user.id} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
