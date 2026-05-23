"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { CommentForm } from "./comment-form";
import { CommentItem } from "./comment-item";

interface Comment {
  id: string;
  app_slug: string;
  user_id: string;
  parent_id: string | null;
  nickname: string;
  body: string;
  created_at: string;
  like_count: number;
  liked: boolean;
}

interface CommentSectionProps {
  slug: string;
  currentUserId?: string;
}

export function CommentSection({ slug, currentUserId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/apps/${slug}/comments`)
      .then((r) => r.json())
      .then((d) => setComments(d.comments ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const topLevel = comments.filter((c) => !c.parent_id);
  const repliesMap = new Map<string, Comment[]>();
  for (const c of comments) {
    if (c.parent_id) {
      const arr = repliesMap.get(c.parent_id) ?? [];
      arr.push(c);
      repliesMap.set(c.parent_id, arr);
    }
  }

  function handleNewComment(c: Record<string, unknown>) {
    setComments((prev) => [...prev, c as Comment]);
  }

  function handleDeleted(id: string) {
    setComments((prev) => prev.filter((c) => c.id !== id && c.parent_id !== id));
    // API call
    fetch(`/api/comments/${id}`, { method: "DELETE" });
  }

  return (
    <div className="mt-8 border-t border-border pt-6">
      <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
        <MessageCircle className="size-5" />
        コメント
        {topLevel.length > 0 && (
          <span className="text-sm font-normal text-muted-foreground">({comments.length})</span>
        )}
      </h2>

      <div className="mt-4">
        <CommentForm slug={slug} onSubmitted={handleNewComment} />
      </div>

      {loading ? (
        <p className="mt-4 text-sm text-muted-foreground">読み込み中...</p>
      ) : topLevel.length > 0 ? (
        <div className="mt-6 space-y-4">
          {topLevel.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              replies={repliesMap.get(c.id) ?? []}
              slug={slug}
              currentUserId={currentUserId}
              onReplyAdded={handleNewComment}
              onDeleted={handleDeleted}
            />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">まだコメントはありません。最初のコメントを投稿しましょう！</p>
      )}
    </div>
  );
}
