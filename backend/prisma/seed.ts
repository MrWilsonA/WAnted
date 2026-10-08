import { prisma } from "../src/lib/prisma";

const caseFiles = [
    {
        code: "1a",
        slug: "suspect-profile",
        position: 1,
        title: "Suspect Profile",
        summary: "A short biodata of Wilson Arlando.",
        body: `## WANTED: Wilson Arlando

- **Preferred name:** Wilson
- **Major:** Computer Science and Mathematics
- **Current position:** Laboratory Assistant

## Current Responsibilities

Wilson is currently preparing a case for the Junior Laboratory Assistant 27-1 recruitment in the Game Development field.

## Relevant Experience

- Developed projects using different technology stacks.
- Taught and guided university students.
- Helped peers solve problems and improve their understanding.
- Designed learning and assessment materials.

## Motivation

Wilson wants to support the development of Junior Laboratory Assistants, especially in improving their hard skills, research abilities, and overall growth.

## Personal Trait

Wilson cares about the development of other assistants. He believes development is not only about achieving results, but also about receiving proper guidance and support.
`,
    },

    {
        code: "1b",
        slug: "evidence",
        position: 2,
        title: "Evidence",
        summary: "Strengths and weaknesses found during the investigation.",
        body: `## Strengths

### Responsible and Reliable

Wilson takes his responsibilities seriously, including case making, attendance, procedures, and other assigned duties.

He consistently completes his work without missing deadlines or violating procedures.

### Adaptive

Wilson can adjust to different working environments, tasks, and people.

### Situational Awareness

Wilson understands when it is appropriate to be serious and when it is acceptable to make a joke. He can maintain a friendly atmosphere while respecting the situation.

### Able to Work Under Pressure

During hectic situations, such as supervising a quiz, Wilson can remain calm and professional.

## Weaknesses

### Difficulty Memorizing Details

Wilson may not always remember every technical detail through memorization alone.

**Countermeasure:** He uses notes, reminders, and references, and documents what he learns so it can be found again.

### Needs More Time to Understand New Concepts

Wilson can be slower when understanding unfamiliar topics.

**Countermeasure:** He starts earlier, gives himself additional time, and reviews the material more than once.

### Easily Distracted

Wilson can lose focus when people are talking nearby.

**Countermeasure:** He chooses the environment based on the task. For group tasks, he first understands the team and the situation. For tasks that require deeper thinking, he works in a quiet place, often at home, or uses earphones to stay focused.

> I do not see weaknesses as excuses. I see them as areas that require a system.
`,
    },

    {
        code: "1c",
        slug: "investigation-plan",
        position: 3,
        title: "Investigation Plan",
        summary: "A two-semester work plan as an Assistant Development Officer.",
        body: `## Guiding Principle

Every TPA phase answers one question:

- **Take-home case:** What can you build?
- **Presentation:** Did you understand what you built, and can you justify it?
- **Onsite:** Can you engineer it yourself?

AI tools now make the first question easy to answer without the other two. This plan strengthens all three, one stage at a time, so every change can be evaluated before the next one is added.

## Semester 1: Verify Understanding

### Early Semester: Review and Preparation

At the start of the semester, the target is to have everything needed for the new flow ready before the TPA begins:

- Review current TPA procedures, scoring templates, and presentation flow for every field.
- Collect feedback from the previous generation about difficulties, preparation, and AI usage.
- Prepare a standard **video preview template**: maximum duration, feature order based on the scoring template, and a timestamp for each feature.
- Prepare the onsite plan for fields that do not have an onsite session yet (Game Programming and Business Analysis and Application).
- Align the onsite schedule with the existing schedules of both campuses, so the sessions do not clash when Alam Sutera assistants need to attend.

### Target: Video Preview

- Participants submit a feature video within about 3 days after the take-home deadline, using the standard template.
- The case maker scores features from the video before the presentation, so the presentation can be shortened to about 100 minutes.
- During the presentation, the case maker checks several features directly in the application at random and asks essential questions. Points from the video can be reduced if the answers do not match.

### Target: Onsite for Every TPA

- Onsite sessions are held for every TPA field, in groups, using an easier version of the take-home case.
- Each group member receives an individual component, such as explaining or modifying part of the group's work.
- AI policy follows the scope of the field: blocked completely for lighter scopes such as Web, and allowed without login for complex scopes such as Network.
- Where AI is blocked, participants may only open official documentation and small personal snippets in image form.

### Semester 1 Deliverables

- Video preview template and guideline.
- Onsite plan and scoring sheet for every field.
- Evaluation report: presentation time saved, scoring consistency, and participant feedback.

## Semester 2: Score Understanding

### Transparency Rule and Understanding-Based Scoring

- AI tools, documentation, and other sources are allowed, and every result is scored the same way regardless of its source.
- Participants must be transparent about the parts assisted by AI or taken from other sources.
- Acknowledged parts are scored by the level of understanding. Unacknowledged parts that cannot be explained are not scored.
- Understanding is proven by explaining the reasoning, modifying, and fixing the work directly without AI.
- Every scoring template receives an **Understanding** column next to the result score, so working features that are not understood cannot receive full points.

### Core and Advanced Requirements

- Every case separates **Core** requirements (a clear minimum) from **Advanced** requirements (differentiators for higher scores and Best TPA).
- This reduces the pressure of the warning letter (SP) and lets assistants understand the core first.

### Business Analysis TPA Pilot

- Pilot the revised Business Analysis and Application TPA described in the Cold Case.

### Improve RIG Quality

Strengthen the existing RIG phases instead of replacing them:

- **Topic Submission:** encourage related units such as R&D, Academic, and daily operations to submit real problems. The submitter acts as the user and stays involved until handover. Assistants can still propose their own ideas, as long as the proposal names a clear user in SLC.
- **Registration Phase:** every proposal states a **definition of done** based on its output type, approved by the guider. Tools and applications must run in an environment their users can access, with usage and maintenance documentation. VBL and learning materials must be ready to use and reviewed by their users. Exploratory research delivers a report, prototype, and recommendations.
- **Setting Goals Phase:** targets and timelines are agreed with both the guider and the user, with a progress demo in the middle of the Research Phase.
- **End of Research Phase:** the user performs acceptance testing before Presentation Submission. The guider's score considers the definition of done and can be one of the requirements to enter the Top 5.
- **Top 5 and Best RIG:** voting remains, complemented by feedback from the users.
- **New Handover Phase:** after the Best RIG Presentation, each group hands over its work, documentation, and known issues. All accounts, access, and credentials belong to SLC from the start. A warranty period of about 1 to 3 weeks covers issues within the original scope.

### Prepare Learning Support

- Start recording Pre-TPA sessions so they can become VBL materials.
- Map Pre-TPA topics to the actual TPA requirements, starting with Network.

### Semester 2 Deliverables

- Transparency rule and updated scoring templates for every field.
- Revised Business Analysis case and pilot evaluation.
- RIG proposal guideline with definition of done, handover checklist, and warranty guideline.

## After Semester 2: Learning Support

- Expand Pre-TPA materials, practice cases from previous TPAs, and VBL, as described in New Leads.
- For Network, add an architecture overview, a dependency map between components, a preparation roadmap, troubleshooting exercises, and a checklist of expected skills, without giving every command or a complete solution.

## Measuring Development

Progress is measured through:

- Pre-TPA and post-TPA assessments.
- Gaps between result scores and understanding scores.
- Technical interviews and project explanation sessions.
- Debugging exercises.
- Documentation reviews.
- Feedback from assistants, guiders, and evaluators.
`,
    },

    {
        code: "1d",
        slug: "new-leads",
        position: 4,
        title: "New Leads",
        summary: "Innovations for TPA assessment and learning support.",
        body: `## Lead 1: Assessment That Measures Understanding

These innovations are already implemented in the documentation and scoring template of this project.

### Two-Axis Scoring

Every requirement is scored on two sides: **Score** (the result) and **Understanding** (the ability to explain and modify it).

The effective score is the lower of the result and the understanding level plus one. A feature that works but is not understood cannot receive full points.

### Gap Flag

When the result is much higher than the understanding, the template automatically flags the row, so the case maker knows exactly what to verify during the presentation.

### Verification Column

Every requirement lists the evidence that must be shown before a score is given. Scoring becomes more consistent across case makers and campuses.

### Rubric per Component

Each component has a clear description of what scores 0 to 4 look like, instead of only "almost correct".

### Practical Tests and Concrete Questions

Short practical tests during the presentation (such as diagnosing a failing readiness check) and concrete questions replace generic question lists.

### Core and Advanced Subtotals

Requirements marked as Advanced are shown as a separate subtotal, so they can be used as the main consideration for Best TPA.

### Competency Result

The result sheet shows the score of each competency with feedback, so assistants know their strengths and what to improve.

## Lead 2: Video Preview Template

A standard format for feature videos: maximum duration, feature order based on the scoring template, and a timestamp for each feature. The case maker provides a complete example video.

## Lead 3: Expanding MyTPA

MyTPA already provides progress tracking and grade visualisation. The next step is to add learning support.

### Practice Area

Practice exercises related to:

- Game Programming.
- Business Analysis and Application.
- Web Design and Technology.
- Network.

These exercises would not replace the actual TPA. They would help assistants become familiar with the types of problems they may encounter, and can be adapted from previous TPA cases with a smaller scope.

### Learning Materials

Short materials containing:

- Concept explanations.
- Example projects.
- Common mistakes.
- Technical checklists.
- Recommended references.

### VBL and Recorded Sessions

Access to VBL sessions or teaching recordings so assistants can review important topics independently.

### Field-Specific Preparation

Each TPA field has different challenges. MyTPA can provide preparation materials for each field, including tools, workflows, and common sources of confusion.

### Light Gamification

Simple learning milestones, completion badges, or small challenges to make preparation more engaging without making the platform unnecessarily complicated.

## Expected Impact

- Scores that reflect real understanding, not only completed features.
- More consistent scoring across case makers and campuses.
- Shorter presentations focused on understanding.
- Earlier and more structured preparation.
- Less repeated confusion about basic concepts.
- More independent learning.
`,
    },

    {
        code: "1e",
        slug: "cold-case",
        position: 5,
        title: "Cold Case",
        summary: "Revising the Business Analysis and Application TPA.",
        body: `## The Case

The Business Analysis and Application TPA asks assistants to read an interview transcript, identify actors and use cases, create analysis diagrams, and build the application with Tauri and Rust.

The goal is valuable. The problem is the balance between breadth and depth.

## What Makes It Difficult

- In my generation, the transcript contained **22 actors** and around **100 use cases**. I heard the previous generation had even more actors.
- Only **8 use cases** are analysed in depth (use case descriptions, activity diagrams, and sequence diagrams).
- At the same time, the application must implement **all** use cases identified from the transcript.
- Most of the time is spent reading and navigating the transcript, not analysing it.
- The transcript is long, written as a script, and locked. Navigating between actors is difficult, and searching is not possible.

From my own experience, this format pushed me to ask an AI tool for a summary of the transcript. Locking the file does not stop AI, but it does make the work harder for assistants who read it honestly.

## What I Want to Change

### Fewer Actors, More Depth

- Reduce the transcript to about **8 to 10 actors** and **30 to 40 use cases**, while keeping the role hierarchy (staff, manager, director) for role-based access.
- Reduce the application scope accordingly.
- Move the scoring weight from the number of diagrams to their depth: complete alternate and exception flows, explicit business rules, and sequence diagrams that match the actual code.
- Every diagram must be explained directly during the presentation.

### A Transcript That Is Easier to Navigate

Keep the script format, because reading realistic interviews is part of the skill, but add:

- An **actor index** with divisions, roles, and pages.
- **Bookmarks** for each division and actor.
- **Line numbers** on every page.
- A **glossary** of ship terms.
- An **unlocked** file, so assistants can search it.

### Traceability

- Every use case must cite its source in the transcript, for example page 12, lines 30 to 41.
- Every diagram refers to a use case ID, and every application feature refers to a use case.
- Invented use cases become easy to detect, and assistants must truly read the transcript.

### Change Request

- After the initial presentation, the case maker releases a short interview addendum, such as a new policy from the Directors.
- Assistants must analyse its impact on their diagrams and application. This tests whether they understand their own models.

## Considerations

- The standard does not go down. It moves from quantity to depth.
- The identity of Business Analysis is preserved: what is scored is the quality of the analysis, not the ability to read 77 pages.
- AI remains allowed, but it cannot replace citing sources, analysing changes, and explaining diagrams directly.
- There is no additional cost. Only the case documents change.
- Risk: fewer actors may feel easier. Depth, traceability, and the change request become the differentiators.

## Implementation

1. Rewrite the transcript with fewer actors, then add the index, bookmarks, line numbers, and glossary.
2. Update the case: adjusted application scope and mandatory source citations for every use case.
3. Prepare the change request addendum before the TPA starts.
4. Update the scoring template: weight on depth, consistency between diagrams and code, traceability, and live explanation.
5. Pilot in one generation, then compare diagram quality and understanding with the previous generation.
6. Improve the transcript based on recurring questions and mistakes.

## Expected Result

Assistants spend less time searching and more time analysing. The TPA remains challenging, but the challenge comes from analysis, not from navigation.

> The cold case is not the transcript itself. It is the time lost between reading the case and understanding the system.
`,
    },

    {
        code: "1f",
        slug: "verdict",
        position: 6,
        title: "Verdict",
        summary: "Why Wilson should be accepted as an Assistant Development Officer.",
        body: `## Final Verdict

Being hardworking is important, but it is not enough by itself.

Wilson's main strengths are his broad understanding of software development, his interest in research, and his willingness to support other assistants.

## The Evidence Is Already on the Board

- **WAnted itself.** This presentation is a full-stack application deployed to Microsoft Azure, with its infrastructure written in Terraform, CI/CD with automated tests in GitHub Actions, secrets in Key Vault through managed identities, autoscaling from 2 to 5 replicas, and monitoring with alerts.
- **A load test, analysed and fixed.** The first k6 run (200 virtual users for 4 minutes) produced about 1.2% server errors. After analysing the cause (database connection limits), the second run reached 0% errors with a p95 of 381 ms, about 2.5 times the throughput.
- **A case and scoring template.** The documentation for this project follows the TPA format and adds two-axis scoring, a gap flag, a verification column, and a rubric.
- **A rule for AI use.** A transparency rule that scores understanding instead of trying to ban what cannot be detected.

## Broad Understanding

Wilson has experience with different technology stacks and development areas.

This gives him a general perspective that can help him understand the challenges faced by Junior Laboratory Assistants across different TPA fields.

## Active Research Mindset

Wilson enjoys learning and researching unfamiliar topics.

He is willing to compare possible approaches and continue learning when he does not immediately know the answer.

## Focus on Real Understanding

Wilson wants assistants to understand what they build.

Some participants struggle to explain features they claim to have implemented or cannot remember where those features exist in their own projects.

The development process should encourage assistants to understand their decisions, explain their implementation, and demonstrate their own work.

## Contribution

Wilson wants to help adjust TPA procedures so they remain relevant to current conditions.

He also wants to support a process that values understanding, research, and engineering ability instead of focusing only on completed features.

## Final Statement

Wilson should be accepted because he can contribute more than effort.

He brings responsibility, adaptability, research interest, broad technical awareness, and genuine concern for assistant development.

> In every aspect, always prepare for the worst and hope for the best.
`,
    },
];

async function main() {
    for (const caseFile of caseFiles) {
        await prisma.caseFile.upsert({
            where: { code: caseFile.code },
            update: {
                slug: caseFile.slug,
                position: caseFile.position,
                title: caseFile.title,
                summary: caseFile.summary,
                body: caseFile.body,
            },
            create: caseFile,
        });
    }
    console.log(`Seeded ${caseFiles.length} case files`);
}

main()
    .catch((err) => {
        console.error(err);
        process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());