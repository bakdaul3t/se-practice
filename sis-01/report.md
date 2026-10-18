# SIS #01 — Software Engineering Fundamentals, With an AI in the Loop

<!--
  This is the only file you write your report in. README.md tells you what goes where.

  Rules the checker relies on:
  - Do not delete, rename or renumber the ## headings, the ### headings, or the **Label:** words.
  - Replace every "(write here)" and "(paste here)". None may be left when you submit.
  - Comments like this one are ignored by the word counter. Delete them or leave them.
-->

**Topic:** 1.7

<!-- Exactly one of 1.1 … 1.10, e.g.  **Topic:** 1.4  -->

---

## 1. Scenario

<!-- 100–150 words, labels included. One small scenario, used in every prompt and in your
     whole answer. Anything fictional is labelled in Assumptions. -->

**Question:** How can online collaboration tools help a distributed software development team work efficiently and maintain software quality?

**Users:** Four university students developing a classroom booking application for students and teachers.

**Problem:** The developers work from different locations and have different schedules. They need to share code, coordinate tasks, communicate effectively, and avoid conflicts when modifying the same files.

**Constraints:** First, the team must complete the project within two weeks. Second, some team members have limited experience with Git and collaborative software development.

**Risk:** Unreviewed code changes or poor communication could introduce bugs, resulting in incorrect classroom reservations or double bookings.

**Assumptions:** This is a fictional university project with four student developers. The application, development deadline, team experience, and working conditions are hypothetical. The team is assumed to use GitHub for version control, pull requests, and task management.

## 2. Analysis

<!-- 350–400 words. Your answer to the question, the trade-offs, and how it applies to your
     scenario. Explain at least two engineering decisions and why they fit the scenario. -->


Online collaboration tools can support a distributed software development team by making responsibilities, code changes, and decisions visible. In our fictional scenario, four university students have two weeks to build a classroom booking application. They work at different times, and some have limited Git experience. Their priority should be a reliable application rather than many optional features.
The first engineering decision is to use GitHub Issues to organise tasks and document important decisions. Each issue should describe a feature, its owner, and completion criteria. Students may specialise in frontend, backend, database, and testing coordination, but everyone should test their work. This avoids leaving all testing to one person at the end. Written updates are valuable when team members cannot attend the same meeting. However, an issue board cannot guarantee that tasks will be finished on time.
The second decision is to adopt a simple Git workflow: short-lived branches, small pull requests, and peer reviews before merging. GitHub documentation describes pull requests as a way to propose, discuss, and review changes. A reviewer could check whether new code handles cancellation and overlapping reservations and whether relevant tests pass. This process adds review time, but it may help the team notice problems before integration. Because Git is unfamiliar to some students, a short practice exercise is preferable to a complicated branching policy. Git documentation also explains that some changes merge automatically while conflicting edits may need manual resolution. Editing the same file does not always cause a conflict.
A separate engineering priority is preventing incorrect reservations. Git manages source-code changes; it does not stop two people from booking the same room. The application needs booking logic and suitable database safeguards. Students should test both sequential overlapping requests and simultaneous attempts to reserve one classroom. Only one conflicting booking should succeed. The exact safeguard cannot be chosen confidently without knowing the database design, and tests do not prove that every defect is absent.
Communication should combine chat messages with recorded decisions in GitHub Issues. Brief meetings can address blockers, but frequent meetings would consume development time. During week one, the team should practise essential Git commands and implement core booking functions. Week two should prioritise integration, focused review, testing, and corrections. This schedule is a proposal rather than proof of feasibility. Overall, online tools provide useful coordination mechanisms, while software quality still depends on implementation, verification, and responsible teamwork.

## 3. Review

<!-- 250–300 words. What Prompt B's critique said and what you did with it; your two source
     checks and your two substantive revisions, each with a reason. Point at the rows of the
     tables in section 9 ("verification row 2", "change-log row 1"). -->

Prompt B identified eight weaknesses in the original analysis. I accepted six concerns and qualified two. First, I accepted that Git branches cannot prevent double bookings, because Git manages source-code changes rather than reservations. I also accepted that general code reviews may miss booking errors and that testing must cover simultaneous requests, not only bookings made one after another. These points led me to recommend a focused review checklist and separate concurrency tests.

I accepted the criticism that our two-week deadline lacked clear priorities. In the revised plan, the team develops essential booking features first and reserves time for integration and corrections. I also accepted that group chats alone are insufficient for coordination: important decisions and blockers should be recorded in GitHub Issues. Finally, I accepted that the original claims about improved efficiency were too confident; tool features do not automatically produce better teamwork.

I qualified concern five rather than rejecting the testing role entirely. A testing coordinator can organise integration checks, while every developer remains responsible for testing their changes. I also qualified concern eight: limited Git experience justifies basic training and short-lived branches, not abandoning version control.

I checked two factual claims using documentation I opened myself. Verification row 1 supports the statement that GitHub pull requests allow proposed changes to be discussed and reviewed, so I marked it keep. Verification row 2 shows that Git may merge changes automatically but sometimes requires manual conflict resolution. I marked that claim qualify because editing the same file does not always create a conflict.

Change-log row 1 distinguishes Git conflicts from booking conflicts. Change-log row 2 replaces vague peer review with targeted checks and shared testing responsibilities. Both revisions make the recommendations more specific to our fictional project, although their effectiveness remains unproven without implementation and testing.

## 4. Conclusion

<!-- 100–150 words. Your recommendation for the scenario and its main limitation. -->

In conclusion, online collaboration tools can help a small distributed development team organise work, communicate effectively, and maintain software quality. For our fictional classroom booking project, I recommend using GitHub Issues for task management, short-lived Git branches for development, and pull requests for reviewing changes before merging.

