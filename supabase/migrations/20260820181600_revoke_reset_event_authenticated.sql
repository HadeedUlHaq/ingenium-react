-- Supabase's default schema privileges grant EXECUTE on new public-schema
-- functions to `authenticated` as well as `anon`. This app has no signup
-- or login flow, so `authenticated` is unreachable in practice - revoked
-- anyway for defense in depth. Only postgres (owner) and service_role
-- (used by /api/staff/reset) may call reset_event() now.

revoke execute on function public.reset_event() from authenticated;
