"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function DeleteAppButton({ appId, appName }: { appId: string; appName: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    const supabase = createClient();
    const { error } = await supabase.from("apps").delete().eq("id", appId);
    if (!error) {
      router.refresh();
    }
    setDeleting(false);
    setConfirming(false);
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-red-500">削除しますか？</span>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? <Loader2 className="size-3.5 animate-spin" /> : "はい"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setConfirming(false)}
          disabled={deleting}
        >
          いいえ
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setConfirming(true)}
      className="text-red-500 hover:text-red-600 hover:bg-red-50"
    >
      <Trash2 className="size-3.5" />
    </Button>
  );
}
