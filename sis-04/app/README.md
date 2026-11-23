
# Smart Campus Room Availability Checker

## Description

A TypeScript and React application for checking campus room availability.

The application includes four fictional rooms and supports filtering by capacity and equipment.

Booking availability is checked using the selected room's own bookings.

## Technologies

- React
- TypeScript
- Vite
- Vitest

## Installation

Requires Node.js and npm.

```bash
npm install
```

## Run the Application

```bash
npm run dev
```

Open the local URL displayed by Vite.

## Run Tests

```bash
npx vitest run
```

The project includes 15 automated tests covering booking rules, room filtering, boundary conditions, and integration.

## TypeScript Check

```bash
npx tsc --noEmit
```

## Production Build

```bash
npm run build
```

## Project Structure

- `src/rooms.ts` — Room catalog and TypeScript types.
- `src/booking.ts` — Booking validation and availability rules.
- `src/filter.ts` — Capacity and equipment filtering.
- `src/App.tsx` — React user interface.
- `src/booking.test.ts` — Booking tests.
- `src/filter.test.ts` — Filtering and integration tests.

## Limitations

All rooms are fictional, and bookings are stored as static data. No database, authentication, payments, or external APIs are used.
