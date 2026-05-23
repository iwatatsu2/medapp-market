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
      className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-red-50"
    >
      <Heart
        className={`size-5 transition-colors ${liked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
      />
      <span className={liked ? "text-red-500" : "text-muted-foreground"}>
        {count}
      </span>
    </button>
  );
}
