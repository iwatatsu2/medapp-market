import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductForm } from "@/components/product-form";
import { Button } from "@/components/ui/button";

export default async function NewProductPage() {
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
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/developer/products">
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
            <h1 className="font-serif text-2xl font-medium">商品を登録</h1>
          </div>
          <div className="rounded-2xl bg-card p-8">
            <ProductForm userId={user.id} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
