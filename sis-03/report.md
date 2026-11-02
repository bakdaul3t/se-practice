# SIS #03 — Report: Smart Campus Room Availability Checker


## 1. Setup and reuse

<!-- Model: the exact model with its version, as the tool shows it ("ChatGPT" is a tool, not a
     model). If the tool does not show it, write: not displayed
     Reuse: week-05 if code/original/booking_v1.py is your Week 05 v1, copied unedited;
     week-06 if web/original/ is your Week 06 v1 export; fresh if you generated it for this SIS. -->

| Item | Value                       |
| --- |-----------------------------|
| Coding assistant (tool) | ChatGPT                     |
| Coding assistant model | GPT-6                       |
| Bolt.new model | not displayed               |
| Bolt project link | https://bolt.new/p/72584982 |
| Language | Python                      |
| Path | A                           |
| Python v1 from | fresh                       |
| Web v1 from | fresh                       |

## 2. Baseline — before any new AI exchange

<!-- Written by you, without AI, before the first exchange of this SIS. Commit and push it
     first (README §2). Reusing Week 05/06 work does not exempt you: this section is new. -->

### 2.1 Scope in my own words

**Scope:** This program helps students check if a room is available. Students can choose a start time and an end time. The program checks the time and existing bookings. It shows Available or Unavailable. It does not create bookings. It does not use login, a database, or a backend.

### 2.2 The acceptance criteria in my own words

| AC | In my own words |
| --- | --- |
| AC1 | The start and end must be integer minutes from 0 to 1440. Start must be before end and after the current time. |
| AC2 | Students can choose a time for a maximum of 120 minutes. Exactly 120 minutes is allowed |
| AC3 | If the room is blocked, students cannot book it. |
| AC4 | The new booking cannot overlap with other bookings. But it can start when another booking ends. |
| AC5 | The program must show Available or Unavailable. It must not change old bookings. |
| AC6 | The program must show clear error messages and work on mobile phones. |

### 2.3 Likely failure points

<!-- At least two. The brief's examples: endpoint overlap, starts-now. -->

| # | Failure point | AC | How I will check it |
| --- | --- | --- | --- |
| 1 | The program may reject a booking that starts when another booking ends. | AC4 | I will test start 660 and end 720 when another booking ends at 660. |
| 2 | The program may allow a booking that starts at the current time. | AC1 | I will test start 540, end 570 and now 540. |

### 2.4 The contract

| Parameter | Meaning | Type and allowed values |
| --- | --- | --- |
| `start` | Start time of the booking | Integer, 0 to 1440 |
| `end` | End time of the booking | Integer, 0 to 1440 |
| `now` | Current time | Integer, minutes from 0 to 1440 |
| `blocked` | Shows if the room is blocked | Boolean, True or False |
| `existing` | List of existing bookings | List of pairs of integer minutes |
| returns | Shows if the room is available | Boolean, True if all rules pass, otherwise False |

### 2.5 Initial assumptions and manual checks

**Assumptions:**

1. All times are in minutes. For example, 540 means 09:00.
2. The program checks only one room and one day.

**Checked manually:**

- I compared the time intervals 600–660 and 660–720. They do not overlap, so the result should be Available.

## 3. Python v1 review

<!-- One row per conditional branch in code/original/booking_v1.py (your language's v1 on
     Path B). Quote the condition exactly. AC1-AC4 must all appear in the AC column. -->

| Branch in v1 (quoted) | AC | Satisfies it? | Why |
|---|---|---|---|
| `if start < 0 or end > 1440:` | AC1 | Partly | It checks some time limits, but not all invalid inputs. |
| `if start >= end:` | AC1 | Yes | It rejects a start time that is not before the end time. |
| `if start < now:` | AC1 | No | It allows a booking that starts exactly now. T6 failed. |
| `if end - start > 120:` | AC2 | Yes | It rejects bookings longer than 120 minutes. T4 and T5 passed. |
| `if blocked:` | AC3 | Yes | It rejects a booking when the room is blocked. T3 passed. |
| `if start <= booking_end and end >= booking_start:` | AC4 | No | It rejects bookings that only touch at an endpoint. T1 and T11 failed. |
| `return True` | AC1–AC4 | Partly | It returns True after all checks, but some checks have mistakes. |

