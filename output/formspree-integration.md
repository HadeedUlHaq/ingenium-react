# Formspree event enquiries

The public React booking form submits directly to
`https://formspree.io/f/xkjojjrw` using POST, FormData and an
`Accept: application/json` header. Existing React loading, success and
error UI is retained; no additional dependency or API key is needed.
The form also includes action/method attributes for native submission.

All existing named fields are sent. Venue checkboxes are normalized to
Yes/No, and the hidden subject is Iron Burger event inquiry. Submission
errors preserve entered details; successful submissions reset the form.

New enquiries are handled by Formspree, not saved through the old
Supabase /api/inquiries route. That route and staff history are retained.
To synchronize future Formspree submissions to the staff list would
require a separate integration.

Deploy the changes to Vercel. Confirm the form's notification recipient
is verified and any domain restriction permits ironburger.uk (and
wesbite.online if it still directly serves the form). Configure spam/
CAPTCHA protection in Formspree as desired. No live submission was sent
during implementation; inbox delivery still needs a real smoke test.

Reference: https://formspree.io/blog/formspree-ajax/

Verification: pnpm typecheck and browser test output/verify-formspree.cjs.
The browser test intercepts Formspree requests and covers field payload,
required validation, checkbox values, API and network failures, retries,
success and reset. It also verifies removal of Representative stock
photography from the gallery subtitle.
