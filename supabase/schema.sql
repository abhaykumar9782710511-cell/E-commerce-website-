create extension if not exists pgcrypto;

create table if not exists public.profiles (id uuid primary key references auth.users(id) on delete cascade, full_name text, phone text, role text not null default 'customer' check (role in ('customer','admin')), created_at timestamptz default now());
create table if not exists public.categories (id uuid primary key default gen_random_uuid(), name text not null, slug text unique not null, created_at timestamptz default now());
create table if not exists public.products (id uuid primary key default gen_random_uuid(), category_id uuid references public.categories(id) on delete set null, name text not null, slug text unique not null, description text default '', price numeric(10,2) not null default 0, compare_price numeric(10,2), sku text unique, stock integer not null default 0, image_url text, published boolean not null default true, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists public.product_variants (id uuid primary key default gen_random_uuid(), product_id uuid not null references public.products(id) on delete cascade, name text not null, value text not null, stock integer not null default 0, price numeric(10,2));
create table if not exists public.addresses (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, name text not null, phone text not null, line1 text not null, city text not null, state text not null, pincode text not null, created_at timestamptz default now());
create table if not exists public.orders (id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete set null, order_number text unique not null, status text not null default 'pending' check (status in ('pending','confirmed','packed','shipped','delivered','cancelled')), payment_status text not null default 'pending' check (payment_status in ('pending','paid','failed','cod')), payment_id text, subtotal numeric(10,2) not null default 0, shipping numeric(10,2) not null default 0, total numeric(10,2) not null default 0, address jsonb not null, created_at timestamptz default now());
create table if not exists public.order_items (id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id) on delete cascade, product_id uuid references public.products(id) on delete set null, product_name text not null, quantity integer not null, price numeric(10,2) not null, variant text);
create table if not exists public.coupons (id uuid primary key default gen_random_uuid(), code text unique not null, discount_percent numeric(5,2), discount_amount numeric(10,2), min_order numeric(10,2) default 0, active boolean default true, expires_at timestamptz);

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.coupons enable row level security;

create policy "public can view published products" on public.products for select using (published = true);
create policy "public can view categories" on public.categories for select using (true);
create policy "public can view variants" on public.product_variants for select using (exists(select 1 from public.products p where p.id=product_id and p.published=true));
create policy "users view own profile" on public.profiles for select using (auth.uid()=id);
create policy "users update own profile" on public.profiles for update using (auth.uid()=id);
create policy "users view own addresses" on public.addresses for select using (auth.uid()=user_id);
create policy "users manage own addresses" on public.addresses for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "users view own orders" on public.orders for select using (auth.uid()=user_id);
create policy "users view own order items" on public.order_items for select using (exists(select 1 from public.orders o where o.id=order_id and o.user_id=auth.uid()));

insert into public.categories(name,slug) values ('Krishna Ji Vastra','krishna-ji-vastra'),('Laddu Gopal','laddu-gopal'),('Shringar Sets','shringar-sets') on conflict (slug) do nothing;
