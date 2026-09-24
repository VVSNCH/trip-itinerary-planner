# Implementation Plan — Trip Itinerary Planner

Version 0.1 · Draft for review

Ten phases. Each is independently demoable and leaves the application
working. Estimates assume 8-10 hours per week.

---

## Phase 0 — Foundation
**~2 hours · demoable: an empty app deploys**

- Scaffold Vite React TypeScript app
- Add strict tsconfig and domain types
- Add ESLint, Prettier and editorconfig
- Add folder skeleton and constants module
- Add requirements, BRD, PRD, system design and tech spec
- Deploy to Netlify on push to main

Every phase below ends with typecheck, lint and build passing. A phase that
does not compile is not finished, regardless of how it looks in the browser.

Deploying on day one, before there is anything to deploy, means deployment is
never a phase-ten surprise. Exit: a public URL showing a blank shell.

---

## Phase 1 — Theme and shell
**~8 hours · demoable: navigable empty screens**

- Add colour, typography, spacing, radii, shadow and z-index style files
- Add design tokens and MUI theme
- Wire MUI and styled-components theme providers
- Add global styles and font loading
- Add common components: button, icon button, text, text field
- Add common components: card, chip, dialog, confirm dialog, sheet
- Add common components: menu, tooltip, toggle group, tabs, toast, skeleton
- Restrict MUI imports to components and theme
- Add app layout with header and responsive container
- Add router with trips, planner, timeline, shared and 404 routes
- Add feedback components for empty, loading and error states

The style files and common components come before any screen. Everything
built after this phase uses them, so a screen is put together from existing
parts instead of each one inventing its own buttons and colours.

`SearchField` and `DateRangeField` are added in Phases 4 and 3, where they are
first needed. They still go into `components/common/`.

Exit: every route renders its own empty state, on phone and desktop, built
only from common components. No data yet.

---

## Phase 2 — Trip state and storage
**~5 hours · demoable: create a trip, refresh, it survives**

- Add trip reducer with create, update and delete
- Add trip context provider
- Add localStorage service with schema versioning
- Persist trips with debounced writes
- Tests: trip reducer and corrupt storage recovery

The reducer is tested before any UI depends on it. A bug here is invisible and
appears three phases later as "my trip disappeared."

Exit: trips created through a temporary form persist across reloads.

---

## Phase 3 — Trips home screen
**~5 hours · demoable: the first real screen**

- Add trip card and trips grid
- Add create trip dialog with date range
- Derive days from trip date range
- Add rename, re-date and delete with confirmation
- Add trips empty state with sample trip

Exit: S-1 from the PRD, complete and responsive.

---

## Phase 4 — Place search
**~6 hours · demoable: search a real place, add it to a day**

- Add HTTP service with timeout and typed errors
- Add Nominatim place search service
- Add debounced search hook with request cancellation
- Add search panel with results list
- Cache search results per query
- Handle rate limit, empty and offline states

First contact with a service you do not control. Failure handling is built here
rather than retrofitted.

Exit: S-3 from the PRD. Places land in the active day's list.

---

## Phase 5 — Itinerary list
**~5 hours · demoable: a real day plan, no dragging yet**

- Add day selector strip
- Add place card with time, note and remove
- Add itinerary panel with ordered place list
- Move active day and place selection into URL params
- Add place detail expansion

Selection moves to the URL now, before drag-and-drop depends on it. Retrofitting
URL state after the fact is a rewrite.

Exit: a full day can be built and edited by clicking.

---

## Phase 6 — Drag and drop
**~8 hours · demoable: the headline interaction**

- Add react-dnd provider with HTML5 and touch backend selection
- Add place drag source
- Add place drop target with index calculation
- Reorder places within a day
- Move places between days
- Make empty days valid drop targets
- Add keyboard reordering with live region announcements
- Tests: MOVE_PLACE across days

The largest phase, sequenced after the list is stable so a drag bug is
unambiguously a drag bug. Keyboard support is in this phase, not deferred —
deferred accessibility is abandoned accessibility.

Exit: FR-3 complete, working with mouse, touch and keyboard.

---

## Phase 7 — Map
**~7 hours · demoable: the plan becomes geography**

- Add Leaflet map with OSM tiles
- Render numbered markers for the active day
- Add OSRM route service with coordinate caching
- Draw route polyline in itinerary order
- Fall back to straight lines when routing fails
- Sync marker and list selection both ways
- Fit bounds on day change with eased transition
- Memoise map subtree against list re-renders

Exit: FR-4 complete. Reordering redraws the route.

---

## Phase 8 — Timeline and sharing
**~6 hours · demoable: send the trip to someone**

- Add timeline view with per-day summaries
- Add trip encode and decode with compression
- Add share dialog with copy link and size warning
- Add read-only shared trip route
- Import a shared trip into local trips
- Tests: share round-trip and malformed payloads

Exit: FR-5 and FR-6 complete. A link opens on another device with no account.

---

## Phase 9 — Motion, polish and accessibility
**~7 hours · demoable: it stops feeling like a prototype**

- Add motion constants and reduced-motion guard
- Animate list reorder, card entry and marker drop
- Add skeleton loaders matching final layout
- Add error boundaries around map, search and route outlet
- Keyboard focus order and visible focus rings
- Responsive layout at 360px
- Audit bundle size and lazy-load the map route

Motion comes last on purpose. Animating an interaction you are still changing
means animating it twice.

Exit: all NFRs met.

---

## Phase 10 — Documentation and handover
**~3 hours**

- Write README with architecture and decisions
- Record what was deliberately excluded and why
- Add screenshots and live URL

The "deliberately excluded" section is not filler. It is the part that
distinguishes a considered project from an unfinished one.

---

## Schedule

| Week | Phases | Visible outcome |
|---|---|---|
| 1 | 0, 1, 2 | Deployed shell, trips persist |
| 2 | 3, 4 | Real screens, real place search |
| 3 | 5, 6 | Full drag-and-drop itinerary |
| 4 | 7, 8 | Map, routes, sharing |
| 5 | 9, 10 | Polished and documented |

Roughly five weeks at 8-10 hours, against a three-week estimate at full focus.

## Rules for the build

- The deployed application always works.
- A phase is not done until it works at 360px wide.
- No phase starts before the previous one is finished.
- Anything that feels missing goes to a `v2.md` list, not into the current
  phase. Scope creep is the only real risk to this schedule.

## Carry-forward to project B1

The theme setup, constants convention, folder structure, service layer pattern
and error-boundary approach are lifted directly into the uptime monitor's
dashboard. That project's frontend should take days, not weeks, because these
decisions will already have been made.