The team should also document important decisions, share testing responsibilities, and prioritise the prevention of double bookings. Both sequential and simultaneous reservation requests should be tested to identify potential problems. A simple workflow is particularly important because the students have limited Git experience and only two weeks to complete the application.

However, the main limitation is that collaboration tools cannot guarantee software correctness or successful project completion. Their effectiveness depends on the team's skills, communication, implementation choices, and available time. Therefore, reliable booking functionality should take priority over additional features.

## 5. Reflection

<!-- 150–200 words. NOT part of the main total. Written by you, not by the assistant:
     what helped, what you changed, what you learned. Specific beats flattering. -->

During this assignment, I learned more about software engineering and how developers can work together on one project. Before this task, I knew some basic things about GitHub, but I did not fully understand how branches, pull requests, and code reviews help a team.

Using ChatGPT made the assignment easier to understand. Prompt A helped me explore the topic, while Prompt B showed me some problems in the first explanation. I learned that Git can help developers manage code changes, but it cannot prevent errors like double bookings in an application.

The most useful part was checking information using official GitHub and Git documentation. It helped me understand why I should not trust every statement generated by AI without verification.

Prompt C helped me improve the analysis by including more specific recommendations about testing, communication, and task management.

The most difficult part was understanding how to evaluate AI suggestions and decide which ones were correct. Next time, I would check sources earlier and spend more time reviewing the first draft.

Overall, this assignment helped me understand teamwork and the importance of critical thinking when using AI.

## 6. References

<!-- Full references, one per line, each starting with "- ". Only sources you actually opened.
     Every URL used in the verification table must also appear here. Example:
     - Sommerville, I. (2016). Software Engineering, 10th ed., Global Edition. Pearson. Ch. 1.
-->

- Git, git-merge Documentation, section HOW CONFLICTS ARE PRESENTED, https://git-scm.com/docs/git-merge, accessed 2026-10-12.
- GitHub Docs, Pull requests, https://docs.github.com/en/pull-requests/reference/pull-requests, accessed 2026-10-12.

## 7. Appendix A — Initial outline

<!-- Written BEFORE you run Prompt A. Five points, your own words, numbered. These are the
     "five points" you paste into Prompt A. -->

1. Task Distribution: Each student should have a specific responsibility, such as frontend development, backend development, database management, or testing.
2. GitHub Collaboration: Team members should work on separate Git branches to avoid conflicts and use pull requests to combine their changes.
3. Communication: The team should use a group chat and regular online meetings to discuss progress, problems, and deadlines.
4. Code Review: Before merging changes into the main branch, another team member should review the code to identify possible mistakes.
5. Software Quality: The team should test the classroom booking system regularly to prevent double bookings and ensure that reservations work correctly.

## 8. Appendix B — AI exchanges

<!-- Complete prompts and complete responses, as text — never screenshots. Paste each inside
     the fenced block that follows its label. If a response itself contains ``` lines, open
     and close that block with ~~~~ instead. You may add B4, B5 … after B3 if you ran more. -->

### B1 — Draft (Prompt A)

- **Tool:** ChatGPT
- **Model:** GPT-6.1 Sol
- **Date:** 2026-10-12
- **Purpose:** contextual draft

<!-- Model: the exact model with its version, as the tool shows it (e.g. "GPT-5 Thinking",
     "Claude Sonnet 4.5"). If the tool does not show it, write: not displayed
     Date: YYYY-MM-DD -->

**Prompt:**

```text
Act as a software engineering tutor. Help me analyze topic 1.7 — Connected development teams: How can online collaboration tools help a distributed software development team work efficiently and maintain software quality? for a first-year-level university assignment.

My scenario is four university students developing a fictional classroom booking application. The developers work from different locations and have different schedules. They need to share code, coordinate tasks, communicate effectively, and avoid conflicts when modifying the same files. The first constraint is that the project must be completed within two weeks. The second constraint is that some team members have limited experience with Git and collaborative software development. The main risk is that unreviewed code changes or poor communication could cause incorrect reservations or double bookings. My initial ideas are 1) Each student should have a specific responsibility, such as frontend development, backend development, database management, or testing. 2) Team members should work on separate Git branches to avoid conflicts and use pull requests to combine their changes. 3) The team should use a group chat and regular online meetings to discuss progress, problems, and deadlines. 4) Before merging changes into the main branch, another team member should review the code to identify possible mistakes. 5) The team should test the classroom booking system regularly to prevent double bookings and ensure that reservations work correctly. Draft a 400–500 word explanation using these details.

Separate facts from assumptions. Explain trade-offs and identify claims I should verify. Do not invent quotations, references or page numbers.
```

**Response:**

```text
Topic 1.7 — Connected Development Teams
Assignment question: How can online collaboration tools help a distributed software development team work efficiently and maintain software quality?
Draft explanation · Approximately 460 words
Connected Development Teams: Online Collaboration and Software Quality
Online collaboration tools help distributed software development teams work efficiently by supporting communication, task management, code sharing, and quality control. This is particularly important when team members work from different locations and follow different schedules. For example, four university students developing a classroom booking application within two weeks need a clear approach to collaboration to complete the project successfully.
Firstly, assigning responsibilities can improve efficiency. Each student could focus on a specific area: frontend development, backend development, database management, or testing. A task management tool such as Trello or GitHub Issues could help the team assign tasks, set deadlines, and monitor progress. This would reduce confusion about responsibilities. However, dividing responsibilities too strictly could create problems if one student becomes unavailable. Therefore, team members should understand the basic functions of other parts of the application and help each other when necessary.
Secondly, Git and GitHub can support collaborative coding. Each developer could work on a separate Git branch before combining their changes through pull requests. This approach helps keep unfinished changes separate from the main codebase and provides opportunities to identify conflicts before merging. However, branches do not completely prevent merge conflicts, especially when students modify the same files. Because some team members have limited Git experience, the team should agree on simple procedures and practise essential commands before starting major development tasks.
Thirdly, effective communication is essential. The students could use a group chat, such as Discord or Microsoft Teams, for quick questions and updates. Short online meetings could help them discuss progress, technical problems, and upcoming deadlines. Since their schedules differ, important decisions should also be recorded in a shared document or task board. Although regular meetings improve coordination, excessive meetings could reduce development time, particularly during a two-week project.
Fourthly, code reviews can help maintain software quality. Before merging a pull request into the main branch, another student should examine the changes for possible mistakes. For example, a reviewer could check whether the booking logic correctly handles classroom availability. Peer review may also help inexperienced developers learn from each other. However, reviewing every small change could slow progress, so reviews should remain focused and manageable.
Finally, regular testing is necessary to reduce booking errors. The team should test whether students can create, view, and cancel reservations correctly. A particularly important test is whether two users can reserve the same classroom for overlapping times. Automated tests could help identify repeated problems after code changes. Nevertheless, testing cannot guarantee that every defect will be discovered.
Overall, combining task management, version control, communication, peer review, and testing could help the students complete their application efficiently while reducing the risk of incorrect reservations and double bookings.




