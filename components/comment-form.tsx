"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface CommentFormProps {
  slug: string;
  parentId?: string;
  onSubmitted: (comment: Record<string, unknown>) => void;
  onCancel?: () => void;
  placeholder?: string;
}

export function CommentForm({ slug, parentId, onSubmitted, onCancel, placeholder }: CommentFormProps) {
  const [nickname, setNickname] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!nickname.trim() || !body.trim() || loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/apps/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: nickname.trim(), body: body.trim(), parent_id: parentId }),
      });
      if (res.status === 401) {
        window.location.href = `/auth/login?redirect=/apps/${slug}`;
        return;
      }
      const d = await res.json();
      if (d.comment) {
        onSubmitted(d.comment);
        setBody("");
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="ニックネーム"
        maxLength={50}
        className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
      <div className="flex gap-2">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={placeholder ?? "コメントを入力..."}
          maxLength={1000}
          rows={3}
          className="flex-1 rounded-lg border border-border px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={loading || !nickname.trim() || !body.trim()}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          <Send className="size-4" />
          送信
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            キャンセル
          </button>
        )}
      </div>
    </form>
  );
}
