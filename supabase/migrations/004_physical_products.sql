-- 物理商品テーブル
create table products (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid references auth.users not null,
  slug text unique not null,
  name text not null,
  description text,
  price integer not null,
  tax_rate integer default 10,
  shipping_fee integer default 0,
  stock integer default 0,
  thumbnail_url text,
  images text[] default '{}',
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 注文テーブル
create table orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  user_id uuid references auth.users not null,
  product_id uuid references products not null,
  quantity integer default 1,
  subtotal integer not null,
  tax_amount integer not null,
  shipping_fee integer not null,
  total integer not null,
  stripe_session_id text,
  status text default 'pending',
  tracking_number text,
  shipped_at timestamptz,
  shipping_name text,
  shipping_postal_code text,
  shipping_address text,
  shipping_phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table products enable row level security;
alter table orders enable row level security;

-- products policies
create policy "Public can view published products" on products
  for select using (is_published = true);
create policy "Sellers can view own products" on products
  for select using (auth.uid() = seller_id);
create policy "Sellers can insert own products" on products
  for insert with check (auth.uid() = seller_id);
create policy "Sellers can update own products" on products
  for update using (auth.uid() = seller_id);
create policy "Sellers can delete own products" on products
  for delete using (auth.uid() = seller_id);

-- orders policies
create policy "Users can view own orders" on orders
  for select using (auth.uid() = user_id);
create policy "Sellers can view orders for their products" on orders
  for select using (
    exists (select 1 from products where products.id = orders.product_id and products.seller_id = auth.uid())
  );
create policy "Sellers can update orders for their products" on orders
  for update using (
    exists (select 1 from products where products.id = orders.product_id and products.seller_id = auth.uid())
  );