1. Facts vs. assumptions
For academic writing, it is important to distinguish established technical principles from details that are hypothetical or need evidence.
Category	Examples
Scenario facts	Four students, different locations and schedules, two-week deadline, limited Git experience, risk of double bookings. These are given conditions of the fictional scenario.
Technical facts	Git supports branching and merging. GitHub pull requests support reviewing proposed changes. Automated tests can check expected software behaviour.
Assumptions	All four students can access GitHub, the team can arrange online meetings, and everyone has enough time to review changes.
Proposals	Assign four development roles, use Trello or GitHub Issues, require peer reviews, and regularly test booking conflicts.
2. Important trade-offs
- Specialisation vs. flexibility: Assigning roles improves accountability but can make the project dependent on individual students.
- Git branches vs. complexity: Branches help isolate work but require training and do not eliminate merge conflicts.
- Communication vs. development time: Meetings help coordination, but asynchronous messages may be more practical for different schedules.
- Code reviews vs. deadlines: Reviews can identify defects but require time, especially with inexperienced team members.
- Testing vs. feature development: Testing reduces risk but leaves less time for adding features. Booking accuracy should take priority over optional functionality.
3. Claims to verify with sources
For your final assignment, look for reliable documentation supporting these claims:
Claim to verify	Suggested source
Branching and pull requests support collaborative development and code review.	GitHub documentation — Pull requests
Merge conflicts can occur when developers make incompatible changes.	Git documentation — Merging
Automated testing can detect defects and regressions.	Software testing textbook or university course materials
Task boards improve visibility of responsibilities and progress.	Project management research or official tool documentation
Peer code review can improve software quality.	Peer-reviewed software engineering research
These are suggested sources to consult, not references that have already been checked or verified for specific claims.
4. How to strengthen your assignment
The most important improvement would be to explain how the tools directly address the two-week deadline and the risk of double bookings, rather than simply describing their features.
For example, your analysis could recommend a simple two-week plan: use the first week for core functionality and Git training, then the second week for integration, peer review, and testing. This is a proposed schedule, not a guarantee that development will finish on time.
Also, distinguish between preventing code conflicts and preventing booking conflicts. Git helps developers manage changes to source code, but it cannot itself prevent two users from booking the same classroom. That requires correct application logic, appropriate database safeguards, and testing.
The draft is suitable for a first-year university assignment because it explains the main tools, applies them to the scenario, and acknowledges their limitations. Before submission, add references for the technical claims using your university's required citation style.
```

### B2 — Critique (Prompt B)

- **Tool:** ChatGPT
- **Model:** GPT-6.1 Sol
- **Date:** 2026-10-12
- **Purpose:** critical review of the draft

**Prompt:**

```text
Review the draft below against my chosen question and scenario. Identify inaccuracies, missing reasoning, vague claims and unsupported assumptions.
For each concern, explain why it matters and how I could check it. Include a counterexample or alternative interpretation. Do not rewrite the answer yet.
Question: How can online collaboration tools help a distributed software development team work efficiently and maintain software quality?. Scenario: Four university students are developing a fictional classroom booking application. The developers work from different locations and have different schedules. They need to share code, coordinate tasks, communicate effectively, and avoid conflicts when modifying the same files. The first constraint is that the project must be completed within two weeks. The second constraint is that some team members have limited experience with Git and collaborative software development. The main risk is that unreviewed code changes or poor communication could cause incorrect reservations or double bookings. Draft:

Topic 1.7 — Connected Development Teams

Assignment question: How can online collaboration tools help a distributed software development team work efficiently and maintain software quality?

Draft explanation · Approximately 460 words

Connected Development Teams: Online Collaboration and Software Quality

Online collaboration tools help distributed software development teams work efficiently by supporting communication, task management, code sharing, and quality control. This is particularly important when team members work from different locations and follow different schedules. For example, four university students developing a classroom booking application within two weeks need a clear approach to collaboration to complete the project successfully.

Firstly, assigning responsibilities can improve efficiency. Each student could focus on a specific area: frontend development, backend development, database management, or testing. A task management tool such as Trello or GitHub Issues could help the team assign tasks, set deadlines, and monitor progress. This would reduce confusion about responsibilities. However, dividing responsibilities too strictly could create problems if one student becomes unavailable. Therefore, team members should understand the basic functions of other parts of the application and help each other when necessary.

