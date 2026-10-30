"use client";

import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ROLES } from "@/lib/types";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setLoggedIn(!!data.user);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline gap-4">
          <Link href="/" aria-label="MedApp Market ホームへ" className="group flex items-baseline gap-2">
            <span className="font-serif text-[22px] font-extrabold tracking-tight text-foreground sm:text-2xl">
              MedApp Market
            </span>
            <span aria-hidden className="size-2 translate-y-[-2px] rounded-full bg-tomato transition-transform duration-300 group-hover:scale-150" />
          </Link>
          <span className="kicker hidden text-muted-foreground lg:block">
            The Doctor-Made App Magazine
          </span>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/#apps">アプリ一覧</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                職種で探す <ChevronDown className="ml-1 size-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {Object.entries(ROLES).map(([key, role]) => (
                <DropdownMenuItem key={key} asChild>
                  <Link href={`/for/${key}`}>
                    {role.icon} {role.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/shop">ショップ</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/tools">くらしのツール</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">マイページ</Link>
          </Button>
          {loggedIn ? (
            <Button size="sm" variant="ghost" className="ml-2 rounded-full px-5" onClick={handleLogout}>
              ログアウト
            </Button>
          ) : (
            <Button size="sm" className="ml-2 rounded-full bg-foreground px-5 text-background hover:bg-tomato active:scale-[0.98]" asChild>
              <Link href="/auth/login">ログイン</Link>
            </Button>
          )}
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
              <SheetTitle>メニュー</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-4">
              <Link
                href="/#apps"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                アプリ一覧
              </Link>
              <div className="space-y-1">
                <span className="text-xs font-medium text-foreground">職種で探す</span>
                {Object.entries(ROLES).map(([key, role]) => (
                  <Link
                    key={key}
                    href={`/for/${key}`}
                    className="block pl-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {role.icon} {role.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/shop"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                ショップ
              </Link>
              <Link
                href="/tools"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                🏠 くらしのツール
              </Link>
              <Link
                href="/dashboard"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                マイページ
              </Link>
              {loggedIn ? (
                <Button size="sm" className="mt-4 w-full rounded-full" onClick={handleLogout}>
                  ログアウト
                </Button>
              ) : (
                <Button size="sm" className="mt-4 w-full rounded-full" asChild>
                  <Link href="/auth/login">ログイン</Link>
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
