# Technical Specification — Trip Itinerary Planner

Version 0.1 · Draft for review

## 1. Stack

| Concern | Choice |
|---|---|
| Build | Vite |
| Language | TypeScript, strict mode |
| UI library | React with React Router |
| Components | MUI |
| Custom styling | styled-components |
| Drag and drop | react-dnd, HTML5Backend and TouchBackend |
| Map | Leaflet via react-leaflet |
| Dates | date-fns |
| Compression | fflate |
| Lint and format | ESLint with typescript-eslint, Prettier |
| Tests | Vitest and React Testing Library |

Nothing else is installed without a reason recorded in the README.

## 2. Folder structure

```
trip-itinerary-planner/
├── docs/
├── public/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── routes/
│   │   ├── index.tsx                  route table
│   │   ├── TripsPage/
│   │   ├── PlannerPage/
│   │   ├── TimelinePage/
│   │   ├── SharedTripPage/
│   │   └── NotFoundPage/
│   ├── features/
│   │   ├── trips/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── utils/
│   │   ├── itinerary/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── dnd/
│   │   ├── places/
│   │   ├── map/
│   │   └── share/
│   ├── components/
│   │   ├── common/                    the only UI building blocks, see 3.2
│   │   ├── layout/
│   │   └── feedback/
│   ├── context/
│   │   ├── TripContext.ts
│   │   ├── TripProvider.tsx
│   │   ├── useTrips.ts
│   │   ├── usePersistTrips.ts
│   │   ├── tripReducer.ts
│   │   └── actions.ts
│   ├── hooks/
│   ├── services/
│   │   ├── storage.ts
│   │   ├── nominatim.ts
│   │   ├── osrm.ts
│   │   └── http.ts
│   ├── constants/
│   │   ├── index.ts
│   │   ├── routes.ts
│   │   ├── dndTypes.ts
│   │   ├── storageKeys.ts
│   │   ├── api.ts
│   │   ├── breakpoints.ts
│   │   ├── motion.ts
│   │   └── messages.ts
│   ├── types/
│   │   ├── trip.ts                    domain model
│   │   ├── styled.d.ts                styled-components theme augmentation
│   │   ├── env.d.ts                   import.meta.env typing
│   │   └── index.ts
│   ├── theme/
│   │   ├── colors.ts                  palette, the only place a colour is written
│   │   ├── typography.ts              font families, sizes, weights, line heights
│   │   ├── spacing.ts                 spacing scale
│   │   ├── radii.ts                   corner radii
│   │   ├── shadows.ts                 elevation
│   │   ├── zIndex.ts                  stacking order
│   │   ├── tokens.ts                  aggregates the files above
│   │   ├── theme.ts
│   │   ├── GlobalStyles.tsx
│   │   └── ThemeProviders.tsx
│   └── utils/
│       ├── nextId.ts
│       └── ...
├── .env.example
├── .eslintrc.cjs
├── .prettierrc
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Rules for where code goes

- Generic UI pieces (buttons, inputs, dialogs, cards, chips, text, feedback)
  live in `components/common/` from the start, even if only one screen uses
  them so far. Features never build their own.
- A domain component such as `PlaceCard` or `DaySelector` lives in its
  feature. It is put together from common components and adds no new visual
  primitives of its own. It moves to `components/` the second time another
  feature needs it.
- `routes/` holds thin page components: layout, data wiring, nothing else. No
  business logic in a route file.
- `services/` is the only place `fetch` appears. Components never call it.
- `constants/` holds every literal that appears more than once or carries
  meaning: keys, URLs, durations, drag types, breakpoints, user-facing strings.
- `utils/` is for pure functions only. Anything that touches React or the
  network does not belong there.

### Component file convention

```
PlaceCard/
├── PlaceCard.tsx           markup and behaviour
├── PlaceCard.styles.ts     styled-components
├── PlaceCard.types.ts      props interface, only when non-trivial
└── index.ts                re-export
```

Props are typed inline in the component file when short. A `.types.ts` sibling
appears only when the props outgrow a few lines or are shared.

Styles sit beside the component that uses them, never in a global stylesheet.
The `index.ts` exists so imports read `features/itinerary/components/PlaceCard`
rather than repeating the name.

## 3. Styling approach

MUI renders through Emotion. styled-components is used for everything custom.
Two runtimes coexist, and one shared token file feeds both so they cannot
drift.

The whole visual layer has two parts: the **style files** in `theme/`, and the
**common components** in `components/common/`. The application uses only
these. Nothing outside them defines a colour, a font, a size or a UI primitive.

### 3.1 Style files

Each concern has one file. A value that is not in one of these files does not
exist in the application.

| File | Holds |
|---|---|
| `theme/colors.ts` | The palette (brand, neutral, success, warning, error, map route and marker colours) and the semantic names mapped onto it (`surface`, `textPrimary`, `border`, `focusRing`, …) |
| `theme/typography.ts` | Font families, the font size scale, weights, line heights, letter spacing, and the named text styles (`heading1`, `body`, `caption`, …) |
| `theme/spacing.ts` | The spacing scale, a single base unit and its multiples |
| `theme/radii.ts` | Corner radii |
| `theme/shadows.ts` | Elevation levels |
| `theme/zIndex.ts` | Stacking order for map, panels, sheets, dialogs and toasts |
| `theme/sizes.ts` | Fixed dimensions: control heights, icon and badge sizes, border widths |
| `theme/tokens.ts` | Imports the files above, plus `constants/breakpoints.ts` and `constants/motion.ts`, into one typed object |
| `theme/theme.ts` | Maps the tokens into MUI's `createTheme` |
| `theme/GlobalStyles.tsx` | CSS reset, `@font-face` declarations, base `body` styles, Leaflet style overrides |
| `theme/ThemeProviders.tsx` | MUI ThemeProvider wrapping the styled-components ThemeProvider, both given the same tokens |

Components read colours as semantic names (`theme.colors.surface`), never as
raw palette entries (`theme.colors.blue500`). That way a rebrand, or a dark
theme later, is a change to `colors.ts` only.

Components pick named text styles (`theme.typography.body`) rather than
combining a size, weight and line height themselves. This keeps the type
system to a fixed, small set.

### 3.2 Common components

`components/common/` is the application's component library. Pages and
features import UI only from here. Each component wraps its MUI equivalent,
applies the theme, and exposes a small props API that fits this app. It does
not pass MUI's full props through.

| Component | Wraps | Used for |
|---|---|---|
| `Button` | MUI Button | Primary, secondary and text actions |
| `IconButton` | MUI IconButton | Icon-only actions; an accessible label is required |
| `Text` | MUI Typography | All text, by named variant from `typography.ts` |
| `TextField` | MUI TextField | Trip name, place note, time |
| `SearchField` | MUI TextField | Debounced place search input with clear action |
| `DateRangeField` | MUI TextField ×2 | Trip start and end dates |
| `Card` | MUI Card | Trip cards, place cards, timeline day columns |
| `Chip` | MUI Chip | Category, place count, duration labels |
| `Dialog` | MUI Dialog | Create trip, share link |
| `ConfirmDialog` | `Dialog` | Delete trip, discard orphaned days |
| `Sheet` | MUI Drawer | Search panel (side on desktop, full-height on mobile) |
| `Menu` | MUI Menu | Trip and place overflow actions |
| `Tooltip` | MUI Tooltip | Hints on icon buttons |
| `ToggleGroup` | MUI ToggleButtonGroup | Mobile map / list switch |
| `Tabs` | MUI Tabs | Day selector strip |
| `Toast` | MUI Snackbar | Non-blocking notices (copied link, route fallback) |
| `Skeleton` | MUI Skeleton | Loading placeholders |
| `StopBadge` | — | Numbered stop marker on place cards |
| `ProgressBar` | MUI LinearProgress | Planned time per day on the timeline |
| `icons` | MUI icons | The only icon set; features import icons from here |

The existing sibling folders keep their roles and follow the same rules:
- `components/feedback/`: `EmptyState`, `Notice` (inline error, offline and warning messages), `ErrorBoundary`
- `components/layout/`: `AppLayout`, `Header`, `PageContainer`, `SplitView`

This list is the starting set, not a ceiling. When a screen needs something
that isn't here, it is added to `components/common/` first and then used. It
is never built inline in a feature.

Every common component:
- follows the component file convention in section 2
- reads every visual value from `props.theme`, never from a literal
- supports keyboard focus with a visible focus ring from `colors.focusRing`
- respects the reduced-motion flag on the theme

### 3.3 Rules

- MUI is imported only inside `components/` and `theme/`. `features/` and
  `routes/` import from `components/common`, `components/layout` and
  `components/feedback`. ESLint enforces this with `no-restricted-imports`
  overrides.
- No MUI primitive is reimplemented. A common component wraps MUI; it does not
  replace it with a hand-rolled `div`.
- A feature `.styles.ts` file may arrange common components (grid, gap,
  position, size) using theme values. It does not set colours, fonts,
  shadows or radii. Those belong to the common component.
- No hex, `rgb()`, font-family or raw pixel value outside `theme/`. Everything
  reads from `props.theme`. ESLint's `no-restricted-syntax` flags colour
  literals.
- The `sx` prop is allowed only inside `components/common/`.
- No inline style objects except where a value is computed at runtime, such as
  a marker position.
- react-leaflet and react-dnd are not UI primitives and are used directly in
  their features. Marker and route colours still come from `colors.ts`.

## 4. Responsive approach

Breakpoints are defined once in `constants/breakpoints.ts`, pulled into the theme
by `tokens.ts`, and consumed through a helper so no component contains a raw
media query string.

```js
// constants/breakpoints.ts
export const BREAKPOINTS = { xs: 0, sm: 600, md: 900, lg: 1200 }

