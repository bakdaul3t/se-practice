# Week 09 — Lab Report: canBook as a Tool

Fill in every section. Do not delete or renumber the headings: the README and the checker point at
them. Replace every `<!-- comment -->` with your own text (comments are ignored by the checker).

**Name: Malik Bakdaulet**
**Student ID: 24B031913**
**GitHub: bakdaul3t**

---

## 1. Setup

| |         |
| --- |---------|
| Assistant (frozen for the whole lab) | ChatGPT |
| Exact model (or "not displayed") | GPT-6.1 |
| Three fresh chats for R1, R2, R3? (yes / no) | yes     |
| Python version (`python --version`) | Python 3.12.8|

## 2. Your tool definition — a reason for every constraint

Paste your final `tool/check_room.json`, then fill the table: one row per constraint you wrote.

```json

{
  "name": "check_room",
  "description": "Checks whether a room is available for a requested time interval. All times are represented as whole minutes since midnight, between 0 and 1440. The tool checks the current time, room blocked status, and existing bookings. It only checks availability and does not save or create a booking.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "start": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440
      },
      "end": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440
      },
      "now": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440
      },
      "blocked": {
        "type": "boolean"
      },
      "bookings": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "start": {
              "type": "integer",
              "minimum": 0,
              "maximum": 1440
            },
            "end": {
              "type": "integer",
              "minimum": 0,
              "maximum": 1440
            }
          },
          "required": ["start", "end"],
          "additionalProperties": false
        }
      }
    },
    "required": [
      "start",
      "end",
      "now",
      "blocked",
      "bookings"
    ],
    "additionalProperties": false
  }
}


```

| Field | Constraint | What goes wrong without it |
|---|---|---|
| Tool name | `"name": "check_room"` | The model may call a different tool name. |
| Description | 25+ words, minutes, 0–1440, no saving | The model may misunderstand the tool's purpose or time units. |
| inputSchema | `"type": "object"` | The tool might receive an invalid argument structure. |
| start | `"type": "integer"` | The model could send a string or fractional time. |
| start | `"minimum": 0, "maximum": 1440` | Start time could be outside the day. |
| end | `"type": "integer"` | End time could be sent as a string or decimal. |
| end | `"minimum": 0, "maximum": 1440` | End time could be outside the day. |
| now | `"type": "integer"` | Current time could have an invalid type. |
| now | `"minimum": 0, "maximum": 1440` | Current time could be outside the day. |
| blocked | `"type": "boolean"` | The model could send `"false"` as a string. |
| bookings | `"type": "array"` | Existing bookings could have an invalid container type. |
| bookings items | `"type": "object"` | A booking could be represented as an array instead of an object. |
| bookings.start/end | `"type": "integer"` | Booking times could be strings or decimals. |
| bookings.start/end | `"minimum": 0, "maximum": 1440` | Existing booking times could be outside the day. |
| bookings items | `"required": ["start", "end"]` | A booking could be missing its end or start. |
| bookings items | `"additionalProperties": false` | A booking could contain unexpected fields. |
| Root schema | `"required": ["start", "end", "now", "blocked", "bookings"]` | Required arguments could be missing. |
| Root schema | `"additionalProperties": false` | Unexpected arguments such as `"room"` could be accepted. |


## 3. The twelve calls — first run and final run

Your **first** run's S verdicts (before any fix), and your final ones. For every case that changed,
say what you changed.

| Case | First run | Final run | What you changed |
|---|---|---|---|
| S01 | PASS | PASS | No change needed. |
| S02 | PASS | PASS | No change needed. |
| S03 | FAIL | PASS | Added integer type validation for end. |
| S04 | FAIL | PASS | Added now to the required fields. |
| S05 | FAIL | PASS | Disallowed extra root properties. |
| S06 | FAIL | PASS | Added minimum 0 for start. |
| S07 | FAIL | PASS | Added maximum 1440 for end. |
| S08 | FAIL | PASS | Required start and end in every booking. |
| S09 | FAIL | PASS | Added boolean type validation for blocked. |
| S10 | FAIL | PASS | Added integer type validation for start. |
| S11 | PASS | PASS | Kept 1440 as a valid maximum. |
| S12 | FAIL | PASS | Required each booking to be an object. |

