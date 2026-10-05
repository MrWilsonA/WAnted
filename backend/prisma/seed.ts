import { prisma } from "../src/lib/prisma";

const caseFiles = [
    {
        code: "1a",
        slug: "suspect-profile",
        position: 1,
        title: "Suspect Profile",
        summary: "A short biodata of Wilson Arlando.",
        body: `## WANTED: Wilson Arlando

**Preferred name:** Wilson  
**Major:** Computer Science and Mathematics  
**Current position:** Laboratory Assistant

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

**Countermeasure:** He uses notes, reminders, and references.

### Needs More Time to Understand New Concepts

Wilson can be slower when understanding unfamiliar topics.

**Countermeasure:** He starts earlier, gives himself additional time, and reviews the material more than once.

### Easily Distracted

Wilson can lose focus when people are talking nearby.

**Countermeasure:** He works in a quiet place or uses earphones when he needs to concentrate.

### Different Environments for Different Tasks

For group tasks, Wilson first understands the team and the situation. For tasks requiring deeper thinking, he often works at home, where he can focus better.

> I do not see weaknesses as excuses. I see them as areas that require a system.
`,
    },

    {
        code: "1c",
        slug: "investigation-plan",
        position: 3,
        title: "Investigation Plan",
        summary: "A two-semester work plan as an Assistant Development Officer.",
        body: `## Semester 1

### Review Current Procedures

Review selected procedures so they remain relevant to current development practices and the changing use of AI tools.

### Improve Pre-TPA Preparation

Provide better preparation before TPA begins through:

- More pre-TPA sessions when possible.
- VBL or guided learning activities.
- Sample pre-TPA cases.
- Clear explanations of expected difficulty.
- Early guidance about the project workflow.

### Promote Responsible AI Use

AI tools are now part of software development.

Instead of focusing only on banning them, assistants should be taught to use them responsibly.

They should still understand their code, explain their decisions, debug their work, and demonstrate their own engineering ability.

## Semester 2

### Improve TPA Evaluation

Evaluation should measure more than the number of completed features.

It should also examine:

- Understanding of the system.
- Ability to debug independently.
- Ability to explain code decisions.
- Ability to work when AI assistance is unavailable.
- Accuracy and quality of documentation.

### Improve RIG Quality

RIG should be evaluated based on both the final product and the development process.

Assistants should understand the problem, explain their decisions, document the project, and leave it in a condition that can be continued by another team.

### Measure Development

Progress can be measured through:

- Pre-TPA and post-TPA assessments.
- Technical interviews.
- Project explanation sessions.
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
        summary: "An expansion proposal for the existing MyTPA platform.",
        body: `## Main Proposal

Expand the existing MyTPA platform.

MyTPA already provides progress tracking and grade visualisation. The next step is to add learning support.

## Practice Area

Provide practice exercises related to:

- Game Development.
- Desktop Development.
- Web Development.
- Network Development.
- Mobile Development.

These exercises would not replace the actual TPA. They would help assistants become familiar with the types of problems they may encounter.

## Learning Materials

Add short materials containing:

- Concept explanations.
- Example projects.
- Common mistakes.
- Technical checklists.
- Recommended references.

## VBL and Recorded Sessions

Provide access to VBL sessions or teaching recordings so assistants can review important topics independently.

## Field-Specific Preparation

Each TPA field has different challenges. MyTPA can provide preparation materials for each field, including tools, workflows, and common sources of confusion.

## Light Gamification

Use simple learning milestones, completion badges, or small challenges to make preparation more engaging without making the platform unnecessarily complicated.

## Expected Impact

- Earlier and more structured preparation.
- Less repeated confusion about basic concepts.
- Easier access to learning resources.
- More independent learning.
- Better consistency in TPA preparation.
`,
    },

    {
        code: "1e",
        slug: "cold-case",
        position: 5,
        title: "Cold Case",
        summary: "Improving preparation for the Network TPA.",
        body: `## The Case

The Network TPA material is relevant and technically valuable.

The main issue is the preparation before the onsite session.

## What Makes It Difficult

- Many technologies are connected.
- Preparation starts from basic concepts.
- The onsite task requires a complete deployment.
- The available time is limited.
- A misunderstanding in one component can affect the rest.

## Proposed Improvement

The material and scope should remain unchanged.

The preparation can be improved with:

- A complete system architecture overview.
- A dependency map between components.
- A preparation roadmap from basic networking to deployment.
- Short guided exercises for important concepts.
- Troubleshooting examples.
- A checklist of expected concepts and skills.
- A clearer connection between preparation topics and onsite requirements.

## Preserve the Research

The preparation should not provide every command or a complete solution.

Participants should still:

- Research unfamiliar tools.
- Decide how to implement requirements.
- Explain the commands they use.
- Troubleshoot errors independently.
- Justify their infrastructure and deployment decisions.

The goal is to reduce avoidable confusion, not to remove the research aspect of the TPA.

## Implementation

1. Review the current preparation material.
2. Map preparation topics to onsite requirements.
3. Add a high-level architecture diagram.
4. Add a dependency map between components.
5. Add short exercises for difficult concepts.
6. Add troubleshooting preparation.
7. Collect feedback after the TPA.
8. Improve the material based on recurring questions and mistakes.

## Expected Result

Participants can spend more time demonstrating their understanding and less time guessing how the components are connected.

The Network TPA can remain technically challenging while becoming clearer and more consistent.

> The cold case is not the Network TPA material. It is the gap between learning the concepts and understanding how they work together.
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

> In every aspect always prepare for the worst and hope for the best
`,
    },
];


async function main() {
    for (const caseFile of caseFiles) {
        await prisma.caseFile.upsert({
            where: { code: caseFile.code },
            update: { slug: caseFile.slug, position: caseFile.position },
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