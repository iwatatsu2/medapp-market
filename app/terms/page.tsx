import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-foreground">利用規約</h1>
          <div className="mt-8 space-y-8 text-sm leading-loose text-muted-foreground">
            <section>
              <h2 className="text-base font-bold text-foreground">第1条（適用）</h2>
              <p className="mt-2">
                本規約は、MedApp Market（以下「本サービス」）の利用に関する条件を定めるものです。ユーザーは本規約に同意の上、本サービスを利用するものとします。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground">第2条（アカウント）</h2>
              <p className="mt-2">
                ユーザーは正確な情報を登録し、自身のアカウント情報を適切に管理する責任を負います。アカウントの不正利用により生じた損害について、本サービスは責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground">第3条（アプリの掲載）</h2>
              <p className="mt-2">
                開発者は自身が権利を有するWebアプリのみを出品できます。医療情報を扱うアプリについては、開発者自身が内容の正確性に責任を持つものとします。本サービスは掲載アプリの医学的正確性を保証しません。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground">第4条（禁止事項）</h2>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>法令に違反する行為</li>
                <li>他のユーザーまたは第三者の権利を侵害する行為</li>
                <li>虚偽の情報を登録する行為</li>
                <li>本サービスの運営を妨害する行為</li>
                <li>患者の個人情報を含むアプリの掲載</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground">第5条（免責事項）</h2>
              <p className="mt-2">
                本サービスに掲載されるアプリは各開発者の責任で提供されます。本サービスは、アプリの内容・品質・安全性について一切保証しません。掲載アプリの利用により生じた損害について、本サービスは責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground">第6条（手数料および決済）</h2>
              <ol className="mt-2 list-inside list-decimal space-y-1">
                <li>本サービスでアプリを販売する開発者は、販売価格の20%をプラットフォーム手数料として本サービスに支払うものとします。</li>
                <li>決済処理はStripe, Inc.の決済サービス（Stripe Connect）を通じて行われます。</li>
                <li>開発者の売上金（販売価格の80%からStripe決済手数料を差し引いた金額）は、Stripe Connectを通じて開発者が登録したStripeアカウントに支払われます。支払スケジュールはStripeの規定に準じます。</li>
                <li>本サービスは、手数料率を変更する場合、事前に開発者に通知するものとします。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground">第7条（規約の変更）</h2>
              <p className="mt-2">
                本サービスは、必要に応じて本規約を変更できるものとします。変更後の規約は本ページに掲載した時点で効力を生じます。
              </p>
            </section>

            <p className="text-xs text-muted-foreground">2026年4月13日 制定 / 2026年4月17日 改定</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
