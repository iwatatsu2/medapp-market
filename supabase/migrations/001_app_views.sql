-- アプリのアクセス数を管理するテーブル
create table if not exists app_views (
  slug text primary key,
  view_count bigint not null default 0
);

-- Row Level Security
alter table app_views enable row level security;

-- 誰でも読める
create policy "Anyone can read app_views"
  on app_views for select
  using (true);

-- サービスロール or 認証ユーザーが更新可能
create policy "Authenticated users can upsert app_views"
  on app_views for insert
  with check (true);

create policy "Authenticated users can update app_views"
  on app_views for update
  using (true);

-- アトミックにインクリメントするRPC関数
create or replace function increment_view(app_slug text)
returns bigint
language plpgsql
as $$
declare
  new_count bigint;
begin
  insert into app_views (slug, view_count)
  values (app_slug, 1)
  on conflict (slug)
  do update set view_count = app_views.view_count + 1
  returning view_count into new_count;
  return new_count;
end;
$$;
