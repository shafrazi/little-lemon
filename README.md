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
