import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-base font-bold text-white">
              MedApp Market
            </Link>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              医療の現場から生まれた
              <br />
              Webアプリマーケット
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium text-slate-300">アプリ</h3>
            <nav className="mt-3 flex flex-col gap-2">
              <Link href="/#apps" className="text-xs text-slate-400 hover:text-white">
                アプリ一覧
              </Link>
              <Link href="/auth/register" className="text-xs text-slate-400 hover:text-white">
                アプリを投稿する
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-medium text-slate-300">アカウント</h3>
            <nav className="mt-3 flex flex-col gap-2">
              <Link href="/auth/login" className="text-xs text-slate-400 hover:text-white">
                ログイン
              </Link>
              <Link href="/auth/register" className="text-xs text-slate-400 hover:text-white">
                新規登録
              </Link>
              <Link href="/dashboard" className="text-xs text-slate-400 hover:text-white">
                マイページ
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-medium text-slate-300">その他</h3>
            <nav className="mt-3 flex flex-col gap-2">
              <Link href="/terms" className="text-xs text-slate-400 hover:text-white">
                利用規約
              </Link>
              <Link href="/privacy" className="text-xs text-slate-400 hover:text-white">
                プライバシーポリシー
              </Link>
              <Link href="/tokushoho" className="text-xs text-slate-400 hover:text-white">
                特定商取引法に基づく表記
              </Link>
              <Link href="/contact" className="text-xs text-slate-400 hover:text-white">
                お問い合わせ
              </Link>
              <Link href="/#install" className="text-xs text-slate-400 hover:text-white">
                アプリをインストール
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-700 pt-6">
          <p className="text-center text-xs leading-relaxed text-slate-500">
            当サイトに掲載されたアプリは医療行為の代替ではありません。医療上の判断は必ず医療専門家にご相談ください。
          </p>
          <p className="mt-2 text-center text-xs text-slate-500">
            &copy; 2026 MedApp Market. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
