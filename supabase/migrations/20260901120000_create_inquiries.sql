-- Public catering website: event booking inquiries.
-- RLS enabled with NO policies at all: only the service-role key (which
-- bypasses RLS) can read or write, via /api/inquiries. The `ip` column
-- exists purely for per-IP rate limiting in that route.

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  organization text,
  email text not null,
  phone text not null,
  event_date date,
  venue text,
  event_type text,
  burger_count text,
  outdoor_space boolean not null default false,
  parking_access boolean not null default false,
  notes text,
  ip text,
  status text not null default 'NEW'
);

alter table public.inquiries enable row level security;

create index inquiries_ip_time_idx on public.inquiries (ip, created_at desc);