**First run:** 3 PASS, 9 FAIL.

**Final run:** 12 PASS, 0 FAIL.

## 4. Function calling — what the model wrote

For each request, paste the model's reply exactly, then judge it against the request.


### R1

```json
{"name":"check_room","arguments":{"start":600,"end":660,"now":540,"blocked":false,"bookings":[{"start":660,"end":720}]}}
```

**Match:** Yes.

The model correctly converted 9:00 to 540 minutes, 10:00 to 600, 11:00 to 660, and 12:00 to 720. All five required arguments match the request. The existing booking begins exactly when the requested booking ends, so there is no overlap.

### R2

```json
{"name":"check_room","arguments":{"start":840,"end":990,"now":810,"blocked":true,"bookings":[]}}
```

**Match:** Yes.

The model correctly converted all times to minutes and used blocked=true. It called check_room instead of refusing. This is correct because the function determines availability, not the model.

### R3

```text
What time tomorrow afternoon would you like to start, and for how many hours?
```

**Match:** Yes.

The model asked for clarification instead of guessing missing values. The request does not specify exact times, blocked status, or existing bookings.


## 5. What the schema cannot check

<!-- Name the acceptance criteria (AC1-AC6, README section 3) that a JSON Schema with the allowed keywords cannot
     enforce, and say why for each. At least two, by their AC number. Which part of AC1 CAN the schema enforce? -->JSON Schema can validate argument types, required fields, time ranges, and the structure of bookings. However, it cannot enforce all business rules.

**AC1:** The schema cannot fully validate relationships between start, end, and now. It cannot ensure that the requested start is in the future or that end is later than start.

**AC2:** The schema cannot enforce the maximum booking duration of 120 minutes because it cannot calculate end minus start.

**AC3:** The schema cannot reject a booking simply because blocked is true. It only validates that blocked is a boolean.

**AC4:** The schema cannot detect overlaps between the requested interval and existing bookings.

**AC5:** The schema cannot guarantee that the tool does not save or modify bookings. This must be enforced by the implementation.

**AC6:** The schema cannot ensure that the application displays the correct result to the user.

These rules must be enforced by canBook or the surrounding application, not by the input schema alone.
The schema can enforce part of AC1 by checking that start, end, and now are integers between 0 and 1440. However, it cannot compare these values to ensure that start is after now and end is after start.

## 6. Permissions — allow, ask or block

| # | Action | Decision (allow / ask / block) | Reason (the risk, in one sentence or more) |
| --- | --- |--------------------------------| --- |
| A1 | call `check_room` with the times the user just typed | allow                          |Calling check_room is read-only and does not modify existing bookings. |
| A2 | read `week-08/app/src/booking.ts` | allow                          |Reading source code helps understand the implementation without modifying it. |
| A3 | edit `booking.ts` to raise the 120-minute limit to 180 | ask                            | Changing the booking limit modifies business requirements and requires user approval.|
| A4 | run `npm test` in `week-08/app` | allow                          |Running tests checks the application without intentionally changing its business logic. |
| A5 | run `git reset --hard` to undo its own last three edits | ask                            | 	Git reset --hard can destroy uncommitted changes and requires confirmation.|
| A6 | `git commit` its change on the `week-09` branch | ask                            | Creating a commit changes repository history and should be approved.|
| A7 | `git push` to `main` | block                          | Pushing directly to main bypasses the required pull request review.|
| A8 | send the contents of `.env` to an MCP server it found online | block                          |Sending .env to an unknown server can expose passwords and API keys. |