## 4. Prototype v1 in Bolt.new

**Prompt as sent:**

~~~~text
Create a simple responsive one-page website called Smart Campus Room Availability Checker.
The website is for students to check whether one selected campus room is available at a chosen time. Use fictional booking data only.
Requirements:
AC1: Use integer minutes from midnight. The start and end must satisfy 0 <= start < end <= 1440. Start must be strictly after the current time.
AC2: The maximum duration is 120 minutes. Exactly 120 minutes is allowed.
AC3: If the room is blocked, always show Unavailable.
AC4: Reject any overlap with existing bookings. If two bookings only touch at an endpoint, this is allowed.
AC5: Show a clear Available or Unavailable result. Never change existing bookings when checking.
AC6: Show simple validation error messages and make the design responsive and usable on a 375px mobile screen.
Use one room called Room A101. For testing, use now = 540 (09:00), blocked = false, and an existing booking from 600 to 660 (10:00 to 11:00). Include a simple way to change the blocked state and test additional fictional bookings, without creating actual reservations.
Build a clean, simple student-friendly interface with start time, end time, a Check Availability button and a result message.
Do not add login, authentication, backend, database, external API, payments, booking confirmation, or unrelated features. Everything must work locally in the browser. Do not add a Book button.
~~~~

<!-- Main generated files or components, with their path inside web/original/
     (for example src/App.tsx). At least two. -->

| Generated file or component | Path          | Its role |
|-----------------------------|---------------| --- |
| Main application            | src/App.tsx   | Shows the room checker interface |
| Styles                      | src/index.css | Controls the page design and mobile layout |

**What v1 does:**

- The first version allows students to choose a start and end time. It checks room availability and shows validation messages. It also has testing tools for blocking the room and adding fictional bookings.

## 5. Test cases — executed on both artifacts

<!-- Base for every case unless the row says otherwise: now = 540, blocked = False,
     existing = [(600, 660)]. Do not change the first four columns.
     Python columns: True, False or Error (it raised) — what the call actually returned.
       T11: the result of the SECOND call. T12: n/a.
       Path A: the checker runs both of your files on T1-T11 and compares (C2, C3).
     Page columns: Available, Unavailable or Not testable — what the page actually showed.
     Never write a result you did not observe. -->

| Case | Name | Input | Expected | Python v1 | Python final | Page v1 | Page final |
|---|---|---|---|---|---|---|---|
| T1 | Touching | 660–720 | Available | False | True | Available | Available|
| T2 | Overlap | 630–690 | Unavailable | False | False | Unavailable |Unavailable |
| T3 | Blocked | 660–720, blocked | Unavailable | False | False | Unavailable |Unavailable |
| T4 | Exactly 120 min | 720–840 | Available | True | True | Available |Available |
| T5 | 121 min | 720–841 | Unavailable | False | False | Unavailable | Unavailable|
| T6 | Starts now | 540–570 | Unavailable | True | False | Unavailable | Unavailable|
| T7 | Reversed | 720–660 | Unavailable | False | False | Unavailable | Unavailable|
| T8 | Ends at midnight | 1380–1440 | Available | True | True | Available |Available |
| T9 | Past midnight | 1380–1441 | Unavailable | False | False | Unavailable |Unavailable |
| T10 | Second booking | 720–780, existing (600–660), (700–760) | Unavailable | False | False | Unavailable |Unavailable |
| T11 | Same check twice | 660–720, twice | Available | False | True | Available |Available |
| T12 | Narrow screen | T1 at ~375 px wide | Available | n/a | n/a | Available | Available|