Secondly, Git and GitHub can support collaborative coding. Each developer could work on a separate Git branch before combining their changes through pull requests. This approach helps keep unfinished changes separate from the main codebase and provides opportunities to identify conflicts before merging. However, branches do not completely prevent merge conflicts, especially when students modify the same files. Because some team members have limited Git experience, the team should agree on simple procedures and practise essential commands before starting major development tasks.

Thirdly, effective communication is essential. The students could use a group chat, such as Discord or Microsoft Teams, for quick questions and updates. Short online meetings could help them discuss progress, technical problems, and upcoming deadlines. Since their schedules differ, important decisions should also be recorded in a shared document or task board. Although regular meetings improve coordination, excessive meetings could reduce development time, particularly during a two-week project.

Fourthly, code reviews can help maintain software quality. Before merging a pull request into the main branch, another student should examine the changes for possible mistakes. For example, a reviewer could check whether the booking logic correctly handles classroom availability. Peer review may also help inexperienced developers learn from each other. However, reviewing every small change could slow progress, so reviews should remain focused and manageable.

Finally, regular testing is necessary to reduce booking errors. The team should test whether students can create, view, and cancel reservations correctly. A particularly important test is whether two users can reserve the same classroom for overlapping times. Automated tests could help identify repeated problems after code changes. Nevertheless, testing cannot guarantee that every defect will be discovered.

Overall, combining task management, version control, communication, peer review, and testing could help the students complete their application efficiently while reducing the risk of incorrect reservations and double bookings.

1. Facts vs. assumptions

For academic writing, it is important to distinguish established technical principles from details that are hypothetical or need evidence.

Category — Examples

Scenario facts — Four students, different locations and schedules, two-week deadline, limited Git experience, risk of double bookings. These are given conditions of the fictional scenario.

Technical facts — Git supports branching and merging. GitHub pull requests support reviewing proposed changes. Automated tests can check expected software behaviour.

Assumptions — All four students can access GitHub, the team can arrange online meetings, and everyone has enough time to review changes.

Proposals — Assign four development roles, use Trello or GitHub Issues, require peer reviews, and regularly test booking conflicts.

2. Important trade-offs

- Specialisation vs. flexibility: Assigning roles improves accountability but can make the project dependent on individual students.
- Git branches vs. complexity: Branches help isolate work but require training and do not eliminate merge conflicts.
- Communication vs. development time: Meetings help coordination, but asynchronous messages may be more practical for different schedules.
- Code reviews vs. deadlines: Reviews can identify defects but require time, especially with inexperienced team members.
- Testing vs. feature development: Testing reduces risk but leaves less time for adding features. Booking accuracy should take priority over optional functionality.

3. Claims to verify with sources

For your final assignment, look for reliable documentation supporting these claims:

Claim to verify — Suggested source

Branching and pull requests support collaborative development and code review. — GitHub documentation — Pull requests

Merge conflicts can occur when developers make incompatible changes. — Git documentation — Merging

Automated testing can detect defects and regressions. — Software testing textbook or university course materials

Task boards improve visibility of responsibilities and progress. — Project management research or official tool documentation

Peer code review can improve software quality. — Peer-reviewed software engineering research

These are suggested sources to consult, not references that have already been checked or verified for specific claims.

4. How to strengthen your assignment

The most important improvement would be to explain how the tools directly address the two-week deadline and the risk of double bookings, rather than simply describing their features.

For example, your analysis could recommend a simple two-week plan: use the first week for core functionality and Git training, then the second week for integration, peer review, and testing. This is a proposed schedule, not a guarantee that development will finish on time.

Also, distinguish between preventing code conflicts and preventing booking conflicts. Git helps developers manage changes to source code, but it cannot itself prevent two users from booking the same classroom. That requires correct application logic, appropriate database safeguards, and testing.

The draft is suitable for a first-year university assignment because it explains the main tools, applies them to the scenario, and acknowledges their limitations. Before submission, add references for the technical claims using your university's required citation style.
```

**Response:**

```text
Critical Review — Topic 1.7: Connected Development Teams
Overall assessment: Your draft answers the assignment question, uses the classroom booking scenario consistently, and recognises several important trade-offs. However, some explanations remain general, and the relationship between online collaboration tools, team efficiency, and software quality needs to be demonstrated more clearly.
The main weakness is that the draft sometimes explains what a tool does without fully explaining how using that tool would prevent a particular problem in your project.
Below are eight concerns, ranked by importance. Each includes the problem, why it matters, how to check it, and a counterexample or alternative interpretation.
1. Critical concerns
1. Git branches are not a solution to double bookings
High priority

Concern: Your draft correctly states that branches do not eliminate merge conflicts. However, it does not sufficiently explain the difference between source-code conflicts and reservation conflicts.
Why it matters: Git helps coordinate changes made by developers. It cannot ensure that two users do not reserve the same classroom at overlapping times. That requires correct booking logic and suitable database controls.
How to check: Investigate how the application checks overlapping reservations, especially when two booking requests occur simultaneously. Consider whether the database uses transactions or other safeguards to prevent conflicting reservations.
Counterexample: All four students merge their code successfully without a single Git conflict, but two users simultaneously book Room A from 10:00 to 11:00. Both bookings succeed because the application checks availability without protecting the operation against concurrent requests.

2. Code review is presented as more effective than it may be
High priority

Concern: The draft recommends that another student review every pull request but does not explain how an inexperienced reviewer would identify errors in booking logic.
Why it matters: Peer review provides an opportunity to find mistakes, but it does not guarantee correctness. With a two-week deadline and limited experience, reviews could become superficial.
How to check: Examine GitHub's review functionality and research what makes code review effective. Consider a short checklist covering overlapping reservations, cancellation behaviour, and test results.
Counterexample: A reviewer approves a pull request because the code looks readable, but fails to notice that the application allows overlapping reservations. Alternatively, a targeted automated test might reveal the error more reliably than a general review.

