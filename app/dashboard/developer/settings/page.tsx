"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

type ConnectStatus = {
  connected: boolean;
  onboarding_complete: boolean;
  charges_enabled?: boolean;
  payouts_enabled?: boolean;
};

export default function DeveloperSettingsPage() {
  const [status, setStatus] = useState<ConnectStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    fetch("/api/stripe/connect/status")
      .then((res) => res.json())
      .then(setStatus)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      const res = await fetch("/api/stripe/connect", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Failed to start onboarding:", error);
      setConnecting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/dashboard/developer"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            ダッシュボードに戻る
          </Link>

          <h1 className="mt-4 font-serif text-2xl font-medium">売上・決済設定</h1>

          <div className="mt-8 rounded-2xl bg-card p-8">
            <h2 className="font-serif text-lg font-medium">Stripe連携</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              有料アプリの売上を受け取るには、Stripeアカウントの連携が必要です。
              売上の80%が開発者に、20%がプラットフォーム手数料となります。
            </p>

            <div className="mt-6">
              {loading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  読み込み中...
                </div>
              ) : status?.onboarding_complete ? (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <CheckCircle2 className="size-5" />
                    <span className="font-medium">Stripe連携済み</span>
                  </div>
                  <p className="mt-1 text-sm text-green-600 dark:text-green-500">
                    売上の受け取り準備が完了しています。
                  </p>
                </div>
              ) : status?.connected ? (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950">
                  <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                    <AlertCircle className="size-5" />
                    <span className="font-medium">設定が未完了です</span>
                  </div>
                  <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-500">
                    Stripeの本人確認・口座登録を完了してください。
                  </p>
                  <Button
                    onClick={handleConnect}
                    disabled={connecting}
                    className="mt-3"
                    size="sm"
                  >
                    {connecting ? (
                      <Loader2 className="mr-2 size-4 animate-spin" />
                    ) : null}
                    設定を続ける
                  </Button>
                </div>
              ) : (
                <div>
                  <Button onClick={handleConnect} disabled={connecting}>
                    {connecting ? (
                      <Loader2 className="mr-2 size-4 animate-spin" />
                    ) : null}
                    Stripeアカウントを連携する
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
