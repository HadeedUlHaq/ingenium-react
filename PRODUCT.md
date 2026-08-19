# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three users, all on phones, all mid-event under time pressure:

- **Order taker** (stall staff, likely Hadeed or a helper): standing at the front of a pop-up stall taking rapid-fire orders. Needs to capture name + quantity in seconds, one-handed, and get straight to the next customer.
- **Kitchen cook** at the grill: glances at a phone propped near the smash griddle. Hands are greasy/busy; reads at arm's length; taps rarely (only "mark ready"). Needs FIFO order queue and wait-time pressure at a glance.
- **Customer**: scanned a QR at the stall, waiting nearby with their phone open. Wants one thing: to know the moment their order is ready, without refreshing.

## Product Purpose

A real-time ordering and kitchen display system for the Hadeed Smash Burgers pop-up stall. Replaces shouting names and paper tickets: orders flow from the front of the stall to the kitchen instantly, customers self-monitor status via QR, and the kitchen works a strict first-in-first-out queue with visible wait times. Success = shorter perceived waits, no lost orders, no one shouting "order for Ahmed?!" into a crowd.

## Positioning

Purpose-built for a one-person-scale pop-up: zero login, zero config at the event, works entirely on phones over event Wi-Fi/hotspot. Not a POS — no payments, no menus, no inventory. One item (smash burgers), one queue, three screens.

## Operating Context

- Recurring pop-up events; the system is reset between events (orders cleared, ticket numbers restart at #001).
- All screens run in mobile browsers on phones — including the kitchen display. No dedicated tablets or laptops.
- Connectivity is event-grade (hotspot/venue Wi-Fi): real-time updates must degrade gracefully to polling.
- Outdoor/variable lighting: high contrast is a functional requirement, not a style choice.
- Two order paths at the counter: quick orders (1–3 burgers) get a spoken/shown ticket number; large orders get a QR code the customer scans to self-track.

## Capabilities and Constraints

- Stack: existing Next.js 16 (App Router) + Tailwind v4 + shadcn/ui repo with Supabase (Postgres + Realtime) wired and verified; anon-key browser client, no auth.
- Sequential 3-digit ticket numbers (#001…) assigned by the database; must restart per event.
- Order fields: customer name, burger quantity, status (COOKING → READY), timestamps. No pricing or payment.
- Kitchen queue is strict FIFO by creation time; > 10 minutes wait is an explicit alarm state (flashing red).
- Customer status page must update live (realtime + 5s polling) and alert with sound (Web Audio) + vibration on READY.
- Terminology: "ticket", "order", "smashed/on the grill", "ready for pickup".

## Brand Commitments

- Name: **Hadeed Smash Burgers** — appears on all three screens.
- No existing logo, colors, or visual assets; visual identity is open to be established.

## Evidence on Hand

- No real photography, logo files, testimonials, or menu assets exist yet. Nothing may be fabricated as if real; imagery must be illustrative/graphic rather than fake photos.

## Product Principles

1. **Speed at the counter beats everything** — the order form is optimized for repeat entry, not completeness.
2. **Glanceable from the grill** — kitchen info reads at arm's length on a phone: ticket number first, everything else second.
3. **The customer never asks "is it ready?"** — status reaches them (color, sound, vibration) without any action.
4. **Zero setup at the event** — open three URLs and start selling; reset takes one action between events.
5. **Degrade gracefully** — flaky Wi-Fi downgrades realtime to polling, never to a stale screen.
