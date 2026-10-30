import Script from "next/script";
import type { Metadata } from "next";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

export const metadata: Metadata = {
  title: "MedApp Market - 医療の現場から生まれたWebアプリマーケット",
  description:
    "医療の現場から生まれたWebアプリマーケット。臨床現場で本当に使えるツールを見つけよう。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="bg-background">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Shippori+Mincho:wght@600;800&family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,500;1,9..144,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <Script src="https://wellness-note.net/a/t.js" data-app="medapp-market" strategy="afterInteractive" />
        {children}
        <CookieConsent />
        
      </body>
    </html>
  );
}
