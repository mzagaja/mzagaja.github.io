---
title: The Magic of Automated Testing
layout: post
---
Mike Bland has a [new presentation out on software quality](https://mike-bland.com/making-software-quality-visible):
> We’ll discuss why internal software quality matters, why it’s often unappreciated and sacrificed, and what we can do to improve it. More to the point, we’ll discuss the importance of instilling a quality culture to promote the proper mindset first. Only on this foundation will seeking better processes, better tools, better metrics, or AI-generated test cases yield the outcomes we can live with.

### Why It Matters
Bland spent the past few years at Apple helping them adopt a culture of testing. He has done the same at Google and the federal government. A robust test suite allowed me and a Google Summer of Code intern to upgrade [Lumen Database](https://www.lumendatabase.org) from Rails 4 to 5 without any hiccups, and I have been a believer ever since.

### Automated Testing is a Secret Sauce of Software Engineering
Automated testing serves two functions:
* Forces you to think about and look at your code through a different lens, making it more likely you will spot a bug.
* Prevents the introduction of new bugs by making sure existing functionality does not break with code changes.

It takes effort to learn this tool, but it is a powerful one.

### Go Deeper
* [Is High Quality Software Worth the Cost?](https://martinfowler.com/articles/is-quality-worth-cost.html) is Martin Fowler’s linked post that explains where testing helps from a business perspective.
* Microsoft [found a 20.9% decrease in defects](https://collaboration.csc.ncsu.edu/laurie/Papers/Unit_testing_cameraReady.pdf) when using automated testing.