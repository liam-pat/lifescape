---
lang: en
title: "How to Review Code"
date: 2024-08-05
description: "How to review code: reduce conflicts between developers and reviewers, and establish healthy communication."
tags: ["technology", "work"]
---

> A summary of code review practices based on personal experience and issues encountered by [others](https://www.hitzhangjie.pro/blog/2019-09-10-%E5%A6%82%E4%BD%95%E6%9B%B4%E5%A5%BD%E5%9C%B0%E8%BF%9B%E8%A1%8C%E4%BB%A3%E7%A0%81review/#what-do-code-reviewers-look-for).

# 1) Picking the Best Reviewers (Who)

* **Appropriate Reviewer** - If there is someone you admire or whose advice you value, CC or @ them. Even if they don't have time right now, at least keep them in the loop.
* **Reviewer Ability** - Does the reviewer have the capability to review the developer's code?
* **In-Person Reviews** - Face-to-face reviews within a team allow gathering diverse perspectives, BUT this depends on company culture.

# 2) What to Look For In a Code Review (What)
> reference: https://google.github.io/eng-practices/review/reviewer/looking-for.html

* **Naming** - A common pitfall for junior engineers: are variable names, class names, and method names clear and concise?
* **Design** - Is the program and architectural design sound? Does it reflect product thinking?
* **Functionality** - Is the functionality acceptable to product stakeholders? Build for the future: are there potential bugs, deadlocks, race conditions, etc.?
* **Complexity** - Keep the code simple; avoid over-engineering and keep APIs under control.
* **Test** - Unit tests && feature tests.
* **Comments** - Keep comments to a minimum; don't write comments just to explain language syntax or features. Resolve and remove `@todo` and `@notice` tags before release.
* **Style** - Adhere to standard code style conventions. Don't nitpick; provide concrete examples. When making logic changes, avoid reformatting large swathes of code at the same time.
* **Documentation** - If documentation is outdated, remind the author to update it.
* **Every Line** - If you don't understand a piece of code, check in with the developer and discuss whether it can be written more simply without sacrificing efficiency or introducing unnecessary complexity.
* **Context** - If understanding the code requires reading too much surrounding context, it should be refactored into smaller functions.
* **Good Things** - The review process is also a time to share and learn from each other—for example, recommending great packages or libraries.

# 3) How to Do a Code Review (How)

## Standard
> reference: https://google.github.io/eng-practices/review/reviewer/standard.html
> In general, reviewers should favor approving a CL once it is in a state where it definitely improves the overall code health of the system being worked on, even if the CL isn’t perfect.

* **Maintain** - Code can be continuously optimized—that is, it can be modified and maintained **iteratively**.
* **Modify** - The reviewer must take **responsibility** for maintaining the parts affected by the changes.
* **Owner** - Reviewers must have **edit access** to the codebase, ensuring they could make changes themselves without introducing issues.
* **Not Important** - Reviewers can share experience and new ideas in comments without forcing the developer to adopt them (nice-to-have).
* **Blemishes** - There is NO best, ONLY better: tolerate minor imperfections as long as the code can be continuously maintained and improved.
* **Principles** - Regarding code style or libraries, developers can use their own style if there are no explicit team guidelines.
* **Resolving Conflicts** - When opinions differ, consult a few more teammates. If both sides have merit and there are no critical defects, changes don't have to be forced; ideally, the reviewer should provide constructive suggestions on how to improve.

## Navigating a CL in Review
> reference: https://google.github.io/eng-practices/review/reviewer/navigate.html

* **Take a broad view of the change** - First check whether the change makes sense. If not -> reject it, and explain why to the developer using thoughtful **phrasing**.
* **Examine the main parts of the CL** - Look at the commit message, background context, ticket ID, etc. first.
* **Look through the rest of the CL in an appropriate sequence** - Business logic > design > complexities.

### How to Write Code Review Comments
> reference: https://google.github.io/eng-practices/review/reviewer/comments.html

* **Courtesy** - Politeness and the art of communication: reviewers are not necessarily superior to developers.
* **Explain Why** - Provide the underlying reasoning.
* **Giving Guidance** - Write a quick demo or share an article to show the developer you are reviewing with care and diligence.
* **Accepting Explanations** - Humbly ask developers questions, and remember to do so when they actually have time.

### Handling Pushback in Code Reviews
> reference: https://google.github.io/eng-practices/review/reviewer/pushback.html

* **Who is Right?** - Developers usually understand the business domain better. Keep an open mind and listen; if things remain unresolved, seek help from more teammates.
* **Upsetting Developers** - When friction flares up between developer and reviewer, it's usually because the reviewer didn't do their homework.
* **Cleaning it Up Later** - If the developer promises to clean it up later, make sure to follow up and hold them to it.
* **General Complaints About Strictness** - Calibration: transition reviews gradually from lenient to strict.

### Developer's Perspective

* ***Commit Msg*** - [FYI](https://www.jvt.me/posts/2024/07/12/things-know-commits)
* ***Don’t Take it Personally*** - Keep emotions in check... If a reviewer is incompetent, impolite, or unconstructive, talk in private before deciding whether to switch reviewers.
* ***Fix the Code*** - If the reviewer doesn't understand the code: if the implementation is overly complex, refactor it; if not, write clear explanatory comments.

## Speed of Code Reviews
> reference: https://google.github.io/eng-practices/review/reviewer/speed.html

### a) Why Should Code Reviews Be Fast?

1. Overall team velocity gets dragged down significantly:
    - Releases get delayed, unless the company tolerates release slippage;
    - After days, weeks, or months, context fades and code has to be re-read from scratch. How would you feel if you were the developer?
2. Developers start pushing back or stop caring about code reviews:
    - Developers only receive feedback after days, and after addressing comments have to wait days again—how does that affect developer morale?
3. Overall code health suffers:
    - Review velocity is too slow: a new feature is already ready for release while the previous one is still stuck in review—what if the developer just decides to force-merge?

### b) How Fast Should Code Reviews Be?

* Immediate review > within 1 day > assign to someone else

### c) Fast Responses

* Set aside dedicated review times.
* When working across time zones, try not to review right around sign-off time; otherwise, what will you do if the developer responds after you've clocked out?
* If there are no major issues, promptly comment LGTM or leave minor suggestions; this keeps the developer happy and unblocked.

### d) Speed vs. Interruption

* Review when the developer is available.
* Avoid reviewing when the reviewer is already swamped or in deep focus.

### e) Supplement

* For large changesets, developers should break them down into multiple commits or smaller feature branches.
* Emergencies: distinguish urgent changes and prioritize reviewing them.