## 6. Traceability

<!-- His table. Implementation / file: where the rule lives (booking.py line, a component).
     Test input: the case IDs from section 5. v1 / final actual: what those cases gave. -->

| AC | Implementation / file | Test input | Expected | v1 actual | Final actual |
|---|---|---|---|---|---|
| AC1 | `code/booking.py`, web/original/src/App.tsx | T6, T7, T8, T9 | Invalid times rejected; midnight allowed | Python T6 failed; page passed | Python and page passed |
| AC2 | `code/booking.py`, web/original/src/App.tsx | T4, T5 | 120 allowed, 121 rejected | Passed | Passed |
| AC3 | `code/booking.py`, web blocked-state logic | T3 | Unavailable | Passed | Passed |
| AC4 | `code/booking.py`, web/final/src/App.tsx | T1, T2, T10 | Touching allowed; overlap rejected | Python T1 failed; page passed | Python and page passed |
| AC5 | `code/booking.py`, web result display | T11 | Available twice, no booking changes | Python T11 failed; page showed Available | Python passed; page showed Available |
| AC6 | Web validation and responsive layout | T5, T6, T7, T12 | Clear errors and usable mobile page | Passed | Passed |


## 7. Issue log

<!-- At least two, from v1 — a functional defect and a usability or code-quality issue where you
     have them. If every case passed on v1, log the preventive cleanup and say why.
     Reproduction names a case (T1-T12) or an AC. Priority: High, Medium or Low.
     Prompt / change: the focused prompt you sent, and what changed. Never "make it better". -->

| # | Issue | Reproduction | Priority | Prompt / change | Retest result |
| --- | --- | --- | --- | --- | --- |
| 1 | Demo booking was missing on first load | AC4, T1 and T2 setup | Medium | Asked Bolt to add a default booking from 10:00 to 11:00 | T1: Available, T2: Unavailable — PASS |
| 2 | Fixed demo time was not clearly labeled | AC6, T6 and T12 | 	Low | Asked Bolt to show a clear fixed demo time label | Label visible, T6: Unavailable, mobile label visible — PASS |

**Before / after:** `evidence/before-1.png` → `evidence/after-1.png` show issue (The first version did not show a default booking from 10:00 to 11:00. It also did not clearly show that 09:00 was a fixed demo time. After the changes, the booking and time label are visible. The website is easier to understand and test.)

## 8. Critique decisions

<!-- The AI's review against AC1-AC6 (stage C), claim by claim. At least three rows.
     How I verified it: the case, test or run that confirmed or refuted the claim.
     Decision: accept, reject or modify. At least one reject or modify — the reflection asks for it. -->

| # | AI claim or recommendation | How I verified it | Decision | Reason (AC or case) |
|---|---|---|---|---|
| 1 | Add a default demo booking from 10:00 to 11:00. | I checked the booking list after opening the page. Then I tested T1 and T2 again. | Accept | The booking is visible and both tests passed. This helps test AC4. |
| 2 | Show that 09:00 is a fixed demo time. | I checked the new label and tested T6. I also checked the mobile screen. | Accept | The label is clear and works on mobile. This improves AC6. |
| 3 | Add a button to create a real booking. | I compared this idea with the project requirements. | Reject | AC5 allows availability checking only. The website must not create bookings. |


## 9. Coding-agent analysis

### 9.1 The loop

<!-- One real pass through the loop from this assignment — with your assistant or with Bolt. -->

| Step | What happened in this assignment |
|---|---|
| User goal | I wanted to create a website that checks room availability for students. |
| Model / plan | I used Bolt.new AI to create the first version of the website with AC1–AC6. |
| Tool call | I sent a prompt to Bolt.new to generate the website. |
| Observation | The website worked, but the default booking and demo time label were missing. |
| Next step | I asked AI to add a default booking and a clear demo time label. |
| Human review | I tested the website with T1–T12 and checked the changes myself. |


