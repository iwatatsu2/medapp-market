"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-serif text-xl font-medium tracking-tight text-foreground"
        >
          MedApp Market
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/#apps"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            アプリ一覧
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            マイページ
          </Link>
          <Button size="sm" className="rounded-full px-6" asChild>
            <Link href="/auth/login">ログイン</Link>
          </Button>
        </nav>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="size-5" />
              <span className="sr-only">メニューを開く</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="font-serif">メニュー</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-6">
              <Link
                href="/#apps"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                アプリ一覧
              </Link>
              <Link
                href="/dashboard"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                マイページ
              </Link>
              <Button size="sm" className="mt-4 w-full rounded-full" asChild>
                <Link href="/auth/login">ログイン</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
