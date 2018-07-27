---
layout: post
title: Where Automated Testing Would Have Helped
comments: on
---
Yesterday I went to implement a new feature in one of our applications and discovered that a previous feature broke with a certain kind of data input. After doing further investigation I discovered the error was due to a mistake in the fix of a merge conflict. A merge conflict is an issue that arises when a developer is trying to combine changes to a file from two places that are not compatible. Usually it is because the file was changed in both places.

Merge conflicts can be large or small but they are one of the parts of software development that requires judgement and can be subject to human error. You might have a function that references variable A at first, then is updated to reference variable B in one update, and then variable C in a different branch (that never had the variable B in its commit history). When you go to merge GitHub will ask if you want to reference B or C. Now the developer must figure out which one is correct. It may be the case that they have to add logic to account for both cases. 

In both commits a developer could have written an automated test to check that their changes work correctly. If a developer picks the incorrect variable name (or neither work) then when editing the merge conflict the automated test suite will fail. The developer is saved time from manually checking to see if they made the correct choice. If the team has setup continuous integration then the build will fail and the team will be warned not to merge it. The test also would have served as guidance and documentation to the merging developer of what they should have done to correctly merge the two files.

While automated testing can be a bunch of work on the front-end, this sort of scenario is one where it saves work and time later on. The best part is that when you are writing code is when it is easiest to write the automated tests for the code. This saves you time and effort later on.