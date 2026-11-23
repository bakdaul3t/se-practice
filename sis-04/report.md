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

(write here)

### 4.2 Demonstration

<!-- One row per screenshot in evidence/. Say what is on it: the filter values, the rooms shown,
     the room selected, the times entered and the result. -->

| Screenshot | What it shows |
| --- | --- |
| `evidence/filter-match.png` | (write here) |
| `evidence/filter-empty.png` | (write here) |
| `evidence/switch-a.png` | (write here) |
| `evidence/switch-b.png` | (write here) |
| `evidence/narrow.png` | (write here) |

## 5. Refactoring (Task 3)

<!-- The diagrams are diagrams/before.puml and diagrams/after.puml (README section 8). -->

### 5.1 Module responsibilities after

| Module or component | Responsibility |
| --- | --- |
| `src/rooms.ts` | (write here) |
| `src/booking.ts` | (write here) |
| `src/filter.ts` | (write here) |
| (write here) | (write here) |

### 5.2 Design decisions

<!-- At least two. The alternative is what you could have done instead (often what the assistant
     proposed). The why names an AC, an F-rule, a test or a risk from 3.1. -->

| Decision | Alternative I did not take | Why |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |

### 5.3 Duplication removed

<!-- One row per duplicated location that is gone. Count what you can point at, nothing else. -->

| Before (file / function, what was repeated) | After (where it lives now) |
| --- | --- |
| (write here) | (write here) |

## 6. Automated tests (Task 4)

### 6.1 Test plan

<!-- One row per required ID. A test may carry several IDs in its title,
     e.g. test('T06 B1 AC2: exactly 120 minutes is available', …) covers B1 and AC2. -->

| ID | Test title (as in the file) | Input → expected |
| --- | --- | --- |
| AC1 | (write here) | (write here) |
| AC2 | (write here) | (write here) |
| AC3 | (write here) | (write here) |
| AC4 | (write here) | (write here) |
| AC5 | (write here) | (write here) |
| F1 | (write here) | (write here) |
| F2 | (write here) | (write here) |
| F3 | (write here) | (write here) |
| F4 | (write here) | (write here) |
| F5 | (write here) | (write here) |
| B1 | (write here) | (write here) |
| B2 | (write here) | (write here) |
| B3 | (write here) | (write here) |
| B4 | (write here) | (write here) |
| B5 | (write here) | (write here) |
| B6 | (write here) | (write here) |
| INT | (write here) | (write here) |

### 6.2 Commands

<!-- The commands exactly as you typed them, from app/. -->

```text
(paste here)
```

### 6.3 Final run

<!-- The REAL output of the full run on your final code. Every test passes, and the number of
     tests equals what your test files hold (R2). -->

```text
(paste here)
```

## 7. Quality evaluation (Task 5)

<!-- Original = your baseline commit. Final = what you submit. "How I obtained it" says how you
     measured, so someone else could repeat it: "1.1 and 6.3 runs", "counted in 5.3",
     "git ls-files app/src". Do not invent a metric. Tests: write passed/total, e.g. 19/19. -->

| Measure | Original | Final | How I obtained it |
| --- | --- | --- | --- |
| Automated tests passed / total | (write here) | (write here) | (write here) |
| Duplicated logic locations removed | (write here) | (write here) | (write here) |
| Code structure: modules and their responsibilities | (write here) | (write here) | (write here) |
| Remaining limitation | (write here) | (write here) | (write here) |

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

**Tool and model:** (write here)
**Date:** (write here)
**Purpose:** (write here)

**Prompt:**

```text
(paste here)
```

**Output used:**

```text
(paste here)
```

**Problems found:** (write here)
**Changes made:** (write here)
**Verified by:** (write here)

### 8.3 Exchange 3

**Tool and model:** (write here)
**Date:** (write here)
**Purpose:** (write here)

**Prompt:**

```text
(paste here)
```

**Output used:**

```text
(paste here)
```

**Problems found:** (write here)
**Changes made:** (write here)
**Verified by:** (write here)

## 9. Checker results and known fails

<!-- Every check still FAIL or ERROR in your last run of python tests/check_sis.py, and why.
     The same IDs go in submission.yml known_fails. None left? Write: none. -->

| Check | Why it still fails |
| --- | --- |
| (write here) | (write here) |

## 10. AI reflection (Task 6)

<!-- 200–300 words, your own words, no assistant. Answer all five:
     What context did you provide the AI assistant? Which generated suggestions were useful or
     incorrect? What did you personally verify? How did tests influence your engineering
     decisions? What would you improve next? -->

(write here)
