"use client";

import { useEffect } from "react";

export function TrackView({ slug }: { slug: string }) {
  useEffect(() => {
    fetch("/api/apps/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then((d) => console.error("[TrackView] error:", d));
        }
      })
      .catch((e) => console.error("[TrackView] fetch failed:", e));
  }, [slug]);

  return null;
}