// usage in a .styles.ts file
const Panel = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  ${up('md')} { grid-template-columns: 380px 1fr; }
`
```

Layout follows the PRD table: single column below 600px, stacked to 900px, side
by side above.

## 5. State contract

```
useTrips()
  trips            Trip[]
  dispatch         (action) => void
  storageWasReset  true when saved data could not be read on startup
```

Actions are named for the user's intent, not the data change:

```
CREATE_TRIP        UPDATE_TRIP        DELETE_TRIP
ADD_PLACE          REMOVE_PLACE       MOVE_PLACE
UPDATE_PLACE       IMPORT_TRIP
```

Ids are sequential integers assigned by `utils/nextId.ts`, which derives the
next value from existing data rather than from a counter. See system design
section 2.

`MOVE_PLACE` carries `{ tripId, fromDayId, toDayId, fromIndex, toIndex }` and
handles both within-day and cross-day movement, because they are the same
operation with different arguments.

localStorage is read synchronously when the provider mounts, so there is no
loading state and no load action. Timestamps are passed in by the action
creators in `actions.ts`, which keeps the reducer free of `Date.now()`.

When a trip's dates change, day N keeps its places and takes the new date.
Shortening a trip drops the last days; extending it adds empty ones.

The reducer is pure and has no knowledge of localStorage, which keeps it
trivially testable. Persistence is a subscription: a debounced effect writes the
trips array whenever it changes, and a `pagehide` listener writes immediately so
closing the tab cannot lose the last edit.

