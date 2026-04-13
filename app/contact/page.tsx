import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-foreground">お問い合わせ</h1>
          <div className="mt-8 rounded-2xl bg-card p-8">
            <p className="text-sm leading-loose text-muted-foreground">
              MedApp
              Marketに関するご質問・ご要望・不具合報告は、以下のメールアドレスまでお気軽にお問い合わせください。
            </p>
            <div className="mt-6 rounded-lg border border-border bg-background p-4">
              <p className="text-sm text-muted-foreground">メール</p>
              <p className="mt-1 text-base font-medium text-foreground">
                medappmarket@gmail.com
              </p>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              ※ 通常2〜3営業日以内にご返信いたします。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
