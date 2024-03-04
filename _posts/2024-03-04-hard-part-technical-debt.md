---
title: The Hard Parts of Technical Debt
layout: post
---
I have been spending a large part of the past month or two battling the dragon we call technical debt. Technical debt is an often invoked but challenging to understand aspect of software engineering. To outsiders it can seem subjective: engineers dislike some sort of code, label it legacy code or tech debt, and try to convince product or management to let them work on fixing that instead of stories that provide value. This can happen, but is not fully accurate. Tech debt is real because the bill for it eventually comes due.

### Why It Matters
[Chris Mims chronicles the looming technical debt doomsday in the Wall Street Journal](https://www.wsj.com/tech/personal-tech/the-invisible-1-52-trillion-problem-clunky-old-software-f5cbba27?st=idweys5r5sla3yt&reflink=desktopwebshare_permalink). However the real scrooge comes for ambitious product managers and optimistic engineers that think a task will be easy and turns into a several sprint odyssey. Accumulating technical debt will slow down productivity. Software development slows down and story point estimates become less accurate. Business deadlines are missed and suddenly nobody feels like they have control of their timelines or release roadmaps. Without visibility and understanding of technical debt, leadership is flying blind.

### Triaging Debt
One of the larger challenges is identifying and categorizing debt. In your house you might not know you have knob and tube wiring until you go to replace a light. Similarly technical debt rarely is cataloged in an easy to review ledger. If you start by having engineers begin to write up tickets for debt and catalog them, you can begin to triage it.

If you are starting from square zero you can try to catalog the barriers to doing the following to find technical debt:
* Can you start/build the app from one command?
* Can you deploy in one command?
* Do tests fully exercise the code base in integration?

You can also use tools like [RubyCritic](https://github.com/whitesmith/rubycritic) to get a proxy analysis of the code base. These tools aren’t perfect but provide both a good general sense of the health of the app and a way to drill down and find specific issues.

### Just-in-Time Debt Payments
Sometimes paying off debt early does not make sense. A valid although more expensive strategy to deal with technical debt is to simply wait for it to become a blocker. Instead of trying to further defer on the debt when it is due, now is the moment you pay it. This strategy fails if you find yourself constantly trying to come up with “creative” solutions or workarounds to avoid paying debt. These half-measures are often like taking out a new credit card or pay day loan to pay an old one. However if you’re simply fixing things as tickets come up, you will make progress on paying your debt off.

### Go Deeper
* [Martin Fowler’s book Refactoring](https://martinfowler.com/books/refactoring.html) provides a great vocabulary and list of strategies for handling tech debt in code bases. See also: [Refactoring.guru](https://refactoring.guru/refactoring/smells)
* [Pivotal Lab’s Developer Toil Audit](https://labspractices.com/learningpaths/developer-toil/developer-toil-audit/) is a helpful way to approach debt.
* Mike Bland [extolls the virtues of automated testing on his site](https://mike-bland.com).