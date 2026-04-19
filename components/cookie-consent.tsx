"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white p-4 shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-xs text-muted-foreground">
          当サイトではCookieを使用しています。詳しくは
          <Link href="/privacy" className="underline underline-offset-2">プライバシーポリシー</Link>
          をご覧ください。
        </p>
        <Button size="sm" onClick={handleAccept} className="shrink-0 rounded-full px-6">
          同意する
        </Button>
      </div>
    </div>
  );
}
