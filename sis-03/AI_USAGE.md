# AI Usage Disclosure — SIS #03

Required by the course academic policy (Generative AI use level **D — AI-integrated**).

I am responsible for checking and testing everything I submit, including AI-generated work.

| Tool | Exact model / plan | Used for | Which files it touched | Reused from |
| --- | --- | --- | --- | --- |
| ChatGPT | GPT-6 | The plan (stage A) | `report.md` | this SIS |
| ChatGPT | GPT-6 | Python v1 (stage B) | `code/original/booking_v1.py` | this SIS |
| Bolt.new | not displayed | Web prototype v1 (stage B) | `web/original/` | this SIS |
| ChatGPT | GPT-6 | Critique (stage C) | `report.md`, `code/booking.py` | this SIS |
| ChatGPT and Bolt.new | GPT-6 / not displayed | Repair (stage D) | `code/booking.py`, `code/test_booking.py`, `web/final/`, `report.md` | this SIS |

**The assistant wrote, or helped write, my tests in `code/`:** yes

ChatGPT helped me write the Python tests in `code/test_booking.py`. I checked the expected results using AC1–AC5, not only the generated code. I ran 29 tests with Python unittest, and all tests passed.

**`code/original/` and `web/original/` hold the AI's first versions exactly as returned:** yes

I saved the first Python version and the first Bolt.new export without changing them.

**Every result in report.md section 5 was actually run or seen, not assumed:** yes

I tested Python v1 and Python final. I also checked the website before and after the changes using T1–T12.

**Everything I submitted, I can explain and defend in class — including the overlap condition and what the agent did in section 9:** yes

I understand the main rules, the Python conditions, the test results and the website changes.

**Anything I accepted from the AI without fully understanding it:**

I used ChatGPT to help write parts of `report.md`, including Section 2 and Section 10. I also used AI to help write the tests. I reviewed the main requirements and test results, but I have not checked every internal detail of the generated website code.

Signed: Malik Bakdaulet

Date: 2026-11-02