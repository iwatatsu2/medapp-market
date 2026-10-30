"use client";

import { useState } from "react";
import { Smartphone } from "lucide-react";

export function InstallGuide() {
  const [tab, setTab] = useState<"iphone" | "android">("iphone");

  return (
    <section id="install" className="scroll-mt-20 border-t-2 border-foreground bg-paper-2 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-marker mb-4 border border-foreground">
            <Smartphone className="w-6 h-6 text-foreground" />
          </div>
          <h2 className="font-serif text-3xl font-extrabold tracking-tight text-foreground">
            ホーム画面に追加する方法
          </h2>
          <p className="mt-2 text-sm text-foreground/65">
            MedApp Marketはアプリのようにホーム画面から起動できます
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-full border border-foreground p-1">
            <button
              onClick={() => setTab("iphone")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                tab === "iphone"
                  ? "bg-foreground text-background"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              iPhone / iPad
            </button>
            <button
              onClick={() => setTab("android")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                tab === "android"
                  ? "bg-foreground text-background"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              Android
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="rounded-md border border-foreground bg-card p-6">
          {tab === "iphone" ? (
            <ol className="space-y-5">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background font-display italic text-sm flex items-center justify-center">1</span>
                <div>
                  <p className="font-medium text-foreground">Safariでこのサイトを開く</p>
                  <p className="text-sm text-foreground/60 mt-1">※ Chrome等では追加できません。必ずSafariを使ってください</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background font-display italic text-sm flex items-center justify-center">2</span>
                <div>
                  <p className="font-medium text-foreground">画面下の共有ボタン <span className="inline-block bg-paper-2 px-2 py-0.5 rounded text-xs">⬆︎</span> をタップ</p>
                  <p className="text-sm text-foreground/60 mt-1">四角に上矢印のアイコンです</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background font-display italic text-sm flex items-center justify-center">3</span>
                <div>
                  <p className="font-medium text-foreground">「ホーム画面に追加」をタップ</p>
                  <p className="text-sm text-foreground/60 mt-1">下にスクロールすると見つかります</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background font-display italic text-sm flex items-center justify-center">4</span>
                <div>
                  <p className="font-medium text-foreground">右上の「追加」をタップして完了！</p>
                  <p className="text-sm text-foreground/60 mt-1">ホーム画面にアプリアイコンが表示されます</p>
                </div>
              </li>
            </ol>
          ) : (
            <ol className="space-y-5">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background font-display italic text-sm flex items-center justify-center">1</span>
                <div>
                  <p className="font-medium text-foreground">Chromeでこのサイトを開く</p>
                  <p className="text-sm text-foreground/60 mt-1">Google Chromeブラウザを使用してください</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background font-display italic text-sm flex items-center justify-center">2</span>
                <div>
                  <p className="font-medium text-foreground">右上のメニュー <span className="inline-block bg-paper-2 px-2 py-0.5 rounded text-xs">⋮</span> をタップ</p>
                  <p className="text-sm text-foreground/60 mt-1">縦に3つの点が並んだアイコンです</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background font-display italic text-sm flex items-center justify-center">3</span>
                <div>
                  <p className="font-medium text-foreground">「ホーム画面に追加」または「アプリをインストール」をタップ</p>
                  <p className="text-sm text-foreground/60 mt-1">表示が異なる場合がありますが、どちらでもOKです</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background font-display italic text-sm flex items-center justify-center">4</span>
                <div>
                  <p className="font-medium text-foreground">「インストール」をタップして完了！</p>
                  <p className="text-sm text-foreground/60 mt-1">ホーム画面にアプリアイコンが表示されます</p>
                </div>
              </li>
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
