"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { uploadAppImage } from "@/lib/upload";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ProductFormProps {
  product?: Product;
  userId: string;
}

export function ProductForm({ product, userId }: ProductFormProps) {
  const router = useRouter();
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price ?? 0);
  const [shippingFee, setShippingFee] = useState(product?.shipping_fee ?? 200);
  const [stock, setStock] = useState(product?.stock ?? 0);
  const [thumbnailUrl, setThumbnailUrl] = useState(product?.thumbnail_url ?? "");
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [isPublished, setIsPublished] = useState(product?.is_published ?? false);

  function slugify(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  async function handleThumbnailUpload(file: File) {
    const path = `products/${userId}/thumb-${Date.now()}.${file.name.split(".").pop()}`;
    const url = await uploadAppImage(file, path);
    setThumbnailUrl(url);
  }

  async function handleImagesUpload(files: FileList) {
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      if (images.length + newUrls.length >= 6) break;
      const path = `products/${userId}/img-${Date.now()}-${Math.random().toString(36).slice(2, 6)}.${file.name.split(".").pop()}`;
      const url = await uploadAppImage(file, path);
      newUrls.push(url);
    }
    setImages((prev) => [...prev, ...newUrls].slice(0, 6));
  }

  const taxIncluded = Math.floor(price * 1.1);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const supabase = createClient();
      const slug = product?.slug ?? (slugify(name) || `product-${Date.now()}`);

      const payload = {
        seller_id: userId,
        slug,
        name,
        description: description || null,
        price,
        tax_rate: 10,
        shipping_fee: shippingFee,
        stock,
        thumbnail_url: thumbnailUrl || null,
        images,
        is_published: isPublished,
      };

      if (product) {
        const { error: err } = await supabase
          .from("products")
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq("id", product.id);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from("products").insert(payload);
        if (err) throw err;
      }

      router.push("/dashboard/developer/products");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "保存に失敗しました");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">商品名 *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="例: インスリンミニチュアキーホルダー"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">商品説明</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          placeholder="商品の詳細な説明"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="price">税抜価格（円） *</Label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            min={1}
            step={1}
            required
          />
          <p className="text-xs text-muted-foreground">
            税込: ¥{taxIncluded.toLocaleString()}
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="shipping">送料（円）</Label>
          <Input
            id="shipping"
            type="number"
            value={shippingFee}
            onChange={(e) => setShippingFee(Number(e.target.value))}
            min={0}
            step={1}
          />
          <p className="text-xs text-muted-foreground">全国一律</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">在庫数 *</Label>
          <Input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            min={0}
            step={1}
            required
          />
        </div>
      </div>

      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="text-sm font-medium">お客様の支払い合計</p>
        <p className="mt-1 text-lg font-bold">
          ¥{(taxIncluded + shippingFee).toLocaleString()}
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            （税込 ¥{taxIncluded.toLocaleString()} + 送料 ¥{shippingFee.toLocaleString()}）
          </span>
        </p>
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
              height={320}
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
            className="flex h-40 w-40 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 hover:border-primary/50"
          >
            <div className="text-center">
              <ImagePlus className="mx-auto size-8 text-muted-foreground/50" />
              <p className="mt-1 text-xs text-muted-foreground">アップロード</p>
            </div>
          </button>
        )}
      </div>

      {/* 商品画像 */}
      <div className="space-y-2">
        <Label>商品画像（最大6枚）</Label>
        <input
          ref={imagesRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={async (e) => {
            if (e.target.files) await handleImagesUpload(e.target.files);
          }}
        />
        <div className="flex flex-wrap gap-3">
          {images.map((url, i) => (
            <div key={i} className="relative">
              <Image
                src={url}
                alt={`商品画像 ${i + 1}`}
                width={160}
                height={160}
                className="rounded-lg border object-cover"
              />
              <button
                type="button"
                onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))}
                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
          {images.length < 6 && (
            <button
              type="button"
              onClick={() => imagesRef.current?.click()}
              className="flex h-[160px] w-[160px] items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 hover:border-primary/50"
            >
              <ImagePlus className="size-6 text-muted-foreground/50" />
            </button>
          )}
        </div>
      </div>

      {/* 公開設定 */}
      <div className="space-y-2">
        <Label>公開設定 *</Label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setIsPublished(false)}
            className={`flex-1 rounded-xl border-2 p-4 text-center transition-all ${
              !isPublished
                ? "border-amber-500 bg-amber-50 shadow-md"
                : "border-muted bg-white hover:border-muted-foreground/30"
            }`}
          >
            <p className={`font-bold text-sm ${!isPublished ? "text-amber-700" : "text-muted-foreground"}`}>
              非公開
            </p>
          </button>
          <button
            type="button"
            onClick={() => setIsPublished(true)}
            className={`flex-1 rounded-xl border-2 p-4 text-center transition-all ${
              isPublished
                ? "border-green-500 bg-green-50 shadow-md"
                : "border-muted bg-white hover:border-muted-foreground/30"
            }`}
          >
            <p className={`font-bold text-sm ${isPublished ? "text-green-700" : "text-muted-foreground"}`}>
              公開する
            </p>
          </button>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={saving} className="gap-2">
          {saving && <Loader2 className="size-4 animate-spin" />}
          {product ? "更新する" : "登録する"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/developer/products")}
        >
          キャンセル
        </Button>
      </div>
    </form>
  );
}
