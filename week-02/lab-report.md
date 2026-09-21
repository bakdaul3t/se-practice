# Lab report — Practice #02: The Prompt Is an Engineering Input

**Name:Bakdaulet**
**Group: 16:00-19:00**
**Date: 21.09.2026**

> Fill in every section. **Do not delete or renumber the headings** — the grading pass reads them
> by number. If something did not happen, write "did not happen" and why; an empty section and a
> fabricated one are graded the same way.

---

## 1. The frozen experiment

| | |
| --- | --- |
| AI assistant |ChatGPT |
| Exact model name |GPT-5.6 Luna |
| Implementation language |Python |
| Date of the runs |21.09|

**Non-Python students only** — paste your substituted Prompt B text here, so the substitution can
be checked:

```
used python
```

**Confirmations:**

- Each prompt was sent in a **fresh chat**: yes / no
- No follow-up questions were asked before Part 7: yes / no
- Every output was saved **before** any editing: yes / no

---

## 2. Prompt A — minimal

**Prompt sent** (should be exactly one sentence):

```
Write Python code to analyze student grades.
```

**Assumptions the AI made that I never gave it** — list them, one per line. A data format, a pass
threshold, a rounding rule, an input method, an invented feature all count.

1.Assuming a standard 10-point letter grading scale
2.Assuming every student has exactly five assignments or grades.
3.Assuming a rounding rule of two decimal places (:.2f) for all calculated averages.

**Questions it should have asked and did not:**

1.What grading scale and thresholds should be used? 
2.Will all students have the same number of grades/assignments?

**Is the function named `analyze_marks` with the required signature?** no 
— if no, what is it
called: calculate_average, get_letter_grade

**First impression before testing** (one sentence — you will compare this with section 6 later): The code meets the requirements only superficially. It calculates the average for each student and the overall class average. There are no validation functions, which could easily lead to errors.

---

## 3. Prompt B — structured context

**Prompt sent** (paste it in full, including any substitutions):

```
You are a Python developer. Implement analyze_marks(marks, pass_mark=50). Return average, highest, lowest, and pass_rate in a dictionary. Accept marks from 0 to 100; raise ValueError for an empty list, non-numeric values, or out-of-range values. Use no external libraries. Return code plus a short explanation.
```

**What B fixed compared to A:**

1. Prompt B created the exact function needed (analyze_marks(marks, pass_mark=50)) with the right output format. Prompt A only wrote a script for specific students without the required function.
2. Prompt B checks for errors (like empty lists, wrong data types, or numbers outside 0–100), while Prompt A has no input checking at all. 

**What B still leaves open:**

1. Prompt B doesn't say how to round numbers (like averages), leaving them as raw decimals, which can break strict comparisons.
2. It doesn't specify whether a score equal to the pass mark passes (using >= vs >), or how decimal numbers right near the edge are handled.

---

## 4. Prompt C — examples and tests

**What I appended to Prompt B:**

```
Example: analyze_marks([40, 60, 80], 50) → average 60, highest 80, lowest 40,
pass_rate 66.67. Include tests for: one mark, decimals, custom pass_mark, empty list,
text value, and marks below 0 or above 100. State any remaining assumptions before
the code.
```

**Tests the AI wrote for itself** — how many, and which situations do they cover?

| Situation | Covered by the AI's tests? |
| --- | --- |
| one mark |yes |
| decimals |yes |
| custom pass_mark |yes |
| empty list |yes |
| text value | yes|
| below 0 / above 100 |yes |

**Do the AI's own tests pass against the AI's own code?** yes

**Do they agree with the harness in section 6?** yes

**Assumptions C stated explicitly before the code:**
This validates that marks is non-empty and contains only numeric values from 0 to 100. It then calculates the average, highest and lowest marks, and the percentage of marks greater than or equal to pass_mark. No external libraries are used.
---

## 5. Prompt D — my combined prompt

**The complete prompt I wrote** (one message, sent to a fresh chat):

```
You are a Python software engineer. Implement the function analyze_marks(marks, pass_mark=50). 

Requirements:
1. Return a dictionary with exactly these four keys: "average", "highest", "lowest", and "pass_rate".
2. Validation: Accept only numeric marks (integers or floats, rejecting booleans) strictly within the range from 0 to 100 inclusive. Raise a ValueError if the list is empty, if any mark is non-numeric/boolean, if any mark is out of bounds (less than 0 or greater than 100), or if pass_mark is invalid.
3. Logic: A mark passes if it is greater than or equal to pass_mark (mark >= pass_mark).
4. Constraints: Use no external libraries. Ensure robust handling of edge cases (e.g., single-element lists, decimal values). Return clean, well-commented code.
```

**What I deliberately added that A, B and C did not have:**

1.It explicitly stated that a score equal to the pass mark counts as passing (>=), preventing mistakes at the boundary.
2.Added strict type checks to reject booleans (since Python treats True like an integer) and restrict numbers strictly between 0 and 100.
3.Required exact dictionary keys (average, highest, lowest, pass_rate) so the results work properly with the test system.

**The ambiguity I found in the specification, and how I resolved it inside Prompt D:**
In the early prompts, it wasn't clear whether a score of exactly 50 counted as a pass. Prompt A lacked any check for whether the result counted as valid, and there was no clarity regarding the handling of True/False values.

In Prompt D, I explicitly specified that a score of 50 or higher counts as a pass. I prohibited the passing of True/False values ​​and restricted the allowable value range.
---

## 6. Test results — the evidence

Six cases × four prompts. Verdicts are **PASS**, **FAIL** or **ERROR** only.

