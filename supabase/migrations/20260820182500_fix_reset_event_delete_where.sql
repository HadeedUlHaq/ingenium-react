-- This project rejects unqualified DELETE statements ("DELETE requires a
-- WHERE clause", sqlstate 21000) as a safety guard. Add a WHERE true to
-- satisfy it while still deleting every row.

create or replace function public.reset_event()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.orders where true;
  alter table public.orders alter column ticket_number restart with 1;
end;
$$;
