"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    displayName: "",
    specialty: "",
    hospital: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          display_name: form.displayName,
          specialty: form.specialty,
          hospital: form.hospital,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-center font-serif text-2xl font-medium">
            新規登録
          </h1>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error && (
              <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </p>
            )}
            <div>
              <Label>氏名</Label>
              <Input
                type="text"
                value={form.displayName}
                onChange={(e) => update("displayName", e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label>メールアドレス</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label>パスワード</Label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                required
                minLength={6}
                className="mt-1"
              />
            </div>
            <div>
              <Label>専門科</Label>
              <Input
                type="text"
                value={form.specialty}
                onChange={(e) => update("specialty", e.target.value)}
                placeholder="例：糖尿病内科"
                className="mt-1"
              />
            </div>
            <div>
              <Label>所属</Label>
              <Input
                type="text"
                value={form.hospital}
                onChange={(e) => update("hospital", e.target.value)}
                placeholder="例：○○大学病院"
                className="mt-1"
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-full"
              size="lg"
              disabled={loading}
            >
              {loading ? "登録中..." : "登録する"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            アカウントをお持ちの方は{" "}
            <Link
              href="/auth/login"
              className="text-foreground underline underline-offset-4"
            >
              ログイン
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
