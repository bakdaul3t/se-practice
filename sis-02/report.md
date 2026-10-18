# SIS #02 — AI-Assisted UML Modeling: University Course Registration

<!--
  This is the only file you write your report in. README.md tells you what goes where.

  Rules the checker relies on:
  - Do not delete, rename or renumber the ## headings, the ### headings, or the **Label:** words.
  - Replace every "(write here)" and "(paste here)". None may be left when you submit.
  - Comments like this one are ignored by the checker and the word counter. Delete them or leave them.
-->

## 1. Scope and assumptions

<!-- Your FINAL scope statement and assumptions, after reviewing Prompt A's output. Say here
     what is out of scope (payments, prerequisites, timetable clashes, waiting lists,
     cancellation) — section 2 must not mention them. Section 10 keeps your first version. -->

**Scope:** The system allows signed-in university students to browse course offerings for a semester and register for a specific offering. It displays course information and available places, checks capacity and duplicate enrollments, and returns either a registration confirmation or a clear rejection message. Payments, prerequisites, timetable clashes, waiting lists, and cancellation are outside the scope.

**Assumptions:**

1. The system stores Enrollment records in a database and calculates available places by subtracting the current enrollment count from the offering capacity.
2. The system performs duplicate checks, capacity checks, and Enrollment creation atomically to prevent competing requests from exceeding the available capacity.

## 2. User stories and acceptance criteria

<!-- Your APPROVED requirements: Prompt A's draft after your review. Keep the IDs, the three
     story headings and the bullet shape. Every criterion names the rule(s) it maps to,
     e.g. (R2, R4). Two criteria per story. Nothing out of scope.
     Format of a criterion, on one bullet:
     - **AC-03** (R2, R4): Given ..., When ..., Then ... -->

### US-01 — Browse offerings

**US-01:** As a student, I want to browse the electronic course catalog for a semester so that I can view course offerings and their available places before requesting registration.

- **AC-01** (R?): Given student Alice is signed in and the Fall 2026 catalog contains CS101 — Introduction to Programming, Offering A, with a capacity of 30 and 25 enrollments, When Alice browses the catalog, Then the system displays the course code, title, offering, and 5 available places.
- **AC-02** (R?): Given Alice views CS101 Offering A with 5 available places, When she views the offering without requesting registration, Then no Enrollment is created and the enrollment count and available places remain unchanged.

### US-02 — Register for an offering

**US-02:** As a student, I want to register for a specific course offering so that I can secure one available place and receive confirmation of my enrollment.


- **AC-03** (R?): Given Bob is signed in, CS102 Offering B has a capacity of 20 and 19 enrollments, and Bob is not already enrolled, When Bob requests registration, Then the system rechecks availability, creates exactly one Enrollment linking Bob to Offering B, increases the count to 20, updates available places to 0, and returns confirmation.
- **AC-04** (R?): Given CS102 Offering B has exactly one available place and neither Bob nor Alice is enrolled, When both submit competing registration requests, Then the final checks and Enrollment creation occur atomically, exactly one request succeeds and creates one Enrollment, the other receives "course full" without creating an Enrollment, and the count increases by exactly one without exceeding capacity.

### US-03 — Receive a clear rejection

**US-03:** As a student, I want the system to reject registration requests when an offering is full or I am already enrolled so that I receive a clear explanation without creating duplicate or excess enrollments.

- **AC-05** (R?): Given Charlie is signed in and CS103 Offering C has a capacity of 25 with 25 existing enrollments, When Charlie requests registration, Then the system rejects the request with "course full", creates no Enrollment, and leaves the count unchanged at 25.
- **AC-06** (R?): Given Alice already has one Enrollment in CS101 Offering A, When Alice requests registration for the same offering again, Then the system rejects the request with "already enrolled", creates no additional Enrollment, and leaves the enrollment count unchanged.

## 3. Sequence diagram

<!-- The FINAL diagram, rendered. Change .png to .svg if that is what you exported. -->

![Final sequence diagram](models/img/sequence.png)

**Participants:** (write here — each lifeline and what it stands for)

**Atomic operation:** (write here — which messages form the one atomic step: the final duplicate check, the capacity check and the creation of the Enrollment, and why a catalog view reserves nothing)

**Where the Enrollment is created:** (write here — which message, which lifeline, and which class in section 4 it produces)

**Technical lifelines:** (write here — every lifeline that is NOT a class in the class diagram, by name, and why the difference in abstraction is fine. "None" if there are none.)

## 4. Class diagram

