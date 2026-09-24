# Product Requirements Document — Trip Itinerary Planner

Version 0.1 · Draft for review

## 1. Product summary

A browser-based trip planner. The user creates a trip with a date range, adds
places to each day, drags them into the order they intend to visit them, and
watches the route form on a map alongside. The finished itinerary can be shared
as a link that anyone can open without an account.

Everything is stored in the user's own browser. There is no signup, and nothing
is uploaded anywhere.

## 2. Target user

Someone planning a personal trip of two to ten days, comfortable with a
browser, planning alone or sharing a draft with a travel companion for comment.

They are not a power user. They will not read documentation. If the first
screen does not explain itself, they leave.

## 3. User stories

### Trips
- As a traveller, I want to create a trip with dates so the days are laid out for me.
- As a traveller, I want to see all my trips so I can return to one later.
- As a traveller, I want to rename or re-date a trip because plans change.
- As a traveller, I want to delete a trip I no longer need.

### Building a day
- As a traveller, I want to search for a place by name so I can add it quickly.
- As a traveller, I want to add a place to a specific day.
- As a traveller, I want to drag places into visiting order because order is the plan.
- As a traveller, I want to move a place to a different day when the plan shifts.
- As a traveller, I want to note a time or a reminder against a place.
- As a traveller, I want to remove a place I have decided against.

### Seeing the plan
- As a traveller, I want the day's places drawn on a map so I can see whether the order makes geographic sense.
- As a traveller, I want the map to redraw when I reorder, so I get immediate feedback.
- As a traveller, I want to click a marker and find the matching item in my list.
- As a traveller, I want an overview of the whole trip so I can spot an overloaded day.

### Sharing
- As a traveller, I want to send my itinerary to a friend without asking them to sign up.
- As a friend receiving a link, I want to read the itinerary and, if I like it, copy it as my own.

## 4. Screens

### S-1 Trips home
Grid of trip cards: name, date range, number of places, a small static map
thumbnail. A prominent create action. An empty state on first visit that
explains the product in one line and offers a sample trip.

### S-2 Planner
The working screen. Three regions:
- Day selector — horizontal strip of days, current day highlighted
- Itinerary panel — ordered, draggable list of places for the selected day
- Map — markers and route for the selected day

Desktop places the itinerary panel and map side by side. Mobile shows one at a
time with a toggle.

### S-3 Place search
A panel or sheet opened from the planner. Search field, results list, each
result addable in one tap. Closes on selection so the user returns to the
itinerary immediately.

### S-4 Timeline
All days in one view, each a column or row with its places summarised. Used to
rebalance a trip. Selecting a day returns to S-2 with that day active.

### S-5 Shared view
Read-only planner. Same layout, no drag handles, no add or delete controls. A
single action to copy the trip into the viewer's own browser.

## 5. Interaction and motion

Motion is used to explain change, never for decoration. Three rules:

- Anything that moves position animates to it rather than jumping, so the user
  can follow what happened.
- Anything that appears because of a user action fades or slides in from the
  direction that makes its origin obvious.
- Anything the user is dragging follows the pointer with no lag, and the gap it
  will occupy opens up before the drop.

Specific moments:
- Reordering a place — neighbours shift to make room, live, during the drag
- Adding a place — the new card animates in and its marker drops onto the map
- Switching days — the map eases to the new bounds instead of cutting
- Opening a place's detail — expands from the card, not a modal cut
- Loading — skeleton placeholders matching final layout, never spinners

All motion is disabled when the operating system requests reduced motion.

## 6. Empty, loading and error states

Every list has a designed empty state with an action. Every network-backed
surface has a loading state and a failure state that says what failed and what
the user can do. A failed route draws a straight line and says so quietly. A
failed search says so and keeps the user's query intact.

No blank screens, no raw error text, no infinite spinners.

## 7. Responsive behaviour

| Breakpoint | Layout |
|---|---|
| Below 600px | Single column. Map and itinerary toggled. Day selector scrolls horizontally. Search opens as a full-height sheet. |
| 600px to 900px | Itinerary panel over map, map at fixed height. |
| Above 900px | Itinerary panel and map side by side, both full height. Search opens as a side panel. |

## 8. Out of scope for v1

Accounts, collaboration, offline-first sync, transport modes, opening hours,
cost tracking, photo uploads, printing. Recorded here so they are visibly
decisions rather than omissions.

## 9. Acceptance

The product is accepted when a person who has never seen it can create a
three-day trip, add four places to a day, reorder them, and share the result —
without being told how, on both a laptop and a phone.
