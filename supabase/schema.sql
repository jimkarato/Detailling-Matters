-- DETAIL MATTERS: booking request storage
-- Run this in Supabase SQL Editor. Keep the service-role key server-side only.
create extension if not exists pgcrypto;

create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null check (char_length(customer_name) between 2 and 120),
  phone text not null check (char_length(phone) between 8 and 30),
  email text,
  vehicle_type text not null,
  vehicle_model text,
  services text[] not null check (cardinality(services) > 0),
  preferred_date date,
  notes text,
  status text not null default 'pending' check (status in ('pending','confirmed','completed','cancelled','quote_requested'))
);

alter table public.booking_requests enable row level security;

-- No public SELECT/UPDATE/DELETE policies are intentionally created.
-- Public requests are inserted only by the server API using the service role key.
-- The service role key bypasses RLS and must never be exposed in client-side code.
revoke all on public.booking_requests from anon, authenticated;
grant all on public.booking_requests to service_role;

create index if not exists booking_requests_created_at_idx on public.booking_requests (created_at desc);
create index if not exists booking_requests_status_idx on public.booking_requests (status);