<!-- The FINAL diagram, rendered. -->

![Final class diagram](models/img/classes.png)

<!-- One row per association in classes.puml, read in both directions. -->

| Association | Read left to right | Read right to left |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |

**How an Enrollment links a student to an offering:** (write here)

**Capacity constraint:** (write here — and why multiplicity alone cannot express it)

**Uniqueness constraint:** (write here — and why multiplicity alone cannot express it)

## 5. Traceability

<!-- Every rule, including the catalog fields and availability (R1). Column 1: the rule and
     the criteria that cover it, e.g. "R2 + AC-03, AC-04". Column 2: the message, guard,
     class or constraint that shows the rule in YOUR diagrams. Column 3: the T-ID that
     exercises it, or the extra check you did instead (R1 has no T case). -->

| Rule and criterion | Model evidence | Validation case |
| --- | --- | --- |
| R1 + (write here) | (write here) | (write here) |
| R2 + (write here) | (write here) | (write here) |
| R3 + (write here) | (write here) | (write here) |
| R4 + (write here) | (write here) | (write here) |
| R5 + (write here) | (write here) | (write here) |

## 6. Walkthroughs

<!-- Walk each case through YOUR final sequence diagram, message by message. Column 2: the
     actual steps and the state change (count before → after). Column 3 starts with Pass or
     Fail, then the location: the message, guard or note where you saw it. A Fail you
     report honestly is a finding, not a penalty. -->

| Case | Observed path and state change | Judgment and evidence |
| --- | --- | --- |
| T1. Available | (write here) | (write here) |
| T2. Last place | (write here) | (write here) |
| T3. Full | (write here) | (write here) |
| T4. Duplicate | (write here) | (write here) |

## 7. Review decisions

<!-- At least three substantive decisions about Prompt C's critique or your own inspection.
     Decision: accepted / rejected / modified — and what you did. Reason: why, in a full
     sentence. Rule: R1–R5. Do not invent an error to fill the table; a justified rejection
     of advice counts. -->

| AI suggestion or model element | Decision | Reason | Rule |
| --- | --- | --- | --- |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |

## 8. Modeling explanation

<!-- 200–300 words. Your main design choices; how the class diagram and the sequence diagram
     complement each other; why an activity diagram could also help explain the workflow. -->

(write here)

## 9. Reflection

<!-- 150–200 words. Written by you, not by the assistant: where AI helped, one decision you
     made yourself, one remaining limitation. Specific beats flattering. -->

(write here)

## 10. Appendix A — Before AI

<!-- Written BEFORE you run Prompt A, committed and pushed in your first commit, and never
     edited afterwards. This is what you paste into Prompt A as "My initial assumptions". -->

**Scope:** The system allows university students to browse available courses, select a specific course offering, and register for it. It checks available places and duplicate registrations before creating an enrollment. The system confirms successful registrations or explains why a request was rejected. Payments, prerequisites, timetable conflicts, waiting lists, and cancellations are outside the scope

**Initial assumptions:**

1. The system stores enrollment records in a database and calculates available places using the offering capacity and current enrollment count.
2. When multiple students request the last available place simultaneously, the system processes the final registration checks and enrollment creation atomically to prevent overbooking.

## 11. Appendix B — AI exchanges

