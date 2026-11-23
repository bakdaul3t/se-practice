
# AI Usage Disclosure — SIS #04

Generative AI use level D — AI-integrated.

| Tool | Exact model / plan | Date | Used for | Which files it touched |
| --- | --- | --- | --- | --- |
| ChatGPT | GPT-6 | 2026-11-23 | Codebase analysis and identification of maintainability risks | report.md |
| ChatGPT | GPT-6 | 2026-11-23 | Improvement plan and architectural decisions | report.md |
| ChatGPT | GPT-6 | 2026-11-23 | Assistance with room catalog, filtering and booking logic | app/src/rooms.ts, app/src/filter.ts, app/src/booking.ts |
| ChatGPT | GPT-6 | 2026-11-23 | React UI refactoring and module integration | app/src/App.tsx |
| ChatGPT | GPT-6 | 2026-11-23 | Test generation and boundary-case coverage | app/src/booking.test.ts, app/src/filter.test.ts |
| ChatGPT | GPT-6 | 2026-11-23 | Documentation and UML diagram assistance | report.md, app/README.md, diagrams/before.puml, diagrams/after.puml, AI_USAGE.md |

**The assistant wrote, or helped write, tests in `app/`:** yes

The assistant helped generate tests for AC1–AC5, F1–F5, B1–B6 and INT. Expected results were checked against the assignment requirements, including the 120-minute limit, booking overlap rules, room capacity and equipment requirements.

**Every run pasted in report.md was produced by my code on my machine (or Codespace), unedited:** yes

**Every number in report.md section 7 was measured the way its row says:** yes

**I shared no credentials, keys or private data with any tool:** yes

**Everything I submitted, I can explain and defend in class — including filterRooms, checkRoom and why each module exists:** yes

**Anything I accepted from the AI without fully understanding it:**

None identified during review. The main booking and filtering functions were checked using Vitest and manual browser testing.

Signed: Malik Bakdaulet

Date: 2026-11-23
