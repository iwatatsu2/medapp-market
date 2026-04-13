import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-foreground">
            プライバシーポリシー
          </h1>
          <div className="mt-8 space-y-8 text-sm leading-loose text-muted-foreground">
            <section>
              <h2 className="text-base font-bold text-foreground">
                1. 収集する情報
              </h2>
              <p className="mt-2">本サービスは以下の情報を収集します。</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>アカウント登録情報（氏名、メールアドレス、専門科、所属）</li>
                <li>アプリの購入・利用履歴</li>
                <li>
                  アクセスログ（IPアドレス、ブラウザ情報、アクセス日時）
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground">
                2. 利用目的
              </h2>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>サービスの提供・運営</li>
                <li>ユーザーサポート</li>
                <li>サービスの改善・新機能の開発</li>
                <li>利用状況の分析</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground">
                3. 第三者提供
              </h2>
              <p className="mt-2">
                法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。ただし、決済処理のためStripe社にお支払い情報が送信されます。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground">
                4. データの保管
              </h2>
              <p className="mt-2">
                ユーザーデータはSupabase（クラウドデータベース）に安全に保管されます。適切なセキュリティ対策を講じていますが、完全な安全性を保証するものではありません。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground">
                5. ユーザーの権利
              </h2>
              <p className="mt-2">
                ユーザーは自身の個人情報の開示・訂正・削除を請求できます。アカウント削除を希望する場合はお問い合わせください。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground">
                6. お問い合わせ
              </h2>
              <p className="mt-2">
                プライバシーに関するお問い合わせは、お問い合わせページよりご連絡ください。
              </p>
            </section>

            <p className="text-xs text-muted-foreground">2026年4月13日 制定</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
