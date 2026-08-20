-- The previous migration revoked EXECUTE on reset_event() from `anon`
-- specifically, but CREATE FUNCTION grants EXECUTE to PUBLIC by default,
-- and a PUBLIC grant applies to every role regardless of a role-specific
-- revoke. anon could still call it. Revoke from PUBLIC itself.

revoke execute on function public.reset_event() from public;
grant execute on function public.reset_event() to service_role;