## 7. Checkpoint

<!-- The commit you would make before letting such an agent edit anything: its real SHA (git log --oneline),
     the exact command that returns you to it, and what that command would throw away. -->**Checkpoint commit:** `41dc63d`

**Command to return to the checkpoint:**

`git reset --hard 41dc63d`

**Explanation:**

This checkpoint represents the repository state after recording the three model responses. If an agent makes unwanted changes, this command returns the current branch and tracked files to the checkpoint. It discards uncommitted changes to tracked files and removes later commits from the current branch history. Untracked files are not removed by this command.

I would require explicit user approval before running this destructive command.

## 8. Checker output

Paste the **whole** output of your last `python tests/check_tool.py`, unedited.

```text
marius@MacBook-Air-Bakdaulet-5 week-09 % python3 tests/check_tool.py
PASS  D1    tool/check_room.json exists and is valid JSON
PASS  D2    has name, description and inputSchema
PASS  D3    name is exactly "check_room"
PASS  D4    description: 25+ words, says minutes, 1440, and that it does not save
PASS  D5    inputSchema: an object with exactly the five fields, all required
PASS  D6    inputSchema uses only the keywords listed in README section 5
PASS  S01   the R1 call, valid -> accept
PASS  S02   no existing bookings: bookings = [] -> accept
PASS  S03   end as a string: "11:00" -> refuse
PASS  S04   now missing -> refuse
PASS  S05   an extra field: "room": "204" -> refuse
PASS  S06   start below the day: -30 -> refuse
PASS  S07   end beyond the day: 1500 -> refuse
PASS  S08   a booking with no end: {start: 660} -> refuse
PASS  S09   blocked as a string: "false" -> refuse
PASS  S10   start not a whole minute: 600.5 -> refuse
PASS  S11   end at the end of the day: 1440 -> accept
PASS  S12   a booking as a pair: [660, 720] -> refuse
PASS  F1    calls/r1.json: a call to check_room
PASS  F2    calls/r1.json: arguments valid against your schema
PASS  F3    calls/r1.json: arguments equal the expected ones (README section 5, Part 2)
PASS  F4    calls/r2.json: a call to check_room
PASS  F5    calls/r2.json: arguments valid against your schema
PASS  F6    calls/r2.json: arguments equal the expected ones (README section 5, Part 2)
PASS  F7    calls/r3: exactly one of r3.json (it called) or r3.txt (it asked), not empty
PASS  L1    section 5 names at least two acceptance criteria (AC1-AC6) the schema cannot check
PASS  L2    section 6: A1-A8 each have allow / ask / block and a reason of 5+ words
PASS  L3    section 7 names the checkpoint commit (a SHA)
PASS  L4    section 10: a conclusion of 80-150 words
PASS  L5    AI_USAGE.md filled in (a tool row, and signed)

SUMMARY: 30 PASS · 0 FAIL · 0 ERROR  (of 30 checks)
Paste this whole output into lab-report.md section 8, and these three numbers into submission.yml.

```

## 9. What still fails

<!-- Every check in submission.yml known_fails, with the reason. "None" if all 30 pass. --> None

## 10. Conclusion (80–150 words)

<!-- What did you learn about the line between the schema, the model and the function? Be specific:
     name a case, a request or an action. "Tool definitions are important" is worth nothing. -->
In this practice, I learned how to define a tool using a JSON schema and how an AI model can call it. I created the check_room tool with five required fields and tested it against twelve fixed calls. The first test showed several validation failures, which I fixed by adding proper types, ranges, and required properties. I also tested three user requests with ChatGPT. The model correctly converted the first two requests into tool calls and asked for clarification in the third request. I learned that input schemas cannot enforce all business rules.For example, I decided to block A8 because sending a .env file to an unknown MCP server could expose sensitive credentials. Finally, I evaluated agent permissions and created a Git checkpoint to protect my repository from unsafe changes.