3. Testing does not sufficiently address simultaneous bookings
High priority

Concern: Your draft mentions testing whether two users can reserve the same classroom for overlapping times. However, it does not distinguish between sequential bookings and simultaneous requests.
Why it matters: A system might correctly reject a second booking when the first already exists, yet still allow double bookings when requests arrive at almost the same moment.
How to check: Design two different tests: one where a second reservation is submitted after the first, and another where both requests are submitted concurrently. Check whether the expected result is that only one conflicting reservation succeeds.
Counterexample: The application passes all ordinary reservation tests but fails under simultaneous requests because both users see the classroom as available before either booking is saved.

2. Important gaps in reasoning
4. The two-week deadline is not connected to concrete priorities
Concern: The draft repeatedly mentions the deadline, but does not explain which collaboration activities should take priority or how the team would avoid spending too much time learning tools.
Why it matters: Four inexperienced students may have limited time for Git training, meetings, development, reviews, and testing. More collaboration activities do not automatically mean greater efficiency.
How to check: Create a simple two-week task schedule, estimate the time needed for essential features, and identify which tasks depend on others. Consider whether the team can produce a working minimum version early enough to test it.
Counterexample: The students spend several days configuring complex Git workflows and project boards, leaving insufficient time to implement the booking system. A simpler process using GitHub Issues, short-lived branches, and brief reviews could be more practical.

5. Assigning one student to testing creates a possible bottleneck
Concern: The draft assigns frontend, backend, database, and testing roles, but does not clarify whether testing is everyone's responsibility or mainly the fourth student's.
Why it matters: If testing happens only after the other students finish, defects may be discovered too late. The database and backend students also need to coordinate closely because reservation accuracy depends on both components.
How to check: Identify which student is responsible for writing, running, and reviewing tests. Examine whether developers can test their own changes before requesting a merge.
Counterexample: The testing student receives all completed features on day 12 and discovers a major reservation error. There may be insufficient time to fix it. Alternatively, every developer could test their changes while one student coordinates integration testing.

6. Communication tools are named, but their effectiveness is assumed
Concern: The draft suggests Discord, Microsoft Teams, and online meetings without clearly specifying how information would flow between students working at different times.
Why it matters: A group chat can contain many messages, but important decisions can still be overlooked. Communication quality depends on agreed practices, not just the platform.
How to check: Consider whether the team needs response-time expectations, written decisions, task updates, and a process for reporting blockers.
Counterexample: One student changes the reservation database structure and announces it in a group chat. Another student misses the message and continues developing code based on the previous structure. A documented change in a shared issue could make the decision easier to find.

3. Vague claims and unsupported assumptions
7. Some claims about efficiency and quality need stronger evidence
Concern: Statements such as "This would reduce confusion about responsibilities" and "Peer review may also help inexperienced developers learn from each other" are plausible, but they are not demonstrated.
Why it matters: University assignments should distinguish between the capabilities of a tool and the benefits a team may obtain from using it. For example, a task board makes assignments visible, but visibility alone does not ensure tasks are completed efficiently.
How to check: Use official documentation to establish what tools support, and academic sources where possible to support claims about improved coordination, code review, and defect detection.
Counterexample: A team uses Trello consistently but still misses deadlines because tasks are estimated poorly or dependencies are ignored. A tool may improve visibility without improving actual delivery.

8. The proposed collaboration workflow assumes the team can use it
Concern: Your assumptions section acknowledges access to GitHub, meetings, and review time. However, the main explanation still relies on those assumptions without describing how the team would respond if they are not met.
Why it matters: Limited Git experience is an explicit scenario constraint. A workflow that requires complicated branching, frequent reviews, or extensive setup may not be realistic.
How to check: Identify the minimum Git skills required: cloning, committing, pushing, creating branches, opening pull requests, and resolving basic conflicts. Assess whether each student could practise these skills using a small example repository.
Counterexample: A student accidentally commits directly to the main branch because they misunderstand the workflow. Branch protection and a short practice exercise might reduce this risk, although these safeguards also require configuration and understanding.

4. Accuracy of your facts and assumptions section
Your classification is mostly reasonable, but some statements need additional qualification.
Statement	Assessment	What to check
Git supports branching and merging	Accurate	Official Git documentation
GitHub pull requests support code review	Accurate	GitHub documentation
Automated tests can check expected behaviour	Accurate, but limited	Tests only check the cases and conditions they cover
Task boards improve efficiency	Not automatically established	Evidence about coordination and team practices
Peer reviews improve quality	Conditional claim	Research on review effectiveness and limitations
The team can complete development and testing in two weeks	Unverified assumption	Project scope, workload and task estimates
An important distinction is that official tool documentation establishes functionality, but does not necessarily establish measurable improvements in team performance.
5. Alternative interpretations worth considering
Your draft generally assumes that adding collaboration practices improves project outcomes. A stronger critical analysis would recognise that the same practices can sometimes introduce overhead.
For example, a small team might benefit from assigning responsibilities, but strict specialisation could slow integration. Similarly, reviewing every pull request may improve oversight, but it could delay essential fixes when reviewers are unavailable.
There is also a difference between developing software efficiently and developing software quickly. A team that finishes more features may appear productive, but if the reservation system contains serious errors, the project has not achieved its quality objective.
This suggests an alternative priority for your scenario: a smaller, reliable classroom booking application may be more successful than a feature-rich application with incorrect reservation behaviour.
6. Which improvements matter most?
Revision checklist
0 of 5 reviewed



[ ] 1. Explain double-booking prevention
Connect collaboration practices to application logic, database safeguards and concurrent booking tests.


[ ] 2. Make the two-week plan realistic
Show how the team prioritises essential functionality, integration and testing.


[ ] 3. Define a lightweight review workflow
Explain what reviewers check and how inexperienced developers can participate.