| # | Call | Required | A | B | C | D |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `analyze_marks([40, 60, 80], 50)` | avg 60 · high 80 · low 40 · rate 66.67 |Error | Pass| Pass| Pass|
| 2 | `analyze_marks([100], 50)` | avg 100 · high 100 · low 100 · rate 100 |Error |Pass |Pass |Pass |
| 3 | `analyze_marks([49.5, 50], 50)` | avg 49.75 · high 50 · low 49.5 · rate 50 |Error | Pass|Pass |Pass |
| 4 | `analyze_marks([], 50)` | raises ValueError |Error |Pass |Pass | Pass|
| 5 | `analyze_marks([40, "60"], 50)` | raises ValueError | Error| Pass| Pass| Pass|
| 6 | `analyze_marks([-1, 50, 101], 50)` | raises ValueError |Error | Pass|Pass |Pass |
| | **Totals** | | 0/6 | 6/6 | 6/6 | 6/6 |

**For every FAIL and ERROR above, one line: what was returned or raised instead.**

| Prompt | Case | What actually happened |
| --- | --- | --- |
|A |All test cases |ERROR: week-02/code/prompt_a.py defines no callable named 'analyze_marks'. |
|B|All test cases | RESULT  6 PASS · 0 FAIL · 0 ERROR   (week-02/code/prompt_b.py)
|
| C| All test cases| RESULT  6 PASS · 0 FAIL · 0 ERROR   (week-02/code/prompt_c.py)
|

### Pasted terminal output — all four runs

> This is the part that makes the table above count. Paste the **whole** output, unedited,
> including the header lines. A table with nothing behind it is not accepted.

**Prompt A**

```
STUDENT GRADE REPORT
----------------------------------------
Alice:
  Grades: [85, 92, 78, 90, 88]
  Average: 86.60
  Letter Grade: B

Bob:
  Grades: [72, 68, 75, 80, 70]
  Average: 73.00
  Letter Grade: C

Charlie:
  Grades: [95, 90, 93, 97, 96]
  Average: 94.20
  Letter Grade: A

Diana:
  Grades: [60, 65, 70, 62, 68]
  Average: 65.00
  Letter Grade: D

----------------------------------------
CLASS STATISTICS
Class Average: 79.70
Highest Average: Charlie (94.20)
Lowest Average: Diana (65.00)
ERROR: week-02/code/prompt_a.py defines no callable named 'analyze_marks'.
All six cases count as ERROR. Record that in lab-report.md.
```

**Prompt B**

```
RESULT  6 PASS · 0 FAIL · 0 ERROR   (week-02/code/prompt_b.py)

```

**Prompt C**

```
RESULT  6 PASS · 0 FAIL · 0 ERROR   (week-02/code/prompt_c.py)
```

**Prompt D**

```
RESULT  6 PASS · 0 FAIL · 0 ERROR   (week-02/code/prompt_d.py)
```

---

## 7. Scoring

0–2 per criterion, using the rubric in `README.md` Part 7.

| Criterion | A | B | C | D |
| --- | --- | --- | --- | --- |
| Correctness (cases passed) | 0| 2|2 |2 |
| Requirement coverage |0 |2 |2 |2 |
| Verifiability (tests) |0 |2 |2 |2 |
| Assumptions stated |1 |2 |1 |2 |
| Noise (2 = none) |0 |1 |1 |2 |
| **Total / 10** |1 |9 |8 |10 |

**Prompt length, in words:** A __7__ · B __47__ · C __87__ · D __114__

**Words added per point gained** — B over A, C over B, D over C. One line on what that ratio says:
B over A
Extremely high word efficiency; adding 40 words yielded a massive +8 point jump by establishing the basic functional requirements.

C over B
Diminishing returns with a slight penalty; adding 40 more words slightly decreased the score (-1 point) due to added complexity or minor overhead.

D over C
High precision and recovery; a targeted addition of 27 words successfully cleared all edge cases and reached the maximum score of 10

---

## 8. Conclusion — 150–200 words

Answer in this order: (1) which prompt scored best, and whether it is the one you would actually
use at work; (2) which single addition bought the most correctness, naming the exact case that
changed verdict; (3) what was pure noise; (4) the ambiguity and your resolution.

Name test cases and real returned values. "More detailed prompts work better" scores zero.

```
(150–200 words)

Deep analysis revealed that Prompt C showed the best result with a score of 10/10. I would definitely use Prompt C in real work. However, we must keep in mind that writing a good prompt is a skill. We need to learn to write prompts in a detailed and precise way, taking all task conditions into account to get the exact result we want.

I think what ensured the highest accuracy was the addition we made in Prompt D. We can see this when comparing Prompts C and D. It also turned out that word count does not directly affect a prompt's result. This is supported by the report: Prompt B had 47 words, while Prompt C had 87 words, yet Prompt B scored 9 and Prompt C scored 8.

Prompt A became pure noise. Because the prompt was not written with specific conditions, it outputted hardcoded text with students and letter grades to the console, along with unnecessary print logic. All the logic for printing pretty lines, hyphen separators, and class statistics was absolute noise for the tests. That is precisely why I gave Prompt A a score of 0 for the Noise criterion in the evaluation table.

It was unclear whether a score equal to the passing mark should be considered successful (>= or >), and Python incorrectly treated boolean values (True) as numbers. This was resolved by adding precise rules and strict type checking directly into the prompt text.



```

**Word count:249**

---

## 9. Two questions for the debrief

Written before class, answered in class.

1.
2.
