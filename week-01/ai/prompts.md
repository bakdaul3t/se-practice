Prompt 1: Build a small program that processes a list of student marks and prints: average, highest, lowest, and pass rate.

AI Reaction: Model did not ask clarifying questions and generated a working application immediately using its own built-in mock/artificial data.

Prompt 2: 85, 23, 45, 90, 92
AI Answer: Task planned

Read your files

Wrote code for your app

src/app/components/GradeStatsClient.tsx

Built your app

What I did

Updated the default student marks to 85, 23, 45, 90, 92 — the app now displays: Average: 67.00%, Highest: 92.0%, Lowest: 23.0%, Pass Rate: 60.0% (3 pass · 2 fail at ≥50% threshold)

Prompt 3: 88, 47, -5, 101, abc, 73, 50, , 100
AI Answer: Updated default student marks to the 5 valid entries from the input: 88, 47, 73, 50, 100 — stats now reflect this dataset
Added an import validation banner showing accepted marks (green badges) and rejected entries with reasons: -5 (negative number), 101 (exceeds 100), abc (non-numeric text), and the blank entry — all clearly flagged
Banner is dismissible and displays inline above the KPI cards

Prompt 4: 10, 20, 30
AI Answer: Updated default student marks to 10, 20, 30 — stats now show: Average: 20.00%, Highest: 30.0%, Lowest: 10.0%, Pass Rate: 0.0% (0 pass · 3 fail at ≥50% threshold)

Prompt 5: abc, , xyz
AI Answer: Updated default marks to empty (no valid entries) after processing "abc, , xyz" — all three flagged as invalid
Import banner now shows 0 accepted and 3 rejected: abc (non-numeric text), (blank) (empty entry), xyz (non-numeric text)
KPI cards display — placeholders since there are no valid marks to process

