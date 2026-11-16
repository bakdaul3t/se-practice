# AI Usage Disclosure — Week 09

Required by the course academic policy (Generative AI use level **D — AI-integrated**).

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| ChatGPT | GPT-6  | Part 1 — helped create and explain the JSON Schema | tool/check_room.json |
| ChatGPT | GPT-6  | Part 2 — generated tool calls for R1, R2 and asked a question for R3 | calls/r1.json, calls/r2.json, calls/r3.txt |
| ChatGPT | GPT-6  | Part 3 — helped explain permissions, acceptance criteria and Git checkpoints | lab-report.md |

**I wrote `tool/check_room.json` myself:** no

AI suggested the JSON Schema, including required fields, integer types, time ranges, and additionalProperties constraints. I reviewed the schema and verified it by running the provided checker.

**I used an AI to explain a JSON Schema keyword or a check:** yes

AI explained type, required, minimum, maximum, and additionalProperties. It also helped interpret the D, S, F and L checker results.

**Every reply in `calls/` and in lab-report.md section 4 is exactly what the model returned:** yes

**Every terminal output in lab-report.md was pasted from a real run, unedited:** yes (confirm after completing section 8)

**Anything I accepted from the AI without fully understanding it:**

None, to the best of my knowledge. I reviewed the suggested schema and explanations against the checker results.

Signed: Malik Bakdaulet

Date: 2026-11-16