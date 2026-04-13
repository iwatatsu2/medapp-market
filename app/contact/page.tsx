import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-foreground">お問い合わせ</h1>
          <div className="mt-8 rounded-2xl bg-card p-8 text-center">
            <p className="text-sm leading-loose text-muted-foreground">
              MedApp Marketに関するご質問・ご要望・不具合報告は、
              <br className="hidden sm:block" />
              以下のフォームよりお気軽にお問い合わせください。
            </p>
            <div className="mt-6">
              <Button size="lg" className="gap-2 rounded-full px-8" asChild>
                <a
                  href="https://forms.gle/FK9ZGSy9BazhKhAC8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  お問い合わせフォームを開く
                  <ExternalLink className="size-4" />
                </a>
              </Button>
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
