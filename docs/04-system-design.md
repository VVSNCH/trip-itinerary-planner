# System Design — Trip Itinerary Planner

Version 0.1 · Draft for review

## 1. Shape of the system

There is no server. The browser is the whole system: it holds the data, runs
the logic, and talks directly to three public read-only services.

```
                    ┌──────────────────────────────┐
                    │          Browser             │
                    │                              │
  user ───────────► │  React SPA                   │
                    │   ├─ TripContext (reducer)   │
                    │   ├─ feature modules         │
                    │   └─ service layer           │
                    │            │                 │
                    │            ├──► localStorage │
                    └────────────┼─────────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              ▼                  ▼                  ▼
        Nominatim            OSRM              OSM tiles
      (place search)    (route geometry)     (map imagery)
```

The consequence worth stating plainly: every external dependency is optional.
Lose all three and the user can still open a trip, reorder a day, and read what
they planned. This is deliberate, and it is the same instinct behind project B1.

## 2. Data model

One trip is one self-contained document. There are no relations to resolve and
no normalisation, because nothing is shared between trips.

Declared once in `src/types/trip.ts` and imported everywhere. Dates and times
are ISO strings, not `Date` objects, because these are serialised to
localStorage and into share links — a `Date` does not survive a JSON round trip.

```ts
interface Place {
  id: number
  name: string
  address: string
  category: string
  lat: number
  lng: number
  time: string | null          // HH:mm
  note: string | null
  durationMins: number | null
}

interface Day {
  id: number
  date: string                 // ISO date
  places: Place[]
}

interface Trip {
  id: number
  name: string
  startDate: string            // ISO date
  endDate: string              // ISO date
  days: Day[]
  createdAt: string            // ISO timestamp
  updatedAt: string            // ISO timestamp
}
```

Order is the array index. This is the entire reason drag-and-drop is cheap
here: reordering is an array move, not a rewrite of sort keys across records.

### Identifiers

Ids are sequential integers starting at 1, not generated strings. Each id is
unique within its own scope:

| Entity | Scope of uniqueness | Next id |
|---|---|---|
| Trip | All trips in this browser | max id across trips, plus one |
| Day | Within its trip | assigned once, when days are derived from the date range |
| Place | Within its trip | max id across all days of that trip, plus one |

The next id is computed from the existing data at insert time, never held in a
module variable. A counter in memory resets on reload and starts handing out
ids that already exist; deriving it from the data cannot.

Ids are never reused after a delete. Deleting trip 3 and creating another gives
4, because max-plus-one reads the highest id, not the count.

Importing a shared trip is the only case where two id spaces meet. It is safe
because the incoming trip is given a fresh local trip id, and its day and place
ids are only ever meaningful inside that trip.

This removes the need for an id-generation dependency entirely, and makes the
stored JSON readable when debugging.

### Storage shape

```
localStorage["tip.schemaVersion"]  "1"
localStorage["tip.trips"]          Trip[] as JSON
```

A version key exists from day one. Reading data written by an older schema is a
migration, and a migration you did not plan for is a crash. Unknown or
unparseable data is discarded with a notice rather than thrown at the renderer.

## 3. State management

Three tiers, each with a different lifetime. Mixing them is the usual cause of
unexplainable React bugs.

| Tier | Holds | Lives in |
|---|---|---|
| Persistent | Trips, days, places | TripContext reducer, mirrored to localStorage |
| Session | Selected day, selected place, panel open state | URL search params |
| Ephemeral | Drag in progress, search text, hover target | Local component state |

Putting selection in the URL rather than in state is the single highest-value
decision in this document. It makes every view shareable, refresh-safe and
back-button-correct, and it removes a whole category of state-sync bug at no
cost.

### Why reducer and not Redux

Every mutation is a small, well-named change to one trip: add a place, move a
place, rename a trip. That is precisely what a reducer is. Redux adds a store,
middleware and boilerplate to solve problems this application does not have —
no cross-tab sync, no server cache, no time travel requirement.

Analogy: a reducer is a light switch, Redux is a building management system.
Both turn the light on.

## 4. The drag-and-drop model

react-dnd separates three roles: what is dragged, what accepts it, and what
happens on drop. Two drag types exist:

- `PLACE` — a place card, draggable within a day and across days
- `DAY` — a day column in the timeline, reserved for v2

Drop targets:
- A place card, which reorders by index
- A day container, which accepts a place appended to the end
- An empty day, which is a drop target in its own right so empty days are not dead

State during a drag lives in the component, not in the context. A drag
committing to global state on every hover frame would re-render the map sixty
times a second. The reducer is notified once, on drop.

Backends: HTML5Backend on pointer devices, TouchBackend on touch. Detected
once at startup. A keyboard path exists separately — move up, move down, move
to day — operating on the same reducer actions, because an interaction that
only works with a mouse is an interaction half the users cannot perform.

## 5. Map synchronisation

The map is a controlled surface driven by three inputs: the active day's
places, the selected place, and the route geometry.

- Markers derive from places. Keyed by place id so reordering relabels rather
  than rebuilds them.
- Route geometry is fetched from OSRM when the ordered coordinate list changes,
  and only then. Requests are debounced and superseded ones aborted.
- Bounds fitting runs when the active day changes, not on every place change,
  so adding a place does not yank the viewport away from the user.

Failure path: OSRM unavailable means a straight polyline between points, with a
quiet note in the UI. The feature degrades, the app does not.

## 6. Sharing

A share link carries the trip in the URL fragment:

```
/shared#<base64url(deflate(JSON(trip)))>
```

The fragment, not the query string, because a fragment is never sent to the
host in a request. Nothing about the user's trip reaches any server, which is
what makes "no accounts, no data collected" literally true rather than a claim.

Compression matters: a ten-place trip is roughly 3KB of JSON, around 900 bytes
compressed and encoded. Above a measured ceiling the UI warns that the link may
be truncated by some clients rather than producing a link that silently fails.

## 7. External services

All three are part of the OpenStreetMap ecosystem — community-maintained,
free, and read from the same underlying map database. OSM tiles are the map
imagery, Nominatim searches OSM data by name, OSRM computes routes over OSM
roads. Free means donated infrastructure, which is why each has a defined
failure path rather than an assumption of availability.

| Service | Used for | Failure mode | Mitigation |
|---|---|---|---|
| Nominatim | Place search | Rate limit, 429 | Debounce at 500ms, cache results per query, show a clear message |
| OSRM | Route geometry | Timeout, 5xx | Straight-line fallback, request cancellation |
| OSM tiles | Map imagery | Slow or missing tiles | Leaflet's own tile handling, neutral background |

All three are wrapped behind a service module. No component calls fetch
directly. Swapping Nominatim for Mapbox later touches one file.

## 8. Rendering and performance

- The map subtree is memoised against itinerary list re-renders.
- Place lists are plain arrays; virtualisation is unnecessary below a few
  hundred items and is not included.
- Route responses are cached by the hash of the ordered coordinate list, so
  dragging a place out and back does not refetch.
- Motion uses transform and opacity only, so it stays off the layout path.

## 9. Error containment

Three independent error boundaries: the map, the search panel, and the route
shell. A failure in one renders a local fallback with a retry, and the rest of
the application continues. A single top-level boundary would mean a broken tile
layer blanks the user's itinerary, which is the opposite of what the user needs
at that moment.

## 10. What this design deliberately does not have

No server, no database, no authentication, no service worker, no state
management library, no virtualisation, no SSR, no test of the map provider
behind an abstraction layer for a second provider that does not exist.

Each is listed so a reader can tell the difference between a decision and an
oversight.
