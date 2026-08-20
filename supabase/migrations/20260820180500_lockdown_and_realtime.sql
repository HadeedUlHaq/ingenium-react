-- v3 lockdown: move all writes server-side (staff auth via signed cookie +
-- rate-limited passcode), and fix realtime for the New Event reset.
--
-- TRUNCATE emits no row-level replication events, so with client-side
-- polling removed, screens relying on Realtime alone would never see a
-- reset. Switch to DELETE (which does emit per-row events) plus an
-- explicit identity restart.

create or replace function public.reset_event()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.orders;
  alter table public.orders alter column ticket_number restart with 1;
end;
$$;

-- Only the server (service role, via /api/staff/reset) may call this now.
revoke execute on function public.reset_event() from anon;

-- Anon may still read - the status page and every staff screen subscribe
-- via the anon client so Realtime works - but writes move behind
-- server-side staff auth.
drop policy if exists "anon can insert orders" on public.orders;
drop policy if exists "anon can update orders" on public.orders;

-- DELETE and UPDATE events need the full row for reliable filtered
-- subscriptions (the status page listens with filter: id=eq.<orderId>).
alter table public.orders replica identity full;

-- Failed-login tracking for rate limiting. RLS enabled with no policies at
-- all: only the service-role key (which bypasses RLS) can touch this table.
create table public.staff_auth_attempts (
  id bigint generated always as identity primary key,
  ip text not null,
  attempted_at timestamptz not null default now(),
  success boolean not null
);

alter table public.staff_auth_attempts enable row level security;

create index staff_auth_attempts_ip_time_idx
  on public.staff_auth_attempts (ip, attempted_at desc);
