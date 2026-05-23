"use client";

import { useState } from "react";
import { Heart, Reply, Trash2 } from "lucide-react";
import { CommentForm } from "./comment-form";

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

interface CommentItemProps {
  comment: Comment;
  replies: Comment[];
  slug: string;
  currentUserId?: string;
  onReplyAdded: (comment: Record<string, unknown>) => void;
  onDeleted: (id: string) => void;
}

export function CommentItem({ comment, replies, slug, currentUserId, onReplyAdded, onDeleted }: CommentItemProps) {
  const [likeCount, setLikeCount] = useState(comment.like_count);
  const [liked, setLiked] = useState(comment.liked);
  const [showReply, setShowReply] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  async function toggleLike() {
    if (likeLoading) return;
    setLikeLoading(true);
    try {
      const res = await fetch(`/api/comments/${comment.id}/likes`, { method: "POST" });
      if (res.status === 401) {
        window.location.href = `/auth/login?redirect=/apps/${slug}`;
        return;
      }
      const d = await res.json();
      setLikeCount(d.count);
      setLiked(d.liked);
    } catch {
      // ignore
    } finally {
      setLikeLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("このコメントを削除しますか？")) return;
    const res = await fetch(`/api/comments/${comment.id}`, { method: "DELETE" });
    if (res.ok) onDeleted(comment.id);
  }

  const isOwner = currentUserId === comment.user_id;
  const timeAgo = formatTimeAgo(comment.created_at);

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {comment.nickname.charAt(0)}
            </div>
            <span className="text-sm font-medium">{comment.nickname}</span>
            <span className="text-xs text-muted-foreground">{timeAgo}</span>
          </div>
          {isOwner && (
            <button onClick={handleDelete} className="text-muted-foreground hover:text-red-500">
              <Trash2 className="size-4" />
            </button>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-foreground whitespace-pre-wrap">{comment.body}</p>
        <div className="mt-3 flex items-center gap-4">
          <button
            onClick={toggleLike}
            disabled={likeLoading}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 transition-colors"
          >
            <Heart className={`size-3.5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            {likeCount > 0 && likeCount}
          </button>
          <button
            onClick={() => setShowReply(!showReply)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <Reply className="size-3.5" />
            返信
          </button>
        </div>
      </div>

      {/* 返信一覧 */}
      {replies.length > 0 && (
        <div className="ml-6 space-y-2">
          {replies.map((r) => (
            <div key={r.id} className="rounded-lg border border-border bg-slate-50 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {r.nickname.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">{r.nickname}</span>
                  <span className="text-xs text-muted-foreground">{formatTimeAgo(r.created_at)}</span>
                </div>
                {currentUserId === r.user_id && (
                  <button onClick={() => { if (confirm("削除しますか？")) onDeleted(r.id); }} className="text-muted-foreground hover:text-red-500">
                    <Trash2 className="size-3.5" />
                  </button>
                )}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground whitespace-pre-wrap">{r.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* 返信フォーム */}
      {showReply && (
        <div className="ml-6">
          <CommentForm
            slug={slug}
            parentId={comment.id}
            placeholder="返信を入力..."
            onSubmitted={(c) => {
              onReplyAdded(c);
              setShowReply(false);
            }}
            onCancel={() => setShowReply(false)}
          />
        </div>
      )}
    </div>
  );
}

function formatTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "たった今";
  if (minutes < 60) return `${minutes}分前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}時間前`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}日前`;
  return new Date(dateStr).toLocaleDateString("ja-JP");
}
