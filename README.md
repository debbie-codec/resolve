# Resolve

Resolve is a standalone React customer support ticket management application.

## Features

- Dashboard counts and priority summaries derived from the current ticket list
- Create, view, edit and delete tickets
- Delete confirmation dialog
- Search by title or description
- Filter by status and priority
- Sort tickets by creation date
- Ticket assignment from support-staff API data
- Loading, request failure and empty-staff states
- Inline create/edit validation and operation feedback
- Responsive layouts for mobile, tablet and desktop
- Browser localStorage persistence

## Technologies

- React 19
- JavaScript
- Vite
- Tailwind CSS
- Recharts
- Lucide React

## Local setup

Requirements: Node.js 20 or newer and npm or pnpm.

```bash
npm install
npm run dev
```

Open the local address printed by Vite, normally `http://localhost:5173`.

```bash
npm run build
npm run lint
npm run preview
```

## Ticket data

Sample tickets are included for the first visit. Ticket changes are stored in browser `localStorage` under `resolve.tickets.v1`, so created, edited and deleted tickets remain after a refresh.

The application validates the stored ticket array when loading it. Invalid or unreadable saved data falls back to the sample tickets and displays a message.

## Support staff API

Support staff are loaded from JSONPlaceholder:

`https://jsonplaceholder.typicode.com/users`

The response is normalized into staff names and email addresses for the assignment selector and team directory. The application shows loading, retryable request failure and empty-response states.

## Known limitations

- This is a frontend-only application; no production authentication or backend database is used.
- JSONPlaceholder is mock data. User records are not maintained or created in Resolve.
- Team invitation is a frontend demonstration and is not persisted or sent to a server.
- Settings and profile changes remain local/demo behavior.
- Ticket activity is a demo timeline and is not generated from server-side event history.
- Illustrative SLA and analytics values are not backed by live service data.

## AI Usage

AI tools were used as a guide to understand the project and discuss approaches for ticket CRUD interactions, localStorage, staff API integration, form validation, and the assessment requirements. I implemented the project changes myself and adapted them to match my requirements and preferences. I reviewed the resulting behavior and remain responsible for the submitted code.
