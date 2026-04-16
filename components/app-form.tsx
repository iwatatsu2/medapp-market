"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { uploadAppImage } from "@/lib/upload";
import { CATEGORIES } from "@/lib/types";
import type { App } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AppFormProps {
  app?: App;
  userId: string;
}

export function AppForm({ app, userId }: AppFormProps) {
  const router = useRouter();
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const screenshotsRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(app?.name ?? "");
  const [tagline, setTagline] = useState(app?.tagline ?? "");
  const [description, setDescription] = useState(app?.description ?? "");
  const [price, setPrice] = useState(app?.price ?? 0);
  const [category, setCategory] = useState(app?.category ?? "other");
  const [appUrl, setAppUrl] = useState(app?.app_url ?? "");
  const [demoUrl, setDemoUrl] = useState(app?.demo_url ?? "");
  const [thumbnailUrl, setThumbnailUrl] = useState(app?.thumbnail_url ?? "");
  const [screenshots, setScreenshots] = useState<string[]>(
    app?.screenshots ?? []
  );
  const [isPublished, setIsPublished] = useState(app?.is_published ?? false);

  function slugify(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  async function handleThumbnailUpload(file: File) {
    const path = `${userId}/thumbnail-${Date.now()}.${file.name.split(".").pop()}`;
    const url = await uploadAppImage(file, path);
    setThumbnailUrl(url);
  }

  async function handleScreenshotUpload(files: FileList) {
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      if (screenshots.length + newUrls.length >= 4) break;
      const path = `${userId}/ss-${Date.now()}-${Math.random().toString(36).slice(2, 6)}.${file.name.split(".").pop()}`;
      const url = await uploadAppImage(file, path);
      newUrls.push(url);
    }
    setScreenshots((prev) => [...prev, ...newUrls].slice(0, 4));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const supabase = createClient();
      const slug = app?.slug ?? (slugify(name) || `app-${Date.now()}`);

      const payload = {
        developer_id: userId,
        slug,
        name,
        tagline,
        description,
        price,
        category,
        app_url: appUrl,
        demo_url: demoUrl || null,
        thumbnail_url: thumbnailUrl || null,
        screenshots,
        is_published: isPublished,
      };

      if (app) {
        const { error: err } = await supabase
          .from("apps")
          .update(payload)
          .eq("id", app.id);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from("apps").insert(payload);
        if (err) throw err;
      }

      router.push("/dashboard/developer");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "保存に失敗しました");
    } finally {
      setSaving(false);
    }
  }

  const categories = CATEGORIES.filter((c) => c.value !== "all");

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* アプリ名 */}
      <div className="space-y-2">
        <Label htmlFor="name">アプリ名 *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="例: DM Compass"
        />
      </div>

      {/* キャッチコピー */}
      <div className="space-y-2">
        <Label htmlFor="tagline">キャッチコピー *</Label>
        <Input
          id="tagline"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          required
          placeholder="例: 糖尿病病棟管理の計算・ガイドツール"
        />
      </div>

      {/* 説明 */}
      <div className="space-y-2">
        <Label htmlFor="description">説明</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          placeholder="アプリの詳細な説明"
        />
      </div>

      {/* カテゴリ・価格 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">カテゴリ *</Label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">価格（円）</Label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            min={0}
            step={100}
            placeholder="0 = 無料"
          />
          <p className="text-xs text-muted-foreground">
            0 = 無料。有料の場合は円単位で入力（例: 980）
          </p>
        </div>
      </div>

      {/* URL */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="app_url">アプリURL *</Label>
          <Input
            id="app_url"
            type="url"
            value={appUrl}
            onChange={(e) => setAppUrl(e.target.value)}
            required
            placeholder="https://..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="demo_url">デモURL</Label>
          <Input
            id="demo_url"
            type="url"
            value={demoUrl}
            onChange={(e) => setDemoUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>

      {/* サムネイル */}
      <div className="space-y-2">
        <Label>サムネイル画像</Label>
        <input
          ref={thumbnailRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) await handleThumbnailUpload(file);
          }}
        />
        {thumbnailUrl ? (
          <div className="relative inline-block">
            <Image
              src={thumbnailUrl}
              alt="サムネイル"
              width={320}
              height={200}
              className="rounded-lg border object-cover"
            />
            <button
              type="button"
              onClick={() => setThumbnailUrl("")}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
            >
              <X className="size-3" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => thumbnailRef.current?.click()}
            className="flex h-32 w-64 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 hover:border-primary/50"
          >
            <div className="text-center">
              <ImagePlus className="mx-auto size-8 text-muted-foreground/50" />
              <p className="mt-1 text-xs text-muted-foreground">
                クリックしてアップロード
              </p>
            </div>
          </button>
        )}
      </div>

      {/* スクリーンショット */}
      <div className="space-y-2">
        <Label>スクリーンショット（最大4枚）</Label>
        <input
          ref={screenshotsRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={async (e) => {
            if (e.target.files) await handleScreenshotUpload(e.target.files);
          }}
        />
        <div className="flex flex-wrap gap-3">
          {screenshots.map((url, i) => (
            <div key={i} className="relative">
              <Image
                src={url}
                alt={`スクリーンショット ${i + 1}`}
                width={160}
                height={100}
                className="rounded-lg border object-cover"
              />
              <button
                type="button"
                onClick={() =>
                  setScreenshots((prev) => prev.filter((_, j) => j !== i))
                }
                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
          {screenshots.length < 4 && (
            <button
              type="button"
              onClick={() => screenshotsRef.current?.click()}
              className="flex h-[100px] w-[160px] items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 hover:border-primary/50"
            >
              <ImagePlus className="size-6 text-muted-foreground/50" />
            </button>
          )}
        </div>
      </div>

      {/* 公開設定 */}
      <div className="flex items-center gap-3">
        <Switch
          checked={isPublished}
          onCheckedChange={setIsPublished}
          id="published"
        />
        <Label htmlFor="published">公開する</Label>
      </div>

      {/* 送信 */}
      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={saving} className="gap-2">
          {saving && <Loader2 className="size-4 animate-spin" />}
          {app ? "更新する" : "出品する"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/developer")}
        >
          キャンセル
        </Button>
      </div>
    </form>
  );
}
