import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function PurchaseSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-background">
        <div className="mx-auto max-w-md px-4 text-center">
          <CheckCircle className="mx-auto size-16 text-green-500" />
          <h1 className="mt-4 text-2xl font-bold text-foreground">
            購入完了しました！
          </h1>
          <p className="mt-2 text-muted-foreground">
            ご購入ありがとうございます。アプリをご利用いただけます。
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Button asChild>
              <Link href="/dashboard">ダッシュボードへ</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">トップに戻る</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