### 9.2 Context, tools and permissions

<!-- At least three rows. Last column: Observed (you saw it happen) or Assumed (you infer it
     about the internals). Use both at least once. -->

| Tool | Context it used | Tools or permissions | Observed or assumed |
|---|---|---|---|
| ChatGPT | AC1–AC6 and the Python task | Generated Python code and test examples in the chat | Observed |
| Bolt.new | My prompts and website requirements | Created and edited website files | Observed |
| Bolt.new | Website source code and project context | May use internal tools to understand the project | Assumed |
| PyCharm | Local Python files and tests | Ran Python tests on my Mac | Observed |


### 9.3 Checkpoint and dependability

**Safety checkpoint:** (Before accepting AI changes, I checked that the website did not add login, backend, database or real booking creation. I also tested the main functions again.)

**Reliability, security, responsibility:** (AI can create code quickly, but it can make mistakes. My first Python version failed T1, T6 and T11. I fixed the problems and ran 13 tests successfully. I checked the website on a mobile screen. I am responsible for checking the code and results before submitting my work.)

## 10. Reflection

<!-- 100-200 words, in your own words, no AI. Compare AI-assisted coding (the Python part) with
     vibe coding (the Bolt part); one example each of a reliability, an availability/usability and
     a security risk; why review, tool permissions and tests stay human responsibilities; one AI
     recommendation you rejected or modified, and why; what you would improve next without
     expanding the scope. -->

(In this assignment, I used ChatGPT and Bolt.new to create a room availability checker. ChatGPT helped me write Python code, and Bolt.new helped me create a website. Working with Python was different because I needed to check the code and run tests myself. Bolt.new was easier because it created the website from my prompt.

I found some problems during the work. The first Python version failed three tests: T1, T6 and T11. This was a reliability problem. The website also did not clearly show the demo time, which was a usability problem. A possible security risk was adding unnecessary login or backend features.

I learned that AI can make mistakes, so I must check its work. I rejected the idea of adding a real booking button because the task was only about checking availability. I also checked the results and tested the mobile version.

Next time, I would improve the error messages and make the website easier to use.)

## 11. Appendix A — AI exchanges

