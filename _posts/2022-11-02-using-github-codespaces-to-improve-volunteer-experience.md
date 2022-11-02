---
title: Using GitHub Codespaces to Improve Volunteer Experience
layout: post
---
GitHub offers a [cloud software development environment called codespaces](https://github.com/features/codespaces). After seeing new volunteers at Code for Boston struggle with setting up a new Ruby on Rails web application, I decided to try something to make it easier. I setup codespaces to provide a one click way to create a working development environment.

### Why It Matters
Even with developers experienced with backend software engineering, getting their development environment setup was taking a lot of effort.[^1] Many folks started showing up with Microsoft Windows which I lack the expertise to help get working with Ruby. The pre-work required to get up and running is discouraging and frustrating to new folks that just want to focus on writing code.

### What Worked Well
* With only basic Docker knowledge and experience I was able to setup the Codespace environment in under an hour. 
* The [documentation](https://docs.github.com/en/codespaces) is well written.
*  The VSCode Editor is fully featured and easy to use.

### Challenges
* Setting up and debugging the initial container did not take long but you spend lots of time waiting to rebuild the container with each change. 😴
* I love [Instant Wake](https://www.youtube.com/watch?v=UUjuBfFLiAk) on my Mac so waiting for a codespace to boot up feels like a step backwards.
* VSCode’s built-in git version control tool has an awkward user interface and experience.
* GitHub unfortunately leaves Ruby on Rails out of their default documentation.

### Go Deeper
* [My commit making this work](https://github.com/codeforboston/urban-league-heat-pump-accelerator/commit/578dad8013e5cc543f1f3e12b0eb673a852fc291).
* [Sample Ruby on Rails Codespace](https://github.com/github/codespaces-rails)

[^1]: Greg Wilson suggests [we need a metric to measure the difficulty of installing and configuring software](https://third-bit.com/2022/08/30/research-topics/). I agree.