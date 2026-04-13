"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";

type Profile = {
  display_name: string | null;
  specialty: string | null;
  hospital: string | null;
};

export function ProfileForm({
  userId,
  email,
  profile,
}: {
  userId: string;
  email: string;
  profile: Profile | null;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    display_name: profile?.display_name || "",
    specialty: profile?.specialty || "",
    hospital: profile?.hospital || "",
  });

  function update(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    await supabase
      .from("market_profiles")
      .upsert({
        id: userId,
        display_name: form.display_name || null,
        specialty: form.specialty || null,
        hospital: form.hospital || null,
      });
    setSaving(false);
    setEditing(false);
    router.refresh();
  }

  if (!editing) {
    return (
      <div className="rounded-2xl bg-card p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-medium">プロフィール</h2>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground"
            onClick={() => setEditing(true)}
          >
            <Pencil className="size-3.5" />
            編集
          </Button>
        </div>
        <div className="mt-4 space-y-2 text-sm">
          <p>
            <span className="text-muted-foreground">氏名：</span>
            {profile?.display_name || "未設定"}
          </p>
          <p>
            <span className="text-muted-foreground">メール：</span>
            {email}
          </p>
          <p>
            <span className="text-muted-foreground">専門科：</span>
            {profile?.specialty || "未設定"}
          </p>
          <p>
            <span className="text-muted-foreground">所属：</span>
            {profile?.hospital || "未設定"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card p-8">
      <h2 className="font-serif text-lg font-medium">プロフィール編集</h2>
      <div className="mt-4 space-y-4">
        <div>
          <Label>氏名</Label>
          <Input
            value={form.display_name}
            onChange={(e) => update("display_name", e.target.value)}
            placeholder="例：山田 太郎"
            className="mt-1"
          />
        </div>
        <div>
          <Label>メール</Label>
          <Input value={email} disabled className="mt-1 bg-muted" />
        </div>
        <div>
          <Label>専門科</Label>
          <Input
            value={form.specialty}
            onChange={(e) => update("specialty", e.target.value)}
            placeholder="例：内科"
            className="mt-1"
          />
        </div>
        <div>
          <Label>所属</Label>
          <Input
            value={form.hospital}
            onChange={(e) => update("hospital", e.target.value)}
            placeholder="例：○○大学病院"
            className="mt-1"
          />
        </div>
        <div className="flex gap-3 pt-2">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full px-6"
          >
            {saving ? "保存中..." : "保存する"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setEditing(false)}
            className="rounded-full px-6"
          >
            キャンセル
          </Button>
        </div>
      </div>
    </div>
  );
}