<!-- At least four. Complete prompts and complete responses, as text — never screenshots. Paste
     each inside the ~~~~ block that follows its label.
     Stage: Plan, Generate, Critique or Repair (the brief's A-D) — at least one of each.
     Source: this SIS, week-05 or week-06. Reused exchanges keep their original date.
     The Generate exchange for Python must contain your v1 exactly as it is in code/original/.
     Add B5, B6 … if you ran more. -->

### B1

- **Tool:** (ChatGPT)
- **Model:** GPT-6
- **Date:** 2026-11-02
- **Stage:** Plan
- **Source:** this SIS

**Prompt:**

~~~~text
Я не делал practice 5
~~~~

**Response:**

~~~~text
Ничего страшного! ✅ В инструкции SIS 03 прямо написано: если ты не делал Practice #05, можно создать Python v1 с нуля.

Значит, мы будем создавать функцию can_book() заново с помощью AI.
Шаг 3.1 — AI Plan (план разработки)
Сначала нужно получить план от AI, а затем создать первую версию программы. Эти диалоги необходимо сохранить в Section 11 — AI exchanges.
Первый AI-обмен — Plan
Ты можешь использовать наш текущий диалог как первый AI-обмен.

План разработки can_book():
1. Создать Python-функцию с пятью параметрами: start, end, now, blocked, existing.
2. Проверять правильность времени согласно AC1.
3. Проверять, что продолжительность не превышает 120 минут (AC2).
4. Отклонять запрос, если комната заблокирована (AC3).
5. Проверять пересечения со всеми существующими бронированиями (AC4).
6. Возвращать True только при выполнении всех правил, иначе False.
7. Проверить функцию на сценариях T1–T11.
Этот план не добавляет базу данных, регистрацию или реальные бронирования.

Твоя задача: прочитай план и реши, подходит ли он. В отчёте нужно указать, что ты действительно проверил и одобрил его.
~~~~

### B2

- **Tool:** ChatGPT
- **Model:** GPT-6
- **Date:** 2026-11-02
- **Stage:** Generate
- **Source:** this SIS

**Prompt:**

~~~~text
План одобряю
~~~~

**Response:**

~~~~text
Отлично! ✅ План одобрен. Теперь переходим к Stage B — Generate, то есть созданию первой версии Python-кода с помощью AI.

def can_book(start, end, now, blocked, existing):
    if start < 0 or end > 1440:
        return False

    if start >= end:
        return False

    if start < now:
        return False

    if end - start > 120:
        return False

    if blocked:
        return False

    for booking_start, booking_end in existing:
        if start <= booking_end and end >= booking_start:
            return False

    return True

~~~~

### B3

- **Tool:** ChatGPT
- **Model:** GPT-6
- **Date:** 2026-11-02
- **Stage:** Critique
- **Source:** this SIS

**Prompt:**

~~~~text
t1 - available
t2 - unavailable
t3 - unavailable
t4 - available
t5 - a booking can be at most 120 minutes long
t6 - start time must be later than the current time (09:00)
t7 - end time must be after the start time
t8 - available
t9 - unavailabe
t10 - un
t11 - av
t12 - av
~~~~

**Response:**

~~~~text
Отлично! ✅ Ты завершил проверку всех 12 сценариев на первой версии сайта Bolt.new.
Результаты тестирования Web v1
WEB V1 — TEST RESULTS
12/12
Проверки соответствуют ожидаемому поведению



Тест	Фактический результат	Статус
T1	Available	PASS
T2	Unavailable	PASS
T3	Unavailable	PASS
T4	Available	PASS
T5	Validation error	PASS
T6	Validation error	PASS
T7	Validation error	PASS
T8	Available	PASS
T9	Unavailable	PASS
T10	Unavailable	PASS
T11	Available	PASS
T12	Available	PASS

Для T7 сайт показал End time must be after the start time — это правильная реакция. В Section 5 запиши Unavailable, а точное сообщение сохрани как доказательство проверки.

Для T9 и T10 результаты соответствуют ожидаемым, если ты действительно проверил указанные интервалы и добавил второе бронирование для T10.
~~~~

### B4

- **Tool:** Bolt.new
- **Model:** not displayed
- **Date:** 2026-11-02
- **Stage:** Repair
- **Source:** this SIS

**Prompt:**

~~~~text
Improve the existing Smart Campus Room Availability Checker without rebuilding the project.

Issue 1: The demo booking list is empty on first load, so students cannot immediately test overlapping bookings.

Please load one fictional existing booking from 10:00 to 11:00 by default. Keep the test tools available and make the existing booking clearly visible.

Do not change the availability logic or the meaning of AC1-AC6. Do not add login, backend, database, external API, booking confirmation, or a Book button. Preserve the responsive layout.
~~~~

**Response:**

~~~~text


Thoughts
I'll check the sample data and the test panel's rendering before changing anything.


Searched
SAMPLE_BOOKINGS|bookings.map|sample-1
The default booking (10:00 to 11:00) is already in the code, so the empty list you saw is likely a stale view. To make it clearly visible, I'll label it as an existing booking and also show the bookings on the checker card itself.


0123456789
actions taken
The existing 10:00 to 11:00 booking is now shown by default, and it's labeled "Existing booking (fictional)" so it's easy to spot.

The code already loaded this booking, so the empty list you saw was probably an old preview. To make it obvious, the checker card now has a "Booked times today" list above the form, and the Testing tools list shows the same booking. Test tools still work as before, and the availability logic and layout are unchanged. The project type-checks and builds, but I haven't checked it in a browser, so please reload the preview to confirm.
~~~~

## 12. Appendix B — Test output

### 12.1 Your suite

<!-- The complete terminal output of your final suite. Path A: python -m unittest -v, run inside
     code/ — the part ending in "Ran N tests" and OK or FAILED. -->

~~~~text
test_T10_second_booking (test_booking.TestBooking.test_T10_second_booking) ... ok
test_T11_same_check_twice (test_booking.TestBooking.test_T11_same_check_twice) ... ok
test_T1_touching (test_booking.TestBooking.test_T1_touching) ... ok
test_T2_overlap (test_booking.TestBooking.test_T2_overlap) ... ok
test_T3_blocked (test_booking.TestBooking.test_T3_blocked) ... ok
test_T4_exactly_120 (test_booking.TestBooking.test_T4_exactly_120) ... ok
test_T5_121_minutes (test_booking.TestBooking.test_T5_121_minutes) ... ok
test_T6_starts_now (test_booking.TestBooking.test_T6_starts_now) ... ok
test_T7_reversed (test_booking.TestBooking.test_T7_reversed) ... ok
test_T8_midnight (test_booking.TestBooking.test_T8_midnight) ... ok
test_T9_past_midnight (test_booking.TestBooking.test_T9_past_midnight) ... ok
test_end_before_start (test_booking.TestBooking.test_end_before_start) ... ok
test_existing_booking_list_not_extended (test_booking.TestBooking.test_existing_booking_list_not_extended) ... ok
test_existing_booking_order_not_changed (test_booking.TestBooking.test_existing_booking_order_not_changed) ... ok
test_existing_list_unchanged (test_booking.TestBooking.test_existing_list_unchanged) ... ok
test_existing_list_unchanged_when_available (test_booking.TestBooking.test_existing_list_unchanged_when_available) ... ok
test_existing_list_unchanged_when_unavailable (test_booking.TestBooking.test_existing_list_unchanged_when_unavailable) ... ok
test_existing_not_modified_when_blocked (test_booking.TestBooking.test_existing_not_modified_when_blocked) ... ok
test_existing_unchanged_after_two_calls (test_booking.TestBooking.test_existing_unchanged_after_two_calls) ... ok
test_existing_unchanged_on_blocked (test_booking.TestBooking.test_existing_unchanged_on_blocked) ... ok
test_invalid_start_type (test_booking.TestBooking.test_invalid_start_type) ... ok
test_negative_start (test_booking.TestBooking.test_negative_start) ... ok
test_request_contains_booking (test_booking.TestBooking.test_request_contains_booking) ... ok
test_start_at_last_minute (test_booking.TestBooking.test_start_at_last_minute) ... ok
test_start_at_midnight (test_booking.TestBooking.test_start_at_midnight) ... ok
test_start_before_zero_with_now_zero (test_booking.TestBooking.test_start_before_zero_with_now_zero) ... ok
test_start_greater_than_day_limit (test_booking.TestBooking.test_start_greater_than_day_limit) ... ok
test_touching_at_end (test_booking.TestBooking.test_touching_at_end) ... ok
test_zero_duration (test_booking.TestBooking.test_zero_duration) ... ok

----------------------------------------------------------------------
Ran 29 tests in 0.001s


~~~~

### 12.2 Path B only — three faults you planted

<!-- Path A: leave this table as it is. Path B: three rows — the line you broke, the AC it
     breaks, the test that failed. -->

| # | Line you broke | AC | Test that failed |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

## 13. Remaining limitations and known fails

<!-- One row per check ID in submission.yml known_fails, and any limitation you know of.
     If the checker is clean and you know of none, one row that says so. -->

| Check ID or limitation | Why it stays | What I would do next |
|---|---|---|
| X2 | My original AI prompts for B1 and B2 were shorter than 15 words. | Keep the real prompts and explain this limitation. |