[ ] 4. Clarify testing responsibilities
Explain why testing should happen throughout development, not only at the end.


[ ] 5. Support the benefits with evidence
Separate documented tool features from claims about efficiency and quality.



Final evaluation
Criterion	Evaluation
Relevance to the question	Strong
Application to the scenario	Good
Technical accuracy	Mostly accurate, with important omissions
Critical analysis	Good starting point; needs deeper reasoning
Treatment of constraints	Partial
Evidence and references	Not yet sufficient for a referenced academic submission
Suitability for first-year university	Appropriate
Your draft already has a logical structure and recognises that collaboration tools have limitations. The next improvement should not simply be adding more tool descriptions. It should be strengthening the cause-and-effect reasoning.
For each major recommendation, consider these three questions:
1. What specific problem does this tool or practice solve for the four students?
2. How does solving that problem improve efficiency or software quality?
3. Under what circumstances might the recommendation fail or become impractical?
Answering those questions, especially for Git workflows, code review, and reservation testing, would make the assignment more analytical and defensible.
One final consideration: Your main explanation is already approximately 460 words. If the assignment has a 500-word limit, you should prioritise deeper reasoning about the most important risks rather than adding all eight concerns. The supporting sections on assumptions, trade-offs and sources can serve as planning notes unless your instructor specifically requires them in the submitted answer.
I have kept this as a critical review rather than rewriting your draft, as requested.
```

### B3 — Revision (Prompt C)

- **Tool:** ChatGPT
- **Model:** GPT-6.1 Sol
- **Date:** 2026-10-12
- **Purpose:** revision using my decisions and verified evidence

**Prompt:**

```text
Revise the draft using my review decisions and source notes below. Keep the answer relevant to my scenario and preserve uncertainty where evidence is limited.

My decisions: 
1. Accept: Git branches do not prevent double bookings. The revised analysis must distinguish source-code conflicts from reservation conflicts and explain the need for correct booking logic and database safeguards.
2. Accept: Code review does not guarantee correctness. Introduce a short review checklist covering overlapping reservations, cancellation behaviour and test results.
3. Accept: Testing should address both sequential and simultaneous booking requests. Explain why ordinary tests may miss concurrency problems.
4. Accept: The two-week deadline needs concrete priorities. Recommend focusing on essential booking functions, early integration and sufficient testing time.
5. Qualify: Assigning one student to testing can create a bottleneck, but a testing coordinator can still be useful. All developers should test their own changes, while one student coordinates integration testing.
6. Accept: Communication tools alone do not guarantee effective teamwork. Important decisions, blockers and task updates should be documented in a shared GitHub Issue or task board.
7. Accept: Claims about efficiency and quality require qualification. Official documentation can establish tool functionality, but not automatically prove improved team performance.
8. Qualify: The team has limited Git experience, but a simple Git workflow remains practical. Recommend short-lived branches, basic Git training and focused pull request reviews instead of complicated processes.

Verified evidence:
Verification row 1: GitHub Docs, "Pull requests", https://docs.github.com/en/pull-requests/reference/pull-requests, accessed 2026-10-12. GitHub documentation describes pull requests as a way to propose, discuss and review code changes before merging. Decision: keep. This supports the description of pull request functionality but does not prove that all reviews find defects.

Verification row 2: Git, "git-merge Documentation", section "HOW CONFLICTS ARE PRESENTED", https://git-scm.com/docs/git-merge, accessed 2026-10-12. Git documentation explains that some changes can be merged automatically, while conflicting edits may require manual resolution. Modifying the same file does not always cause a conflict. Decision: qualify. This supports the distinction between managing code changes and preventing application-level booking errors.

No independent source verification has been supplied for the effectiveness of code reviews, database concurrency safeguards, or improvements in team productivity. Treat these as engineering recommendations or claims requiring additional evidence rather than proven outcomes.

Draft:

Topic 1.7 — Connected Development Teams

Assignment question: How can online collaboration tools help a distributed software development team work efficiently and maintain software quality?

Draft explanation · Approximately 460 words

Connected Development Teams: Online Collaboration and Software Quality

Online collaboration tools help distributed software development teams work efficiently by supporting communication, task management, code sharing, and quality control. This is particularly important when team members work from different locations and follow different schedules. For example, four university students developing a classroom booking application within two weeks need a clear approach to collaboration to complete the project successfully.

Firstly, assigning responsibilities can improve efficiency. Each student could focus on a specific area: frontend development, backend development, database management, or testing. A task management tool such as Trello or GitHub Issues could help the team assign tasks, set deadlines, and monitor progress. This would reduce confusion about responsibilities. However, dividing responsibilities too strictly could create problems if one student becomes unavailable. Therefore, team members should understand the basic functions of other parts of the application and help each other when necessary.

Secondly, Git and GitHub can support collaborative coding. Each developer could work on a separate Git branch before combining their changes through pull requests. This approach helps keep unfinished changes separate from the main codebase and provides opportunities to identify conflicts before merging. However, branches do not completely prevent merge conflicts, especially when students modify the same files. Because some team members have limited Git experience, the team should agree on simple procedures and practise essential commands before starting major development tasks.

Thirdly, effective communication is essential. The students could use a group chat, such as Discord or Microsoft Teams, for quick questions and updates. Short online meetings could help them discuss progress, technical problems, and upcoming deadlines. Since their schedules differ, important decisions should also be recorded in a shared document or task board. Although regular meetings improve coordination, excessive meetings could reduce development time, particularly during a two-week project.

Fourthly, code reviews can help maintain software quality. Before merging a pull request into the main branch, another student should examine the changes for possible mistakes. For example, a reviewer could check whether the booking logic correctly handles classroom availability. Peer review may also help inexperienced developers learn from each other. However, reviewing every small change could slow progress, so reviews should remain focused and manageable.

