"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  slug: string;
}

export function LikeButton({ slug }: LikeButtonProps) {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/apps/${slug}/likes`)
      .then((r) => r.json())
      .then((d) => {
        setCount(d.count);
        setLiked(d.liked);
      })
      .catch(() => {});
  }, [slug]);

  async function toggle() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/apps/${slug}/likes`, { method: "POST" });
      if (res.status === 401) {
        window.location.href = `/auth/login?redirect=/apps/${slug}`;
        return;
      }
      const d = await res.json();
      setCount(d.count);
      setLiked(d.liked);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`flex items-center gap-2.5 rounded-full px-6 py-3 text-base font-bold shadow-sm transition-all hover:scale-105 ${
        liked
          ? "bg-red-50 border-2 border-red-300 text-red-500"
          : "bg-white border-2 border-border text-muted-foreground hover:border-red-200 hover:bg-red-50"
      }`}
    >
      <Heart
        className={`size-6 transition-colors ${liked ? "fill-red-500 text-red-500" : ""}`}
      />
      <span>いいね</span>
      <span className={`rounded-full px-2 py-0.5 text-sm ${liked ? "bg-red-100" : "bg-muted"}`}>
        {count}
      </span>
    </button>
  );
}
