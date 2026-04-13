import Link from "next/link";

export default function DeveloperDashboardPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold">開発者ダッシュボード</h1>

      <div className="mt-8 rounded-xl border bg-white p-8 text-center">
        <p className="text-gray-500">
          ログインすると、出品中のアプリと売上データが表示されます。
        </p>
        <Link
          href="/auth/login"
          className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          ログイン
        </Link>
      </div>
    </div>
  );
}