<!-- Complete prompts and complete responses, as text — never screenshots. Paste each inside
     the ~~~~ block that follows its label: AI responses contain ``` PlantUML blocks, and
     ~~~~ keeps them from breaking this file. Prompts B and C: the prompt text first, then
     the material it refers to ("below", "these two") pasted under it, in the same block.
     You may add B5, B6 … after B4 if you ran more. -->

### B1 — Requirements (Prompt A)

- **Tool:** ChatGPT
- **Model:** GPT-6.1 Sol
- **Date:** 2026-10-18
- **Purpose:** draft 3 user stories and 6 acceptance criteria

<!-- Model: the exact model with its version, as the tool shows it (e.g. "GPT-5 Thinking",
     "Claude Sonnet 4.5"). If the tool does not show it, write: not displayed
     Date: YYYY-MM-DD -->

**Prompt:**

~~~~text
Act as a requirements analyst. Use only this course registration scenario and rules R1–R5: A student browses an electronic course catalog, chooses a course offering and requests registration. Each offering has a limited number of places. A Course describes a subject. A CourseOffering is one scheduled section in one semester. Registration always targets a specific offering. Assume that the student is signed in, the selected offering exists, and its capacity is a positive whole number.

R1. Catalog: Show the course code, title, offering and available places for one semester.
R2. Capacity: Recheck current availability when registering. Enrollment must never exceed the offering's capacity.
R3. Duplicates: A student may have at most one enrollment in the same offering. Reject a repeat request.
R4. Success: Create exactly one Enrollment linking the student and offering, update availability and return a confirmation.
R5. Rejection: Explain "course full" or "already enrolled". Create no enrollment and leave the enrollment count unchanged.

A catalog view does not reserve a place. Model the final checks and enrollment creation as one atomic operation, so competing requests cannot take the same last place. A note describing it is enough. Out of scope: payments, prerequisites, timetable clashes, waiting lists, cancellation. Use fictional students and courses. Treat any extra AI suggestion as a proposal you accept or reject explicitly. My initial assumptions are 1. The system stores enrollment records in a database and calculates available places using the offering capacity and current enrollment count. 2. The system processes final registration checks and enrollment creation atomically when students request the last available place.

Draft 3 user stories and 2 Given / When / Then acceptance criteria for each. Use IDs US-01 to US-03 and AC-01 to AC-06. Map each criterion to rule IDs.

Cover normal and rejection behavior. List uncertainty separately. Do not add excluded features or invent university policies.
~~~~

**Response:**

~~~~text
Course Registration System — User Stories and Acceptance Criteria
1. Initial assumptions
ID	Assumption	Status
A-01	The system stores Enrollment records in a database and calculates available places as the offering capacity minus the current enrollment count.	Accepted
A-02	The system performs final registration checks and enrollment creation atomically, preventing competing requests from taking the same last place.	Accepted
Both assumptions are consistent with rules R1–R5.
2. User stories
US-01 — Browse Course Catalog
User story:
As a student, I want to browse the electronic course catalog for a semester so that I can view course offerings and their available places before requesting registration.
AC-01 — Display course information
Given student Alice is signed in and the catalog contains CS101 — Introduction to Programming, Offering A, in the Fall 2026 semester, with a capacity of 30 and 25 enrollments,
When Alice browses the Fall 2026 course catalog,
Then the system displays the course code (CS101), title (Introduction to Programming), offering (A), and 5 available places.
Rule mapping: R1
AC-02 — Catalog viewing does not reserve a place
Given Alice views CS101, Offering A, which has 5 available places,
When Alice views the offering without submitting a registration request,
Then the system does not create an Enrollment, and the enrollment count and available places remain unchanged.
Rule mapping: R1, R2 (catalog viewing and registration availability distinction)
US-02 — Register for an Available Course Offering
User story:
As a student, I want to register for a specific course offering so that I can secure one available place and receive confirmation of my enrollment.
AC-03 — Successful registration
Given student Bob is signed in, CS102 Offering B has a capacity of 20 and 19 existing enrollments, and Bob is not enrolled in that offering,
When Bob requests registration for CS102 Offering B,
Then the system rechecks availability, creates exactly one Enrollment linking Bob to Offering B, increases the enrollment count to 20, updates available places to 0, and returns a registration confirmation.
Rule mapping: R2, R3, R4
AC-04 — Competing requests for the last place
Given CS102 Offering B has exactly one available place, and neither Bob nor Alice is enrolled in it,
When Bob and Alice submit competing registration requests for that last place,
Then the system processes the final checks and enrollment creation atomically, exactly one request succeeds, exactly one Enrollment is created, and the other request is rejected with "course full". The enrollment count increases by exactly 1 and never exceeds capacity.
Rule mapping: R2, R4, R5
US-03 — Prevent Invalid Registrations
User story:
As a student, I want the system to reject registration requests when an offering is full or I am already enrolled so that I receive a clear explanation without creating duplicate or excess enrollments.
AC-05 — Reject registration when course is full
Given student Charlie is signed in, CS103 Offering C has a capacity of 25 and 25 existing enrollments, and Charlie is not enrolled in it,
When Charlie requests registration for CS103 Offering C,
Then the system rejects the request with "course full", creates no Enrollment, and leaves the enrollment count unchanged at 25.
Rule mapping: R2, R5
AC-06 — Reject duplicate registration
Given Alice already has one Enrollment in CS101 Offering A,
When Alice submits another registration request for the same offering,
Then the system rejects the request with "already enrolled", creates no additional Enrollment, and leaves the enrollment count unchanged.
Rule mapping: R3, R5
3. Requirements traceability matrix
Acceptance criterion	R1	R2	R3	R4	R5
AC-01 — Display catalog	✓				
AC-02 — No reservation on viewing	✓	✓			
AC-03 — Successful registration		✓	✓	✓	
AC-04 — Competing requests		✓		✓	✓
AC-05 — Course full		✓			✓
AC-06 — Duplicate enrollment			✓		✓
All five rules are covered, including normal registration, duplicate rejection, full-capacity rejection, and competing requests.
4. Atomic operation note
The system must perform the duplicate-enrollment check, current-capacity check, and Enrollment creation as one atomic database operation.
For example, when Bob and Alice request the last available place simultaneously, only one registration can succeed. The other must receive "course full". This ensures that enrollment never exceeds capacity.
The catalog view does not reserve a place, so availability may change between browsing and registration.
5. Uncertainties
ID	Uncertainty	Treatment
U-01	If a student is already enrolled in an offering that is also full, which rejection message should take priority?	Unresolved. R3 and R5 require duplicate rejection, while R2 and R5 cover full offerings. No priority is specified.
U-02	Must the catalog display availability from a fresh database calculation on every view?	Unresolved. R1 requires available places to be shown, while R2 explicitly requires rechecking at registration.
U-03	What information must the registration confirmation contain beyond confirming success?	Unresolved. R4 requires a confirmation but does not define its format.
These uncertainties do not prevent drafting the acceptance criteria and should not be treated as additional university policies.
6. AI suggestions and decisions
Proposal	Decision	Reason
Calculate availability as capacity minus current enrollment count.	Accepted	Matches initial assumption A-01 and supports R1 and R2.
Use an atomic transaction for final registration checks and Enrollment creation.	Accepted	Matches A-02 and prevents over-enrollment under R2.
Specify a priority between "already enrolled" and "course full" when both apply.	Rejected for now	The scenario does not define a priority. Retained as uncertainty U-01.
Add waiting lists or automatic course recommendations.	Rejected	Outside the defined scope.
Conclusion: The three user stories and six acceptance criteria address catalog browsing, successful enrollment, full-capacity rejection, duplicate rejection, and concurrent registration. They follow R1–R5 without introducing additional university policies or excluded features.
~~~~

### B2 — UML drafts (Prompt B)

- **Tool:** ChatGPT
- **Model:** GPT-6.1 Sol
- **Date:** 2026-10-18
- **Purpose:** draft the sequence and class diagrams

**Prompt:**

~~~~text
Using my approved scenario, R1–R5, stories and criteria below, return separate PlantUML code blocks for a sequence diagram and a domain class diagram.
Sequence: include catalog browsing and guarded success, full-course and duplicate outcomes. Model final checks and creation as one atomic operation.
Class: show domain concepts, useful attributes and multiplicities. State the capacity and uniqueness constraints. Explain assumptions and any technical lifelines.

Approved scenario:
A signed-in university student browses an electronic course catalog for one semester, selects a specific course offering and requests registration. Each offering has a limited capacity. A Course describes a subject, while a CourseOffering represents one scheduled section in one semester. The selected offering exists and its capacity is a positive integer. Viewing the catalog does not reserve a place. Final duplicate and capacity checks and Enrollment creation must be atomic.

R1 — Catalog: Display course code, title, offering and available places for one semester.
R2 — Capacity: Recheck current availability during registration. Enrollment must never exceed capacity.
R3 — Duplicates: Reject repeated registration in the same offering.
R4 — Success: Create exactly one Enrollment linking the student and offering, update available places and return confirmation.
R5 — Rejection: Return "course full" or "already enrolled" without creating an Enrollment or changing the count.

Out of scope: payments, prerequisites, timetable clashes, waiting lists and cancellation.

Approved user stories and acceptance criteria:

US-01 — Browse offerings
As a student, I want to browse the electronic course catalog for a semester so that I can view course offerings and their available places before requesting registration.

AC-01 (R1): Given Alice is signed in and the Fall 2026 catalog contains CS101, Introduction to Programming, Offering A, with capacity 30 and 25 enrollments, When Alice browses the catalog, Then the system displays the code, title, offering and 5 available places.

AC-02 (R1, R2): Given Alice views CS101 Offering A with 5 available places, When she views the offering without requesting registration, Then no Enrollment is created and availability remains unchanged.

US-02 — Register for an offering
As a student, I want to register for a specific course offering so that I can secure one available place and receive confirmation.

AC-03 (R2, R3, R4): Given Bob is signed in, CS102 Offering B has capacity 20 and 19 enrollments, and Bob is not enrolled, When Bob requests registration, Then the system rechecks availability, creates exactly one Enrollment linking Bob to Offering B, updates the count to 20 and available places to 0, and confirms registration.

AC-04 (R2, R4, R5): Given CS102 Offering B has exactly one available place, and neither Bob nor Alice is enrolled, When both submit competing requests, Then the final checks and Enrollment creation happen atomically, only one request succeeds, one Enrollment is created, the other receives "course full", and capacity is never exceeded.

US-03 — Receive a clear rejection
As a student, I want invalid registrations rejected with a clear explanation without creating duplicate or excess enrollments.

AC-05 (R2, R5): Given Charlie is signed in and CS103 Offering C has capacity 25 and 25 enrollments, When Charlie requests registration, Then the system returns "course full", creates no Enrollment, and leaves the count at 25.

AC-06 (R3, R5): Given Alice is already enrolled in CS101 Offering A, When Alice requests registration for that offering again, Then the system returns "already enrolled", creates no additional Enrollment, and leaves the enrollment count unchanged.
~~~~

**Response:**

~~~~text
Below are two separate PlantUML diagrams based strictly on your approved scenario, R1–R5, US-01–US-03, and AC-01–AC-06.
1. Sequence Diagram — Course Registration
This diagram includes catalog browsing, registration, duplicate rejection, full-course rejection, successful enrollment, and atomic processing of competing requests.

@startuml
title Course Registration - Sequence Diagram

autonumber

actor Student
boundary "Course Catalog UI" as UI
control "Registration Service" as RS
database "Registration Database" as DB

== Browse Catalog (US-01) ==

Student -> UI: Browse offerings(semester)
UI -> DB: Get offerings for semester
DB --> UI: Course code, title, offering,\ncapacity, enrollment count
UI -> UI: Calculate available places\n= capacity - enrollment count
UI --> Student: Display catalog with available places

note over Student, DB
Viewing the catalog does not reserve a place.
No Enrollment is created or changed.
AC-01, AC-02
end note

== Register for Offering (US-02, US-03) ==

Student -> UI: Select offering and request registration
UI -> RS: register(studentId, offeringId)

note over RS, DB
ATOMIC TRANSACTION
Lock the selected offering or use equivalent
serializable concurrency control.
All checks and creation occur atomically.
Competing requests cannot take the same last place.
end note

RS -> DB: BEGIN TRANSACTION
RS -> DB: Lock offering and read current state
DB --> RS: Capacity, current enrollment count

RS -> DB: Check existing Enrollment\n(studentId, offeringId)
DB --> RS: Duplicate status

alt Already enrolled (AC-06)
    RS -> DB: ROLLBACK
    RS --> UI: "already enrolled"
    UI --> Student: Display rejection

else Not already enrolled
    alt Course full (AC-05, AC-04 loser)
        RS -> DB: ROLLBACK
        RS --> UI: "course full"
        UI --> Student: Display rejection

    else Place available (AC-03, AC-04 winner)
        RS -> DB: Create one Enrollment\n(studentId, offeringId)
        DB --> RS: Enrollment created

        note over RS, DB
        Enrollment count increases by 1.
        Available places decrease by 1.
        end note

        RS -> DB: COMMIT
        DB --> RS: Transaction committed

        RS --> UI: Registration confirmed
        UI --> Student: Display confirmation\nand updated availability
    end
end

note over RS, DB
Rejection: no Enrollment created;
enrollment count remains unchanged.

Success: exactly one Enrollment created;
enrollment count never exceeds capacity.
end note

@enduml



Sequence diagram explanation
- US-01: The student browses the catalog for one semester and sees the course code, title, offering, and available places. Browsing does not create an enrollment.
- US-02: Registration targets a specific CourseOffering. The system rechecks the current count inside an atomic transaction.
- US-03: The system checks for an existing enrollment first. If one exists, it returns "already enrolled". Otherwise, if capacity is reached, it returns "course full".
- AC-04: Competing requests for the last available place are serialized by the transaction's locking or equivalent concurrency control. Only one can succeed.
The transaction begins before the final checks and commits only after successful Enrollment creation. A rejection rolls back without changing the enrollment count.
2. Domain Class Diagram — Course Registration
This diagram contains the domain concepts Student, Course, CourseOffering, Semester, and Enrollment, with attributes, multiplicities, and constraints.

@startuml
title Course Registration - Domain Class Diagram

skinparam classAttributeIconSize 0
hide methods

class Student {
    +studentId: String
    +name: String
}

class Course {
    +courseCode: String
    +title: String
}

class Semester {
    +semesterId: String
    +name: String
    +year: Integer
}

class CourseOffering {
    +offeringId: String
    +section: String
    +capacity: Integer
    +/enrollmentCount: Integer
    +/availablePlaces: Integer
}

class Enrollment {
    +enrollmentId: String
    +createdAt: DateTime
}

Course "1" -- "0..*" CourseOffering : has
Semester "1" -- "0..*" CourseOffering : schedules

Student "1" -- "0..*" Enrollment : holds
CourseOffering "1" -- "0..*" Enrollment : receives

note right of CourseOffering
R2 - Capacity constraint:
capacity > 0

enrollmentCount =
number of linked Enrollments

availablePlaces =
capacity - enrollmentCount

0 <= enrollmentCount <= capacity

/ indicates a derived attribute.
end note

note bottom of Enrollment
R3 - Uniqueness constraint:
Each (studentId, offeringId)
pair must be unique.

A Student may have at most
one Enrollment per CourseOffering.
end note

note bottom of Student
The Student is already signed in
before browsing or registration.
Authentication is out of scope.
end note

@enduml



Class diagram explanation
Class	Responsibility
Student	Represents the signed-in university student.
Course	Describes a subject using its course code and title.
CourseOffering	Represents one scheduled section of a Course in a particular Semester.
Semester	Identifies the academic semester used to browse offerings.
Enrollment	Records the registration relationship between one Student and one CourseOffering.
Multiplicities and constraints
- One Course can have zero or many CourseOffering objects; each offering belongs to exactly one Course.
- One Semester can contain zero or many offerings; each offering belongs to exactly one Semester.
- One Student can have zero or many enrollments; each Enrollment belongs to exactly one Student.
- One CourseOffering can receive zero or many enrollments; each Enrollment refers to exactly one offering.
Capacity invariant (R2):
\[
0 \leq \text{enrollmentCount} \leq \text{capacity}
\]

\[
\text{availablePlaces} = \text{capacity} - \text{enrollmentCount}
\]

Uniqueness invariant (R3):
\[
\operatorname{unique}(\text{studentId},\text{offeringId})
\]

These invariants must hold after every completed registration operation. A database uniqueness constraint on (studentId, offeringId) provides an additional safeguard against duplicates.
3. Assumptions and technical lifelines
Assumptions: The student is already authenticated, the selected offering exists, and its capacity is a positive integer. Availability is derived from the number of existing Enrollments rather than maintained as an independent domain attribute. Duplicate checking takes priority over capacity checking, so an already-enrolled student receives "already enrolled" even if the offering is full.
Technical lifelines: Course Catalog UI is a boundary component that handles student interaction. Registration Service is a control component responsible for registration rules and atomic transaction coordination. Registration Database stores the domain objects and enforces persistence and transaction consistency. These are technical participants in the sequence diagram, not additional domain classes.
Concurrency assumption: A transaction locks the selected offering before reading the current enrollment count and checking for duplicates. The lock remains effective until commit or rollback. An equivalent concurrency-control mechanism is also acceptable if it guarantees the same atomic behavior.
Scope: Payments, prerequisites, timetable clashes, waiting lists, and cancellation are intentionally excluded.
Together, the diagrams cover R1–R5, US-01–US-03, and AC-01–AC-06, including the one-place concurrency case in AC-04.
~~~~

### B3 — Model critique (Prompt C)

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Purpose:** review both models against R1–R5 and T1–T4

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

### B4 — Focused revision (Prompt D)

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Purpose:** apply my accepted review decisions

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

## 12. Appendix C — Original diagrams

<!-- The AI's first output from Prompt B, rendered unedited from models/original/. -->

![Original sequence diagram](models/img/original-sequence.png)

![Original class diagram](models/img/original-classes.png)

## 13. Appendix D — References and source checks

### References

<!-- Full references, one per line, each starting with "- ". Only sources you actually opened.
     Every URL used in the source checks must also appear here. Example:
     - Sommerville, I. (2016). Software Engineering, 10th ed., Global Edition. Pearson. Ch. 5. -->

- (write here)

### Source checks

<!-- At least two modeling decisions you verified. Source and locator: title + slide, page,
     section, chapter or figure — or title + URL + access date (YYYY-MM-DD). Slide numbers
     refer to the decks posted in our Teams. -->

| Modeling decision | Source and locator | What the source says | How it supports or changed your model |
| --- | --- | --- | --- |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |
