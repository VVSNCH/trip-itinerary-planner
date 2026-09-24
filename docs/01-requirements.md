# Requirements — Trip Itinerary Planner (Project F1)

Version 0.1 · Draft for review

## 1. Purpose

A single-page React application for planning multi-day trips. The user adds
places to days, reorders them by dragging, and sees the resulting route on a
map. The itinerary can be shared as a read-only link.

This document is the testable checklist. Business rationale lives in the BRD,
user-facing behaviour in the PRD.

## 2. Scope

### In scope
- Creating, editing and deleting trips
- Day-by-day itinerary building
- Place search and selection
- Drag-and-drop reordering within and across days
- Map rendering with route polylines
- Read-only share links
- Responsive layout, mobile through desktop

### Out of scope
- User accounts, login, signup
- Real-time collaboration or multi-user editing
- Bookings, pricing, or availability of any kind
- Offline mode beyond what localStorage gives for free
- Native mobile applications

## 3. Locked technical constraints

These are decided and not open for revisit during implementation.

| Area | Decision |
|---|---|
| Build | Vite, React, TypeScript (strict), React Router |
| Component library | MUI, used strictly — no hand-rolled equivalents of MUI primitives |
| Styling | styled-components for all custom styling; MUI stays on its default Emotion engine |
| Drag and drop | react-dnd with the HTML5 and Touch backends |
| Map | Leaflet with OpenStreetMap tiles |
| Place search | Nominatim |
| Routing lines | OSRM public API |
| Persistence | Browser localStorage |
| Sharing | Itinerary encoded into the URL, compressed |
| State | React Context plus useReducer — no Redux |
| Deployment | Static build on Netlify or Vercel |
| Configuration | `.env` for provider URLs and contact string, no secrets |

Note: MUI renders through Emotion, styled-components is used for everything
else. Two style runtimes coexist by design; a single shared theme object feeds
both so colours and spacing never drift apart.

## 4. Functional requirements

### FR-1 Trip management
- FR-1.1 The user can create a trip with a name, start date and end date.
- FR-1.2 Days are derived from the date range, not entered manually.
- FR-1.3 The user can rename a trip or change its dates after creation.
- FR-1.4 Changing dates to a shorter range warns before discarding orphaned days.
- FR-1.5 The user can delete a trip, with confirmation.
- FR-1.6 All trips are listed on a home screen with name, dates and place count.

### FR-2 Place search
- FR-2.1 The user can search places by free text.
- FR-2.2 Results show name, category and address.
- FR-2.3 Search input is debounced to respect the provider's rate limit.
- FR-2.4 Selecting a result adds the place to the currently active day.
- FR-2.5 Empty results, provider errors and offline state each show a distinct message.

### FR-3 Itinerary building
- FR-3.1 Each day holds an ordered list of places.
- FR-3.2 The user can reorder places within a day by dragging.
- FR-3.3 The user can drag a place from one day to another.
- FR-3.4 The user can remove a place from a day.
- FR-3.5 The user can attach a note and a time to any place.
- FR-3.6 A day with no places shows an empty state that also acts as a drop target.

### FR-4 Map
- FR-4.1 Places in the active day render as numbered markers.
- FR-4.2 Markers are connected in itinerary order by a route polyline.
- FR-4.3 The map fits its bounds to the active day when that day changes.
- FR-4.4 Selecting a marker highlights the corresponding list item, and the reverse.
- FR-4.5 Reordering the list redraws the route.
- FR-4.6 A failed route request falls back to straight lines between points.

### FR-5 Timeline view
- FR-5.1 A timeline shows all days of the trip side by side.
- FR-5.2 Each day shows its place count and a total estimated duration.
- FR-5.3 Selecting a day from the timeline makes it active.

### FR-6 Sharing
- FR-6.1 The user can generate a read-only link for a trip.
- FR-6.2 Opening a share link renders the itinerary without edit controls.
- FR-6.3 A viewer can copy a shared trip into their own local trips.
- FR-6.4 A malformed or truncated share link shows a clear error, never a blank screen.

### FR-7 Persistence
- FR-7.1 All changes persist to localStorage without an explicit save action.
- FR-7.2 Writes are debounced rather than fired on every keystroke or drag frame.
- FR-7.3 Stored data carries a schema version.
- FR-7.4 Unreadable or corrupt stored data is discarded safely rather than crashing the app.

## 5. Non-functional requirements

### NFR-1 Responsiveness
- NFR-1.1 Supported from 360px width upward.
- NFR-1.2 Desktop shows the itinerary list and map side by side.
- NFR-1.3 Mobile shows one at a time, switched by a toggle or bottom sheet.
- NFR-1.4 All MUI breakpoints used through the theme, never hardcoded pixel media queries.

### NFR-2 Accessibility
- NFR-2.1 Every drag interaction has a keyboard equivalent.
- NFR-2.2 Colour is never the only carrier of meaning.
- NFR-2.3 Interactive elements are reachable and visibly focused by keyboard.
- NFR-2.4 Animation respects prefers-reduced-motion.

### NFR-3 Performance
- NFR-3.1 Dragging stays smooth with 30 places in a day.
- NFR-3.2 The map does not re-render the whole layer set on every list change.
- NFR-3.3 Route requests are cancelled when superseded.
- NFR-3.4 Production bundle target under 400KB gzipped excluding map tiles.

### NFR-4 Code quality
- NFR-4.1 No magic values in components; all constants come from a constants module.
- NFR-4.2 Comments only where the reason is not obvious from the code.
- NFR-4.3 Consistent folder structure, documented in the tech spec.
- NFR-4.4 ESLint and Prettier enforced, no warnings on main.
- NFR-4.5 TypeScript strict mode. No use of `any` anywhere in the codebase.
- NFR-4.6 Typecheck, lint and build all pass at all times.
- NFR-4.7 All UI is built from a shared set of common components. Pages and
  features never import MUI directly or define their own UI primitives.
- NFR-4.8 Colours, fonts, spacing, radii, shadows and z-index are each defined
  once, in dedicated style files. No component contains a literal visual value.

### NFR-5 Resilience
- NFR-5.1 A failure of any external provider degrades one feature, never the app.
- NFR-5.2 Network calls have timeouts.
- NFR-5.3 An error boundary wraps the map and the search panel independently.

## 6. Assumptions

- Third-party usage policies for Nominatim and OSRM are respected at demo
  traffic levels; a custom user-agent header and client-side caching are used.
- The client evaluates the project on a live URL and the repository, not on
  sustained production traffic.
- No real user data is collected, so no privacy or consent surface is required.

## 7. Open questions

- Is a trip cover image wanted, or is text-only sufficient?
- Should the share link expire or be permanent by construction?
- Does the client want branding applied, or a neutral theme?

## 8. Related

Project B1 (Uptime Monitor, full-stack) follows this project. The folder
structure, constants convention, theme approach and styled-components patterns
established here are reused in its React dashboard so both repositories read as
the work of one engineer.
