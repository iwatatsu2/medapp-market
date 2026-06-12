import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function OrderCompletePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-lg px-4 py-20 text-center">
          <CheckCircle className="mx-auto size-16 text-green-500" />
          <h1 className="mt-6 font-serif text-2xl font-medium">
            ご注文ありがとうございます
          </h1>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            決済が完了しました。<br />
            商品は登録された住所に発送いたします。<br />
            領収書はStripeからメールで届きます。
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            発送状況はマイページの注文履歴からご確認いただけます。
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild>
              <Link href="/dashboard">注文履歴を確認</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/shop">ショップに戻る</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
