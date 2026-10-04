# Little Lemon — Meta Front-End Developer Capstone

A responsive React restaurant website with a complete table reservation experience.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

```sh
npm test        # availability, validation, persistence, and form interaction tests
npm run build  # production output in dist/
npm run preview
```

## Features

- Responsive homepage with specials, restaurant story, illustrative reviews, and booking calls to action.
- Menu page and client-side routing, including a not-found screen.
- Booking form with date, guests, available times, occasion, contact details, and special requests.
- Date-driven available times managed with `useReducer`; `initializeTimes` and `updateTimes` are exported and tested.
- Required-field, email, past-date, guest-count and time validation.
- Review, edit, and confirmation flow with a unique reservation reference.
- Semantic landmarks, skip link, labeled fields, error descriptions, keyboard focus, reduced-motion support, and mobile navigation.
- Browser storage persistence and a recoverable storage error state.
- React Testing Library and Vitest coverage.

## Demo scope

`src/booking.js` contains a local synchronous `fetchAPI(date)` / `submitAPI(values)` adapter. Availability is illustrative, based on weekday; it does not represent live inventory. Reservations are stored in localStorage on this browser only, and no email is sent. There is no backend, account system, ordering, payment, or real restaurant integration. Contact details remain on the device until browser storage is cleared or the next reservation overwrites them.

Restaurant content and testimonials are illustrative. Photos are remotely hosted Unsplash images; fonts are served by Google Fonts. Internet access is needed for those assets. The logo is a local SVG.

## Course alignment

Based on the public [Meta Front-End Developer Capstone overview](https://www.coursera.org/learn/meta-front-end-developer-capstone): a Little Lemon reserve-a-table React app evaluated for usability, accessibility, design and code. Compare with your enrolled course's exact current peer-review rubric before submitting. Any separately required Figma designs, repository submission or deployment must also be provided.

## Structure

- `src/main.jsx`: reusable UI components, routes and reservation screens.
- `src/booking.js`: availability, validation, formatting and persistence.
- `src/styles.css`: responsive design.
- `src/booking.test.jsx`: behavior tests.

For deployment to a static host, publish `dist/` and configure all application routes to serve `index.html` (SPA fallback).