## 6. Environment configuration

Four values live in `.env`, read once in `constants/api.ts` and never touched
elsewhere:

```
VITE_NOMINATIM_URL
VITE_OSRM_URL
VITE_TILE_URL
VITE_APP_CONTACT
```

`.env.example` is committed, `.env` is not. Every variable has a hardcoded
fallback equal to the documented public endpoint, so a checkout with no `.env`
still runs. A missing variable must never produce `undefined` in a URL.

`VITE_APP_CONTACT` is not decoration. Nominatim's usage policy requires an
application to identify itself; the service layer sends it so the project is a
well-behaved guest on donated infrastructure.

**These values are not secrets.** Vite inlines every `VITE_`-prefixed variable
into the client bundle at build time. Anything placed in this file is readable
by anyone who opens devtools. There is no such thing as a private key in a
frontend-only application — a project with no backend has nowhere to keep one.
This is stated in `.env.example` so the constraint travels with the code.

`import.meta.env` is typed in `types/env.d.ts`, with every variable optional,
which is what forces the fallbacks to exist.

## 7. Service layer

```js
// services/http.ts
export const request = (url, { timeout = API.TIMEOUT_MS, signal } = {}) => ...
```

Every outbound call goes through `request`, which applies a timeout, a
user-agent-appropriate header, and JSON parsing, and converts non-2xx into a
typed error. `nominatim.ts` and `osrm.ts` sit on top and expose domain
functions — `searchPlaces(query, signal)`, `getRoute(coordinates, signal)` —
returning already-shaped domain objects, never raw provider payloads.

