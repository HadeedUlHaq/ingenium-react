-- Hadeed Smash Burgers: orders table for the event ordering + KDS system.

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  ticket_number integer generated always as identity,
  customer_name text not null,
  quantity integer not null check (quantity between 1 and 99),
  status text not null default 'COOKING' check (status in ('COOKING', 'READY')),
  created_at timestamptz not null default now(),
  ready_at timestamptz
);

alter table public.orders enable row level security;

-- No auth at the event; anon key drives all three screens.
create policy "anon can read orders"
  on public.orders for select
  to anon
  using (true);

create policy "anon can insert orders"
  on public.orders for insert
  to anon
  with check (true);

create policy "anon can update orders"
  on public.orders for update
  to anon
  using (true);

alter publication supabase_realtime add table public.orders;

-- Recurring pop-ups: one action between events clears the queue and
-- restarts ticket numbers at #001.
create function public.reset_event()
returns void
language sql
security definer
set search_path = public
as $$
  truncate table public.orders restart identity;
$$;

grant execute on function public.reset_event() to anon;
