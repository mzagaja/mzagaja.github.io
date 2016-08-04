---
layout: post
title: Anatomy of a Good Pull Request
tags:
- Conference
comments: on
---
As I have been working on my [Code for Boston Project](https://github.com/codeforboston/cambridge_energy_app) I have spent lots of time reviewing pull requests. While it is easy to review pull requests when you are working with someone in the same space everyday, it is a bit more challenging when someone is remote. I think that the good pull requests tend to have a few things in common:

1. They are as small as possible. Often a feature can be broken down into multiple steps.
2. They include tests for new functionality.
3. They pass the existing tests.
4. They describe what the feature or bug fix does so that the tester can test it.
5. Merge conflicts have been resolved.
6. They actually check in all the files necessary for the change.

Some of these are not applicable to some projects, but in general these are the issues I encounter when I'm reviewing pull requests. The most common issues are the size of the pull request, a lack of a description, and someone forgetting to check in a file. While the command line is cool, I strongly recommend a GUI client like [Tower 2](https://www.git-tower.com) to help with git. Otherwise it often takes practice and seeing the other side before you get an intuitive sense for whether your pull request is good.
