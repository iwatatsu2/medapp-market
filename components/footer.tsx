import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-base font-bold text-foreground">
              MedApp Market
            </Link>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              医師が作った、医師のための
              <br />
              Webアプリマーケット
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium text-foreground">アプリ</h3>
            <nav className="mt-3 flex flex-col gap-2">
              <Link href="/#apps" className="text-xs text-muted-foreground hover:text-foreground">
                アプリ一覧
              </Link>
              <Link href="/auth/register" className="text-xs text-muted-foreground hover:text-foreground">
                アプリを投稿する
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-medium text-foreground">アカウント</h3>
            <nav className="mt-3 flex flex-col gap-2">
              <Link href="/auth/login" className="text-xs text-muted-foreground hover:text-foreground">
                ログイン
              </Link>
              <Link href="/auth/register" className="text-xs text-muted-foreground hover:text-foreground">
                新規登録
              </Link>
              <Link href="/dashboard" className="text-xs text-muted-foreground hover:text-foreground">
                マイページ
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-medium text-foreground">その他</h3>
            <nav className="mt-3 flex flex-col gap-2">
              <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground">
                利用規約
              </Link>
              <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
                プライバシーポリシー
              </Link>
              <Link href="/contact" className="text-xs text-muted-foreground hover:text-foreground">
                お問い合わせ
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; 2026 MedApp Market. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
