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
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-bold tracking-tight text-foreground">
            MedApp Market
          </Link>
          <span className="hidden text-xs text-muted-foreground sm:block">
            医療の現場から生まれたWebアプリマーケット
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
            <Link href="/dashboard">マイページ</Link>
          </Button>
          {loggedIn ? (
            <Button size="sm" variant="ghost" className="ml-2 rounded-full px-5" onClick={handleLogout}>
              ログアウト
            </Button>
          ) : (
            <Button size="sm" className="ml-2 rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90" asChild>
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
