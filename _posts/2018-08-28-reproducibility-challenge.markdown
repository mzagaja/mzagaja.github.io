---
layout: post
title: The Reproducibility Challenge
---
One of the biggest challenges in diagnosing technology problems is reproducibility. If a screen breaks then it is easy to see and fix. However if you have an intermittent software problem then it can be hard to show the engineers its occurrence when you complain. The same thing happened to me yesterday with my oven. It has been overshooting its temperature after a while but the technician could not reproduce the issue. I am still stuck with a broken oven.

The trick to exposing intermittent problems is to have a device that instruments the environment and records the problem when it occurs. In the case of a computer you dump logs. In the case of an oven you can have a thermometer that records its temperature as the oven is set to a single setting. Once you have something that sees the problem and the environment under which it occurs, you can then start to dissect what is unique about the environment to debug your problem.
