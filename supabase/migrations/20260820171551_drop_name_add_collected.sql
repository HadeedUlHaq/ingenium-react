-- Drop the customer name field (ticket number alone identifies an order)
-- and add a COLLECTED status so the order taker can clear picked-up
-- tickets without losing the FIFO history.

alter table public.orders drop column if exists customer_name;

-- Widen the status check to include the handover step. The constraint's
-- name isn't assumed - find and drop whatever check constraint governs
-- the status column, then add the replacement.
do $$
declare
  con record;
begin
  for con in
    select conname
    from pg_constraint
    where conrelid = 'public.orders'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) ilike '%status%'
  loop
    execute format('alter table public.orders drop constraint %I', con.conname);
  end loop;
end $$;

alter table public.orders
  add constraint orders_status_check
  check (status in ('COOKING', 'READY', 'COLLECTED'));

alter table public.orders add column if not exists collected_at timestamptz;
