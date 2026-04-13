import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link href="/" className="font-serif text-lg text-foreground">
            MedApp Market
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              利用規約
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              プライバシー
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              お問い合わせ
            </Link>
          </nav>
        </div>
        <div className="mt-8 border-t border-border/50 pt-8">
          <p className="text-center text-xs text-muted-foreground">
            &copy; 2026 MedApp Market. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
