# Business Requirements Document — Trip Itinerary Planner

Version 0.1 · Draft for review

## 1. Background

Planning a multi-day trip is done across three disconnected tools: a map in one
browser tab, a notes app for the list of places, and a spreadsheet for timings.
None of them know about each other. Reordering a day means editing the list in
one place and mentally re-tracing the route in another.

The gap is not information. Maps and reviews are abundant. The gap is a single
surface where the sequence of a day and its geography are visible together.

## 2. Business objective

Deliver a portfolio-grade web application that demonstrates senior-level
frontend engineering, published under the client's GitHub account and deployed
to a public URL.

The application is judged on two axes:
1. Whether a visitor finds it genuinely usable within thirty seconds.
2. Whether an engineer reading the repository sees deliberate decisions.

Both matter. A polished demo over a careless codebase fails the second, and a
clean codebase nobody can use fails the first.

## 3. Business drivers

| Driver | Why it matters |
|---|---|
| Differentiation | The repository is evaluated against many portfolios built from the same tutorials. A planner with real drag-and-drop and map synchronisation is not a common submission. |
| Demonstrable depth | Drag-and-drop across nested lists, and keeping list state in sync with map state, are problems that cannot be copied without understanding them. |
| Zero running cost | No servers, no database, no API keys with billing attached. The project stays live indefinitely without maintenance or spend. |
| Speed to delivery | Roughly three weeks part-time. The client sees a finished artefact rather than an ongoing commitment. |

## 4. Success criteria

- SC-1 A visitor can plan a three-day trip without instructions.
- SC-2 The application is reachable at a public URL with no signup.
- SC-3 The repository README explains the architecture and what was
  deliberately excluded, with reasoning.
- SC-4 The application is usable on a phone, not merely non-broken.
- SC-5 Hosting and third-party usage cost nothing, now and ongoing.
- SC-6 Delivered within four weeks of approval.

## 5. Stakeholders

| Stakeholder | Interest |
|---|---|
| Client (repository owner) | A credible portfolio artefact. Approval authority on scope. |
| Engineer | Delivery within a part-time schedule, roughly 8-10 hours per week. |
| End evaluator (recruiter, hiring engineer) | Evidence of judgement, not feature count. |

## 6. Constraints

- C-1 Part-time delivery capacity of 8-10 hours per week.
- C-2 No recurring infrastructure or API spend.
- C-3 Prescribed technology stack, fixed before implementation begins.
- C-4 No user accounts, therefore no personal data and no privacy obligations.

## 7. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Free map and routing providers rate-limit or go down | Core features degrade | Client-side caching, debounced requests, straight-line fallback for routes |
| Scope expands during build | Delivery slips past four weeks | Requirements section 3 is locked; additions go to a v2 list, not the current build |
| Drag-and-drop proves fiddly across touch and mouse | Late schedule pressure | Sequenced early in the plan, with its own phase and its own review |
| Share links grow long for large trips | Links break in some clients | Compression before encoding, plus a measured size ceiling and a warning above it |

## 8. Out of scope

Accounts, collaboration, bookings, pricing, recommendations, native apps. Each
is a separate product decision and none is required to meet the objective in
section 2.

## 9. Approval

Approval of this document confirms the objective, the success criteria and the
constraints. Detailed behaviour is specified in the PRD and requires separate
sign-off.
