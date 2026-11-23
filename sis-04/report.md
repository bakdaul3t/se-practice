# SIS #04 — Report: Evolving the Smart Campus Room Availability Checker

<!-- The ONLY file you write prose in. Keep every numbered heading (## 1. … ## 10.), every
     ### sub-heading and every **Label:** word — the checker finds your answers by them.
     Replace every "(write here)" and "(paste here)". Delete these <!-- --> comments if you like. -->

## 1. Setup and starting point

<!-- Model: the exact model with its version, as the tool shows it ("ChatGPT" is a tool, not a
     model). If the tool does not show it, write: not displayed
     Starting point: week-08 | week-07 | sis-03 | starter   (README section 3)
     Baseline commit: the commit that brings your starting point into sis-04/app/ UNCHANGED —
     git rev-parse --short HEAD right after that commit. It is your "initial version". -->

| Item | Value |
| --- |  |
| Assistant (tool) | ChatGPT |
| Assistant model | GPT-6 |
| Starting point | starter |
| Baseline commit | 7e07340 |
| Language (ts or js) | ts |
| Vitest version | 3.2.7 |
| Where I ran the tests | PyCharm Terminal, macOS, sis-04/app |

### 1.1 Baseline run

<!-- Before you change anything: run the tests of your starting point inside app/ and paste the
     REAL output. No tests yet (starter, sis-03)? Paste the run anyway: Vitest prints
     "No test files found". That is your honest "original" number, 0/0. -->

```text
RUN  v3.2.7 /Users/marius/PycharmProjects/se-practice/sis-04/app

No test files found, exiting with code 1

include: **/*.{test,spec}.?(c|m)[jt]s?(x)
exclude: **/node_modules/**, **/dist/**, **/cypress/**, **/.{idea,git,cache,output,temp}/**, **/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*
```

## 2. Context for the assistant

### 2.1 Repository map

<!-- The concise map you gave the assistant: the files that matter and one line each on what
     they do. A tree is fine:  src/App.tsx — the page, holds the rooms and the form … -->

```text
sis-04/
├── app/
│   ├── src/
│   │   ├── App.tsx       - React UI, room data and booking validation
│   │   ├── main.tsx      - React application entry point
│   │   └── index.css     - Application styles
│   ├── package.json     - Dependencies and npm scripts
│   └── vite.config.ts   - Vite configuration
├── starter/             - Original application template
├── diagrams/            - Before and after architecture diagrams
├── evidence/            - Screenshots of application behavior
├── tests/               - SIS validation scripts
├── report.md            - Project report
├── AI_USAGE.md          - AI assistance disclosure
└── submission.yml       - Submission metadata
```

### 2.2 The context message as sent

<!-- The whole first message of your analysis chat: the map, AC1–AC6, F1–F5 and the constraints
     (no login, payments, live APIs or database; fictional data only). Unedited. -->

```text
I'm working on SIS #04 using the provided TypeScript starter. The baseline commit is 7e07340. My repository has app/src/App.tsx, main.tsx and index.css. App.tsx currently contains the room data, availability rules and React UI.

Please analyze the codebase for at least three maintainability risks and propose a numbered improvement plan before modifying the source code.

Preserve AC1–AC6: valid time inputs, a maximum booking duration of 120 minutes, blocked rooms unavailable, touching bookings allowed but overlapping bookings rejected, immutable booking data, and clear responsive feedback.

Implement F1–F5: capacity greater than or equal to attendees, ALL selected equipment required, blocked rooms never available, clear empty state, and checking the selected room's own bookings when the selection changes.

Use at least four fictional rooms, separate rooms.ts, booking.ts, filter.ts and UI, keep the application in TypeScript, use Vitest, and do not add login, payments, live APIs or a database. Do not modify app/src until the analysis and plan are committed.
```

## 3. Codebase analysis (Task 1)

### 3.1 Maintainability risks

<!-- At least three, found in YOUR starting code. "Where" names a file or a function(),
     e.g. src/App.tsx, check(). Evidence is what you saw, not what the assistant said.
     Priority: High / Medium / Low. -->

| # | Risk | Where (file / function) | Evidence | Priority |
| --- | --- | --- | --- | --- |
| 1 | Mixed responsibilities | `src/App.tsx`, `App()` and `check()` | Room data, booking validation, and React UI are located in the same component. | High |
| 2 | Difficult unit testing | `src/App.tsx`, `check()` | Availability rules depend on React state, and the baseline Vitest run found no test files. | High |
| 3 | Stale availability result | `src/App.tsx`, room selector | The room selector calls only `setRoomId()`, without clearing or recalculating the previous result. | Medium |

### 3.2 Improvement plan — before editing

<!-- Numbered, in the order you will do it, smallest safe step first. Written BEFORE you change
     code: the commit that adds this section comes before the commit that changes app/src. -->

1. Extract room data and types from App.tsx into rooms.ts. Add at least four fictional rooms with capacity, equipment, blocked status, and bookings.
2. Extract booking validation into booking.ts using canBook() and checkRoom(). Preserve AC1-AC6, including the 120-minute limit and overlap rules.
3. Create filter.ts with filterRooms() to implement capacity and equipment filtering.
4. Refactor App.tsx to use the extracted modules, clear stale results, and display an empty state when no rooms match.
5. Add Vitest tests covering AC1-AC5, F1-F5, B1-B6, and INT.
6. Run all tests, create before/after diagrams, collect five screenshots, and document measured results.

### 3.3 One AI suggestion I rejected or modified

| Suggestion (as the assistant made it) | Decision | Why — with the AC, F-rule, test or file behind it |
| --- | --- | --- |
| Exclude blocked rooms through filter.ts. | Modified | Filtering alone cannot guarantee F3. I will also enforce the blocked-room rule in booking.ts through canBook() and checkRoom(), so a blocked room can never be reported available. |

## 4. Feature extension (Task 2)

### 4.1 What I added

<!-- Short: the catalog (how many rooms, which equipment), how the filter is chosen on the page,
     what the empty state says, what happens to an old result when the room changes. -->


I extended the Smart Campus Room Availability Checker with a catalog of four fictional rooms: A-101, B-204, C-303, and D-404.

Each room contains an ID, name, capacity, equipment list, blocked status, and its own bookings.

I implemented filterRooms() in filter.ts to filter rooms by the required capacity (F1) and ALL selected equipment (F2).

The booking.ts module contains canBook() and checkRoom(), which enforce booking validation, the 120-minute maximum duration, blocked-room restrictions, and overlap rules (F3).

When no rooms match the filters, the application displays a clear empty-state message (F4).

Changing the selected room clears the previous availability result. The next check uses the newly selected room's own bookings (F5).


### 4.2 Demonstration

<!-- One row per screenshot in evidence/. Say what is on it: the filter values, the rooms shown,
     the room selected, the times entered and the result. -->


| Screenshot | What it shows |
| --- | --- |
| `evidence/filter-match.png` | 25 attendees with Projector and Whiteboard selected. Rooms A-101, B-204, and D-404 match the filters. |
| `evidence/filter-empty.png` | 150 attendees requested. No room matches, and the application displays a clear empty-state message. |
| `evidence/switch-a.png` | Room A-101, current time 09:00, booking 10:00-11:00. Result: Unavailable because of an existing booking. |
| `evidence/switch-b.png` | Room B-204, current time 09:00, booking 10:00-11:00. Result: Available because this room has no conflicting bookings. |
| `evidence/narrow.png` | Mobile viewport at 390px width. Filters and the empty-state message remain readable. |


## 5. Refactoring (Task 3)

<!-- The diagrams are diagrams/before.puml and diagrams/after.puml (README section 8). -->

### 5.1 Module responsibilities after


| Module or component | Responsibility |
| --- | --- |
| `src/rooms.ts` | Defines Room and Interval types and stores the catalog of four fictional rooms. |
| `src/booking.ts` | Contains canBook() and checkRoom() for time validation, blocked-room checks, and booking conflicts. |
| `src/filter.ts` | Contains filterRooms() for capacity and equipment filtering. |
| `src/App.tsx` | Handles React UI, user inputs, selected room, and availability feedback. |
| `src/main.tsx` | Renders the React application. |
| `src/index.css` | Provides application styling and responsive layout. |


### 5.2 Design decisions

<!-- At least two. The alternative is what you could have done instead (often what the assistant
     proposed). The why names an AC, an F-rule, a test or a risk from 3.1. -->


| Decision | Alternative I did not take | Why |
| --- | --- | --- |
| Extract booking rules into pure functions canBook() and checkRoom(). | Keep all booking logic inside App.tsx. | Pure functions are easier to test independently and help preserve AC1-AC5 and F5. |
| Use equipment.every() in filterRooms(). | Use equipment.some() to match any selected equipment. | F2 requires ALL selected equipment. The F2 test confirms that rooms missing one selected item are excluded. |
| Store bookings as readonly arrays in the Room type. | Use mutable arrays and modify room bookings directly. | Readonly types reduce the risk of accidental mutation and support AC5. |


### 5.3 Duplication removed

<!-- One row per duplicated location that is gone. Count what you can point at, nothing else. -->


| Before (file / function, what was repeated) | After (where it lives now) |
| --- | --- |
| `App.tsx`, `check()` contained multiple inline availability conditions. | `booking.ts`, `canBook()` centralizes time, duration, blocked-room, and overlap validation. |
| `App.tsx` directly accessed the selected room's bookings for availability checks. | `booking.ts`, `checkRoom()` selects the correct room and delegates validation to canBook(). |

## 6. Automated tests (Task 4)

### 6.1 Test plan

<!-- One row per required ID. A test may carry several IDs in its title,
     e.g. test('T06 B1 AC2: exactly 120 minutes is available', …) covers B1 and AC2. -->


| ID | Test title (as in the file) | Input → expected |
| --- | --- | --- |
| AC1 | AC1: invalid time interval is rejected | Start 720, end 660 → false; NaN → false |
| AC2 | AC2 B1: exactly 120 minutes is allowed | 660–780 → true |
| AC3 | AC3: blocked room is unavailable | blocked = true → false |
| AC4 | AC4 B4: overlapping an existing booking is rejected | 630–720 overlaps 600–660 → false |
| AC5 | AC5: existing booking data is not mutated | Frozen bookings → unchanged |
| F1 | F1: capacity must be at least attendees | 40 attendees → r2, r4 |
| F2 | F2: room must have ALL selected equipment | Projector + Whiteboard → r1, r4 |
| F3 | F3: blocked room is never available | Blocked r3 → false |
| F4 | F4: no matching rooms returns empty array | 150 attendees → [] |
| F5 | F5: selected room uses its own bookings | r1 → false, r2 → true |
| B1 | AC2 B1: exactly 120 minutes is allowed | 120 minutes → true |
| B2 | AC2 B2: 121 minutes is rejected | 121 minutes → false |
| B3 | AC4 B3: touching an existing booking is allowed | 660 start, existing ends 660 → true |
| B4 | AC4 B4: overlapping an existing booking is rejected | Overlap → false |
| B5 | B5: capacity equal to attendees is included | 30 attendees, capacity 30 → included |
| B6 | B6: capacity one below attendees is excluded | 31 attendees, capacity 30 → excluded |
| INT | INT: filtered room can be checked for availability | Filter then check r1 → false, r4 → true |


### 6.2 Commands

<!-- The commands exactly as you typed them, from app/. -->

```text

cd sis-04/app
npx vitest run src/booking.test.ts
npx vitest run
npx tsc --noEmit
npm run build

```

### 6.3 Final run

<!-- The REAL output of the full run on your final code. Every test passes, and the number of
     tests equals what your test files hold (R2). -->

```text

RUN  v3.2.7 /Users/marius/PycharmProjects/se-practice/sis-04/app

✓ src/booking.test.ts (7 tests) 2ms
✓ src/filter.test.ts (8 tests) 2ms

Test Files  2 passed (2)
     Tests  15 passed (15)
  Start at  17:12:52
  Duration  236ms (transform 47ms, setup 0ms, collect 48ms,
  tests 4ms, environment 0ms, prepare 100ms)
```

## 7. Quality evaluation (Task 5)

<!-- Original = your baseline commit. Final = what you submit. "How I obtained it" says how you
     measured, so someone else could repeat it: "1.1 and 6.3 runs", "counted in 5.3",
     "git ls-files app/src". Do not invent a metric. Tests: write passed/total, e.g. 19/19. -->


| Measure | Original | Final | How I obtained it |
| --- | --- | --- | --- |
| Automated tests passed / total | 0/0 | 15/15 | Baseline Vitest run reported "No test files found"; final `npx vitest run` passed all 15 tests in two files. |
| Duplicated logic locations removed | 0 confirmed | 0 confirmed | Compared baseline App.tsx with booking.ts and filter.ts. Availability logic was extracted and centralized, but no independently duplicated implementations were confirmed. |
| Code structure: modules and their responsibilities | 3 source files; App.tsx combines data, booking rules and UI | 5 production source files; rooms.ts, booking.ts, filter.ts, App.tsx and main.tsx, plus index.css | Counted the source files and inspected their responsibilities before and after refactoring. |
| Remaining limitation | Only 2 rooms; no capacity or equipment filters | Fictional static room catalog; no persistent bookings | Compared the baseline room catalog with the final application. No database or live API was added, as required by the assignment. |


## 8. AI evidence appendix

<!-- At least three exchanges, one ### 8.N block each: the analysis (Task 1), the plan, and at
     least one implementation, refactoring or test exchange. Copy the block for more.
     The prompt as you sent it; the output may be cut to the part you used, with "[…]" where
     you cut. Verified by: the test, run, file or check that confirmed it — not "it looked right". -->

### 8.1 Exchange 1

**Tool and model:** ChatGPT — GPT-6
**Date:** 2026-11-23
**Purpose:** Analyze the starter application and identify maintainability risks before refactoring.

**Prompt:**

```text
I'm working on SIS #04 using the provided TypeScript starter. The baseline commit is 7e07340. My repository has app/src/App.tsx, main.tsx and index.css. App.tsx currently contains the room data, availability rules and React UI.

Please analyze the codebase for at least three maintainability risks and propose a numbered improvement plan before modifying the source code.

Preserve AC1–AC6: valid time inputs, a maximum booking duration of 120 minutes, blocked rooms unavailable, touching bookings allowed but overlapping bookings rejected, immutable booking data, and clear responsive feedback.

Implement F1–F5: capacity greater than or equal to attendees, ALL selected equipment required, blocked rooms never available, clear empty state, and checking the selected room's own bookings when the selection changes.

Use at least four fictional rooms, separate rooms.ts, booking.ts, filter.ts and UI, keep the application in TypeScript, use Vitest, and do not add login, payments, live APIs or a database. Do not modify app/src until the analysis and plan are committed.
```

**Output used:**

```text
The assistant identified six preliminary maintainability risks:
R1 - Mixed responsibilities in App.tsx.
R2 - Business logic coupled with React UI, making testing difficult.
R3 - Potential mutation of booking data.
R4 - Risk of incorrect availability checks.
R5 - Increasing complexity of room filtering.
R6 - Insufficient UI feedback.

The assistant proposed extracting rooms.ts, booking.ts and filter.ts,
refactoring App.tsx, adding Vitest tests, and verifying AC1-AC6 and F1-F5.
```

**Problems found:** The initial AI analysis included hypothetical risks. I checked App.tsx and confirmed mixed responsibilities, difficult isolated testing, and stale availability results.
**Changes made:** Documented the verified risks and created a numbered improvement plan in Sections 2 and 3. No application source code was modified.
**Verified by:** Manual inspection of sis-04/app/src/App.tsx and the baseline Vitest run, which reported "No test files found".



### 8.2 Exchange 2

**Tool and model:** ChatGPT — GPT-6

**Date:** 2026-11-23

**Purpose:** Analyze the actual App.tsx source code and identify confirmed maintainability problems.

**Prompt:**

```text
marius@MacBook-Air-Bakdaulet-5 se-practice % cat sis-04/app/src/App.tsx
import { useState } from 'react';

// Starter for SIS #04, for students with no Week 07 / Week 08 project (declare: starter).
// The availability decision lives INSIDE this component on purpose: your refactoring (Task 3)
// moves it into src/booking.ts as canBook({ start, end, now, blocked, bookings }), the rooms into
// src/rooms.ts and the new filter into src/filter.ts, without changing what AC1-AC6 decide.

type Interval = { start: number; end: number };
type Room = { id: string; name: string; blocked: boolean; bookings: Interval[] };

const ROOMS: Room[] = [
  { id: 'a101', name: 'Room A-101', blocked: false, bookings: [{ start: 600, end: 660 }] },
  { id: 'b204', name: 'Room B-204', blocked: false, bookings: [] },
];

const toMinutes = (value: string) => {
  const [h, m] = value.split(':').map(Number);
  return h * 60 + m;
};
const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

export default function App() {
  const [roomId, setRoomId] = useState('a101');
  const [now, setNow] = useState('09:00');
  const [blocked, setBlocked] = useState(false);
  const [start, setStart] = useState('11:00');
  const [end, setEnd] = useState('12:00');
  const [endOfDay, setEndOfDay] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  const room = ROOMS.find(r => r.id === roomId)!;

  function check() {
    setResult(null);
    if (!start || !now || (!end && !endOfDay)) {
      setError('Fill in the current time, the start and the end.');
      return;
    }
    const s = toMinutes(start);
    const e = endOfDay ? 1440 : toMinutes(end);
    const n = toMinutes(now);
    if (!(s < e)) {
      setError('The end time must be after the start time.');
    } else {
      setError('');
    }

    let ok = true;
    if (!(0 <= s && s < e && e <= 1440)) ok = false;
    else if (!(s > n)) ok = false;
    else if (e - s > 120) ok = false;
    else if (blocked) ok = false;
    else {
      for (const b of room.bookings) {
        if (s < b.end && e > b.start) {
          ok = false;
          break;
        }
      }
    }
    setResult(ok);
  }

  return (
    <main className="page">
      <h1>Smart Campus Room Availability</h1>
      <div className="row">
        <label>Room
          <select value={roomId} onChange={e => setRoomId(e.target.value)}>
            {ROOMS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </label>
        <label>Current time<input type="time" value={now} onChange={e => setNow(e.target.value)} /></label>
        <label>Start<input type="time" value={start} onChange={e => setStart(e.target.value)} /></label>
        <label>End<input type="time" value={end} disabled={endOfDay} onChange={e => setEnd(e.target.value)} /></label>
        <label className="inline"><input type="checkbox" checked={endOfDay} onChange={e => setEndOfDay(e.target.checked)} /> Ends at 24:00</label>
        <label className="inline"><input type="checkbox" checked={blocked} onChange={e => setBlocked(e.target.checked)} /> Room blocked</label>
      </div>
      <button onClick={check}>Check availability</button>
      {error && <p className="error">{error}</p>}
      {result !== null && (
        <p className={`result ${result ? 'available' : 'unavailable'}`}>{result ? 'Available' : 'Unavailable'}</p>
      )}
      <h2>Existing bookings</h2>
      <ul>{room.bookings.length ? room.bookings.map((b, i) => <li key={i}>{fmt(b.start)}–{fmt(b.end)}</li>) : <li>none</li>}</ul>
    </main>
  );
}
marius@MacBook-Air-Bakdaulet-5 se-practice %
```

**Output used:**

```text
The assistant identified four maintainability problems
in the original App.tsx file.

1. Booking logic was mixed with React UI inside check().
2. Room data was stored directly in App.tsx.
3. Switching rooms did not clear the previous availability result.
4. The non-null assertion after ROOMS.find() could cause
   a runtime error if a room was not found.

The assistant recommended separating room data,
booking validation, filtering, and UI responsibilities.
```

**Problems found:** The original App.tsx contained room data, booking rules, and React UI together. The selected room could also display a stale availability result.

**Changes made:** Created separate rooms.ts, booking.ts, and filter.ts modules. Updated App.tsx to import the extracted functions.

**Verified by:** Inspected the original App.tsx, ran 15 Vitest tests successfully, and manually checked room switching between A-101 and B-204.



### 8.3 Exchange 3

**Tool and model:** ChatGPT — GPT-6

**Date:** 2026-11-23

**Purpose:** Generate and verify automated Vitest tests for booking rules, room filtering, and integration.

**Prompt:**

```text
marius@MacBook-Air-Bakdaulet-5 app % npx vitest --version
vitest/3.2.7 darwin-arm64 node-v26.13.0
```

**Output used:**

```text
The assistant provided booking.test.ts with seven tests covering
AC1-AC5 and B1-B4. It also provided filter.test.ts with eight tests
covering F1-F5, B5-B6, and INT.

The tests use the real booking and filtering functions with a
fixed fictional room catalog, without mocks. The assistant also
provided commands for running the tests with Vitest.
```

**Problems found:** The original starter had no automated tests. No test failures were observed in the recorded runs.

**Changes made:** Created booking.test.ts and filter.test.ts and ran the complete test suite.

**Verified by:** Executed `npx vitest run` in sis-04/app. All 15 tests passed. TypeScript checking and the Vite production build also completed successfully.

## 9. Checker results and known fails


## 9. Checker results and known fails

Final checker command:

`python3 tests/check_sis.py`

Final result:

`SUMMARY pass=33 fail=0 error=0 (33 checks)`

| Check | Why it still fails |
| --- | --- |
| none | All 33 checks passed. |


## 10. AI reflection (Task 6)

<!-- 200–300 words, your own words, no assistant. Answer all five:
     What context did you provide the AI assistant? Which generated suggestions were useful or
     incorrect? What did you personally verify? How did tests influence your engineering
     decisions? What would you improve next? -->

During SIS #04, I used ChatGPT to help me improve the Smart Campus Room Availability Checker. I provided the assistant with information about my TypeScript project, the original App.tsx file, and the requirements AC1–AC6 and F1–F5. My main goal was to improve the structure of the application while keeping the existing booking rules working correctly.

The most useful AI suggestion was to separate the application into different modules. Instead of keeping everything inside App.tsx, I created rooms.ts for room data, booking.ts for availability checks, and filter.ts for filtering rooms. This made the code easier to understand and test. I also learned that checking blocked rooms only through filters was not enough, so the booking module needed its own blocked-room validation.

I personally verified the application by running it in the browser. I tested different room capacities, equipment filters, and booking times. For example, Room A-101 was unavailable from 10:00 to 11:00, while Room B-204 was available for the same time.

Automated testing was another important part of this assignment. I created 15 Vitest tests, and all 15 passed. I also ran TypeScript checks and successfully built the application using Vite. These checks helped me confirm that the refactoring preserved the required behavior.

In the future, I would improve input validation, error messages, and mobile usability. This assignment helped me understand that AI can support software development, but its suggestions must always be verified through testing and manual inspection.