Provider response shapes do not leak past this layer. That is what makes
replacing a provider a one-file change.

## 8. Drag and drop implementation

```
features/itinerary/dnd/
├── backend.ts          picks HTML5Backend or TouchBackend at startup
├── usePlaceDrag.ts     source: exposes { isDragging, dragRef }
├── usePlaceDrop.ts     target: computes hover index, calls onMove
└── useKeyboardMove.ts  keyboard equivalent, same reducer actions
```

Hover computes the target index from pointer position against the hovered
card's midpoint. The move is applied to local list state during the drag for
immediate feedback, and committed to the reducer once on drop.

Keyboard path: focus a card, then Ctrl+Up and Ctrl+Down to reorder within a
day, Ctrl+Left and Ctrl+Right to move between days. Announced through an ARIA
live region so the change is perceivable without sight.

## 9. Motion

Motion values live in `constants/motion.ts` — durations, easings, and stagger
delays. Implemented with CSS transitions in styled-components where possible.
MUI's own transition components are used for entrance and exit.

A single guard disables everything:

```js
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
```

Read once into the theme, so every styled component can branch on it without
its own listener.

## 10. Error handling

- `components/feedback/ErrorBoundary.tsx` is generic and takes a fallback.
- Three instances: around the map, around the search panel, around the route
  outlet.
- Service errors are typed: `NetworkError`, `RateLimitError`, `TimeoutError`.
  The UI maps type to message from `constants/messages.ts`.
- No `console.log` in the codebase. ESLint enforces it.

## 11. Testing

Not comprehensive, targeted at logic that will break silently:

- `tripReducer` — every action, especially `MOVE_PLACE` across days
- share encode and decode round-trip, including malformed input
- storage read of corrupt and older-version data
- one integration test: drag a place to a new index and assert list order

UI appearance is not tested. Snapshot tests of markup are not written.

## 12. TypeScript conventions

- `strict` is on, along with `noUncheckedIndexedAccess`. Array access returns
  `T | undefined`, which is correct — `places[toIndex]` genuinely can be
  undefined during a drag, and the compiler saying so prevents a real bug.
- `any` is not used. `unknown` at boundaries, narrowed with a type guard.
  Unparsed localStorage and provider responses are `unknown` until validated.
- Domain types live in `types/trip.ts` and nowhere else. Provider response
  shapes are typed locally inside their service and never exported.
- `interface` for object shapes, `type` for unions, aliases and utilities.
- Reducer actions are a discriminated union on `type`, so the reducer's switch
  is exhaustively checked. Adding an action without handling it fails the build.
- `as const` on every constants object. It makes the values literal types, so a
  typo at the call site is a compile error rather than an undefined at runtime.
- styled-components' `DefaultTheme` is augmented in `types/styled.d.ts` so
  `props.theme` is typed rather than `any`.
- No type assertions (`as`) except where narrowing genuinely cannot be
  expressed, with a comment giving the reason.

## 13. Conventions

- Functional components only, named exports from the component file, default
  re-export from `index.ts`.
- Handlers named `handleX` inside a component, props named `onX`.
- Booleans read as assertions: `isLoading`, `hasError`, `canEdit`.
- Comments explain why, never what. A comment restating the code is deleted.
- Three gates must pass at all times: `npm run typecheck`, `npm run lint`,
  `npm run build`.
