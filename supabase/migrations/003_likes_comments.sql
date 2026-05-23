-- アプリいいね
create table app_likes (
  id uuid primary key default gen_random_uuid(),
  app_slug text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(app_slug, user_id)
);

alter table app_likes enable row level security;
create policy "Anyone can read app_likes" on app_likes for select using (true);
create policy "Auth users can insert own app_likes" on app_likes for insert with check (auth.uid() = user_id);
create policy "Auth users can delete own app_likes" on app_likes for delete using (auth.uid() = user_id);

-- コメント
create table app_comments (
  id uuid primary key default gen_random_uuid(),
  app_slug text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  parent_id uuid references app_comments(id) on delete cascade,
  nickname text not null,
  body text not null,
  created_at timestamptz default now()
);

alter table app_comments enable row level security;
create policy "Anyone can read app_comments" on app_comments for select using (true);
create policy "Auth users can insert own app_comments" on app_comments for insert with check (auth.uid() = user_id);
create policy "Auth users can delete own app_comments" on app_comments for delete using (auth.uid() = user_id);

-- コメントいいね
create table comment_likes (
  id uuid primary key default gen_random_uuid(),
  comment_id uuid not null references app_comments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(comment_id, user_id)
);

alter table comment_likes enable row level security;
create policy "Anyone can read comment_likes" on comment_likes for select using (true);
create policy "Auth users can insert own comment_likes" on comment_likes for insert with check (auth.uid() = user_id);
create policy "Auth users can delete own comment_likes" on comment_likes for delete using (auth.uid() = user_id);

-- インデックス
create index idx_app_likes_slug on app_likes(app_slug);
create index idx_app_comments_slug on app_comments(app_slug);
create index idx_app_comments_parent on app_comments(parent_id);
create index idx_comment_likes_comment on comment_likes(comment_id);