Finally, regular testing is necessary to reduce booking errors. The team should test whether students can create, view, and cancel reservations correctly. A particularly important test is whether two users can reserve the same classroom for overlapping times. Automated tests could help identify repeated problems after code changes. Nevertheless, testing cannot guarantee that every defect will be discovered.

Overall, combining task management, version control, communication, peer review, and testing could help the students complete their application efficiently while reducing the risk of incorrect reservations and double bookings.

1. Facts vs. assumptions

For academic writing, it is important to distinguish established technical principles from details that are hypothetical or need evidence.

Category — Examples

Scenario facts — Four students, different locations and schedules, two-week deadline, limited Git experience, risk of double bookings. These are given conditions of the fictional scenario.

Technical facts — Git supports branching and merging. GitHub pull requests support reviewing proposed changes. Automated tests can check expected software behaviour.

Assumptions — All four students can access GitHub, the team can arrange online meetings, and everyone has enough time to review changes.

Proposals — Assign four development roles, use Trello or GitHub Issues, require peer reviews, and regularly test booking conflicts.

2. Important trade-offs

- Specialisation vs. flexibility: Assigning roles improves accountability but can make the project dependent on individual students.
- Git branches vs. complexity: Branches help isolate work but require training and do not eliminate merge conflicts.
- Communication vs. development time: Meetings help coordination, but asynchronous messages may be more practical for different schedules.
- Code reviews vs. deadlines: Reviews can identify defects but require time, especially with inexperienced team members.
- Testing vs. feature development: Testing reduces risk but leaves less time for adding features. Booking accuracy should take priority over optional functionality.

3. Claims to verify with sources

For your final assignment, look for reliable documentation supporting these claims:

Claim to verify — Suggested source

Branching and pull requests support collaborative development and code review. — GitHub documentation — Pull requests

Merge conflicts can occur when developers make incompatible changes. — Git documentation — Merging

Automated testing can detect defects and regressions. — Software testing textbook or university course materials

Task boards improve visibility of responsibilities and progress. — Project management research or official tool documentation

Peer code review can improve software quality. — Peer-reviewed software engineering research

These are suggested sources to consult, not references that have already been checked or verified for specific claims.

4. How to strengthen your assignment

The most important improvement would be to explain how the tools directly address the two-week deadline and the risk of double bookings, rather than simply describing their features.

For example, your analysis could recommend a simple two-week plan: use the first week for core functionality and Git training, then the second week for integration, peer review, and testing. This is a proposed schedule, not a guarantee that development will finish on time.

Also, distinguish between preventing code conflicts and preventing booking conflicts. Git helps developers manage changes to source code, but it cannot itself prevent two users from booking the same classroom. That requires correct application logic, appropriate database safeguards, and testing.

The draft is suitable for a first-year university assignment because it explains the main tools, applies them to the scenario, and acknowledges their limitations. Before submission, add references for the technical claims using your university's required citation style.

Show what you changed and why. Use only the sources I supplied. Flag remaining gaps instead of inventing details.
```

**Response:**

```text
I've revised your draft to reflect all eight review decisions, keeping it appropriate for a first-year university assignment. The revision focuses on the two-week deadline, limited Git experience, and the risk of incorrect classroom reservations. It also distinguishes verified technical facts from engineering recommendations.
1. Revised assignment draft
Topic 1.7 — Connected Development Teams
Assignment question: How can online collaboration tools help a distributed software development team work efficiently and maintain software quality?
Connected Development Teams: Online Collaboration and Software Quality
Online collaboration tools can help distributed software development teams coordinate tasks, share code, communicate and maintain software quality. For example, four university students developing a classroom booking application within two weeks need a practical approach because they work from different locations, follow different schedules and have varying Git experience. Their main priority should be delivering essential booking functions while reducing the risk of incorrect reservations and double bookings.
Firstly, GitHub Issues or a task board could help the students assign responsibilities, track progress and manage deadlines. Students could specialise in frontend development, backend development, database management and testing coordination. However, every developer should test their own changes, while the testing coordinator organises integration testing. This distributes responsibility and reduces dependence on one student. Important decisions, blockers and task updates should be documented so that students working at different times can understand the project's current status.
Secondly, Git and GitHub could support collaborative coding. Students should use short-lived branches and focused pull requests to propose, discuss and review changes before merging, as described in GitHub's documentation [1]. Basic Git training would help inexperienced students follow this workflow. Git documentation explains that some changes merge automatically, while conflicting edits may require manual resolution [2]. Therefore, editing the same file does not always cause a merge conflict. More importantly, managing source-code conflicts does not prevent application-level booking conflicts.
Thirdly, communication tools such as Discord or Microsoft Teams could support quick discussions, while short online meetings could address urgent problems. Because students have different schedules, asynchronous updates may be more practical than frequent meetings. However, communication tools alone cannot guarantee effective teamwork. Important decisions should be recorded in shared issues or task boards rather than remaining only in chat messages.
Fourthly, peer code reviews could help students identify potential mistakes before merging changes. Reviewers should use a short checklist covering overlapping reservations, cancellation behaviour and relevant test results. Reviews should remain focused to meet the deadline. However, code review cannot guarantee correctness, and its effectiveness in this particular team has not been independently established.
Finally, testing and database safeguards are essential for booking accuracy. Students should test creating, viewing and cancelling reservations, including sequential attempts to book overlapping times. They should also test simultaneous requests for the same classroom because ordinary sequential tests may miss concurrency problems. Correct booking logic and suitable database safeguards, such as transactional checks that prevent conflicting reservations, are recommended. These safeguards must be implemented and verified rather than assumed to work.
To meet the two-week deadline, the team could prioritise essential booking functions and basic Git training during the first week, integrate components early, and reserve substantial time in the second week for reviews, integration testing and corrections. Optional features should have lower priority than booking accuracy.
Overall, collaboration tools could improve coordination and support software quality when combined with clear responsibilities, disciplined workflows, correct booking logic and testing. However, their availability alone does not prove that the team will work more efficiently or produce defect-free software.
References
[1] GitHub Docs. Pull requests. https://docs.github.com/en/pull-requests/reference/pull-requests (Accessed: 12 October 2026).
[2] Git. git-merge Documentation, section "HOW CONFLICTS ARE PRESENTED". https://git-scm.com/docs/git-merge (Accessed: 12 October 2026).




