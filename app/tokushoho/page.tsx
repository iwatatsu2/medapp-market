import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function TokushohoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-foreground">
            特定商取引法に基づく表記
          </h1>
          <div className="mt-8 overflow-hidden rounded-lg border border-border bg-white">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border">
                <tr>
                  <th className="w-1/3 bg-muted/30 px-4 py-3 text-left font-medium text-foreground">
                    販売業者
                  </th>
                  <td className="px-4 py-3 text-muted-foreground">
                    請求があった場合に遅滞なく開示いたします
                  </td>
                </tr>
                <tr>
                  <th className="bg-muted/30 px-4 py-3 text-left font-medium text-foreground">
                    運営責任者
                  </th>
                  <td className="px-4 py-3 text-muted-foreground">
                    請求があった場合に遅滞なく開示いたします
                  </td>
                </tr>
                <tr>
                  <th className="bg-muted/30 px-4 py-3 text-left font-medium text-foreground">
                    所在地
                  </th>
                  <td className="px-4 py-3 text-muted-foreground">
                    請求があった場合に遅滞なく開示いたします
                  </td>
                </tr>
                <tr>
                  <th className="bg-muted/30 px-4 py-3 text-left font-medium text-foreground">
                    連絡先
                  </th>
                  <td className="px-4 py-3 text-muted-foreground">
                    お問い合わせフォームよりご連絡ください
                    <br />
                    <a
                      href="/contact"
                      className="text-primary underline hover:no-underline"
                    >
                      お問い合わせページはこちら
                    </a>
                  </td>
                </tr>
                <tr>
                  <th className="bg-muted/30 px-4 py-3 text-left font-medium text-foreground">
                    販売価格
                  </th>
                  <td className="px-4 py-3 text-muted-foreground">
                    各アプリの詳細ページに表示された価格（税込）
                  </td>
                </tr>
                <tr>
                  <th className="bg-muted/30 px-4 py-3 text-left font-medium text-foreground">
                    販売価格以外の必要料金
                  </th>
                  <td className="px-4 py-3 text-muted-foreground">
                    インターネット接続に必要な通信料（お客様のご負担）
                  </td>
                </tr>
                <tr>
                  <th className="bg-muted/30 px-4 py-3 text-left font-medium text-foreground">
                    支払方法
                  </th>
                  <td className="px-4 py-3 text-muted-foreground">
                    クレジットカード決済（Stripe経由）
                  </td>
                </tr>
                <tr>
                  <th className="bg-muted/30 px-4 py-3 text-left font-medium text-foreground">
                    支払時期
                  </th>
                  <td className="px-4 py-3 text-muted-foreground">
                    購入時に即時決済
                  </td>
                </tr>
                <tr>
                  <th className="bg-muted/30 px-4 py-3 text-left font-medium text-foreground">
                    商品の引渡し時期
                  </th>
                  <td className="px-4 py-3 text-muted-foreground">
                    決済完了後、即時ご利用いただけます
                  </td>
                </tr>
                <tr>
                  <th className="bg-muted/30 px-4 py-3 text-left font-medium text-foreground">
                    返品・キャンセル
                  </th>
                  <td className="px-4 py-3 text-muted-foreground">
                    デジタルコンテンツという商品の性質上、購入後の返品・返金は原則としてお受けできません。ただし、商品に重大な不具合がある場合はお問い合わせください。
                  </td>
                </tr>
                <tr>
                  <th className="bg-muted/30 px-4 py-3 text-left font-medium text-foreground">
                    動作環境
                  </th>
                  <td className="px-4 py-3 text-muted-foreground">
                    最新版のChrome、Safari、Edge等のモダンブラウザ。インターネット接続が必要です。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 space-y-6 text-sm leading-loose text-muted-foreground">
            <section>
              <h2 className="text-base font-bold text-foreground">
                開発者向け：プラットフォーム手数料について
              </h2>
              <p className="mt-2">
                本サービスでアプリを販売する開発者には、販売価格の20%をプラットフォーム手数料としてお支払いいただきます。残りの80%から、Stripeの決済手数料が差し引かれた金額が開発者の売上となります。
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>
                  プラットフォーム手数料：販売価格の20%
                </li>
                <li>
                  Stripe決済手数料：開発者の売上（80%）から別途差し引かれます
                </li>
                <li>
                  売上金の受取：Stripe
                  Connectを通じて開発者のアカウントに支払われます
                </li>
                <li>
                  支払サイクル：Stripeの標準的な支払スケジュールに準じます
                </li>
              </ul>
            </section>
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            2026年4月17日 制定
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
