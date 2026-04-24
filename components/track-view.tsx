"use client";

import { useEffect } from "react";

export function TrackView({ slug }: { slug: string }) {
  useEffect(() => {
    fetch("/api/apps/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    }).catch(() => {});
  }, [slug]);

  return null;
}