Approximately 540 words in the main explanation, excluding references. The citation format is provisional because your university's required referencing style has not been specified.2. What changed and why
Review decision	Revision made	Why it matters
1. Code vs. booking conflicts	Explicitly distinguished Git merge conflicts from overlapping classroom reservations.	Prevents the incorrect assumption that version control protects booking data.
2. Code review limitations	Added a checklist for overlaps, cancellation and test results.	Makes reviews specific and acknowledges that they can miss defects.
3. Concurrency testing	Added sequential and simultaneous booking tests.	Simultaneous requests can expose errors that sequential tests miss.
4. Two-week deadline	Added first-week priorities, early integration and second-week testing.	Connects collaboration choices to the actual time constraint.
5. Testing responsibility	Made testing a shared responsibility with one integration-testing coordinator.	Reduces the risk of a single tester becoming a bottleneck.
6. Communication records	Required important decisions, blockers and updates to be documented.	Helps students working asynchronously stay informed.
7. Evidence limitations	Replaced guaranteed outcomes with qualified language such as "could" and "may".	Avoids treating tool capabilities as proof of team performance.
8. Git complexity	Recommended short-lived branches, basic training and focused pull requests.	Keeps the workflow realistic for inexperienced students.
3. Evidence assessment
Your two supplied sources support specific technical descriptions, but they do not establish every recommendation in the revised answer.
Supported by your supplied source notes
GitHub pull requests allow developers to propose, discuss and review changes before merging [1]. Git can automatically merge some changes, while incompatible changes may require manual resolution [2].



Engineering recommendations, not independently verified findings
Shared testing responsibilities, focused review checklists, transactional booking safeguards, concurrency tests and early integration are proposed practices for this scenario. They are not established as effective by your two supplied sources.



Claims requiring further evidence
Whether code review measurably reduces defects, task boards improve productivity, or particular database safeguards reliably prevent double bookings under concurrent requests would require additional sources or project testing.



4. Remaining gaps to flag before submission
1. Database implementation is unspecified. The scenario does not identify a database or booking architecture. Transactional checks are a reasonable recommendation, but their effectiveness depends on the actual implementation, isolation behaviour and database constraints. A stronger technical discussion would require those details.
2. No independent testing or code-review research was supplied. The draft appropriately recommends these practices without claiming proven performance improvements. Additional academic sources would strengthen the quality argument.
3. The schedule remains hypothetical. The first-week and second-week priorities are a proposed plan, not evidence that four students can complete the application in that time. Actual task estimates and progress would be needed to assess feasibility.
4. Access and availability are assumed. The proposed workflow assumes the students can access GitHub, communicate through a shared platform and allocate time for reviews. These conditions have not been confirmed.
5. The word count has increased. If your assignment has a strict 450–500-word limit, the main explanation needs to be shortened while preserving the key distinctions and evidence qualifications.
5. Final evaluation
The revised draft now directly answers how online collaboration tools can support efficiency and software quality, rather than simply listing their features.
Its strongest improvement is separating three responsibilities: Git manages collaboration on source code, reviews and tests help identify software defects, and booking logic with database safeguards addresses reservation conflicts.
The argument remains appropriately cautious. It explains why the recommended workflow is reasonable for the fictional project without claiming that two documentation sources prove improvements in productivity or correctness.
Submission status: The revision is suitable as a working academic draft. Before submission, the main outstanding tasks are checking the word limit, applying the required citation style and obtaining additional evidence if the assignment requires research support for the engineering recommendations.
```

## 9. Appendix C — Evidence tables

### Verification table

<!-- At least two complete rows. Source and locator: title + page / slide / section / chapter,
     or title + URL + access date (YYYY-MM-DD). Decision: keep, qualify or reject — one word. -->

| AI claim | Source and locator | Evidence found | Decision |
| --- | --- | --- | --- |
| GitHub pull requests support reviewing proposed changes. | GitHub Docs, Pull requests, https://docs.github.com/en/pull-requests/reference/pull-requests, accessed 2026-10-12. | GitHub documentation explains that pull requests allow developers to discuss and review proposed code changes before merging. | keep |
| Branches do not completely prevent merge conflicts, especially when students modify the same files. | Git, git-merge Documentation, section HOW CONFLICTS ARE PRESENTED, https://git-scm.com/docs/git-merge, accessed 2026-10-12. | Git explains that some changes are merged automatically, while conflicting edits can require manual resolution. The claim should be clarified because editing the same file does not always create a conflict. | qualify |

### Change log

<!-- At least two substantive revisions. Your final version must differ from the AI wording,
     and the reason must say which evidence or scenario constraint made you change it. -->

| AI wording / suggestion | Your final version | Reason for change |
| --- | --- | --- |
| Each developer works on a separate branch to coordinate changes. | Developers use short-lived branches and pull requests, but Git does not prevent conflicting classroom reservations. | Prompt B concern 1: source-code conflicts and booking conflicts are different problems. |
| Another student reviews changes before merging. | Reviewers check booking logic, cancellation behavior and test results; every developer also tests their own changes. | Prompt B concerns 2 and 5: general reviews can miss defects, and testing must not depend on one student. |
