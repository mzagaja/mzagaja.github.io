---
layout: post
title: Lessons Learned Re-learning Javascript
---
Below are some lessons I have learned while re-learning Javascript since it has changed so much:

1. Habits and expectations from a familiar language can create blind spots when working in a new language.
2. A language like Javascript that changes a lot creates a larger distance between available documentation/solutions and their testing and implementation in your own project.
3. It is worth slowing down to understand how to appropriately and quickly debug in the new language. It might take a little time to develop the toolset but it pays off so much later on.

Each one of these points has a story. The first one involves me forgetting that Javascript does not have implicit returns. I managed to spend a large amount of time wondering why a Javascript function was returning undefined instead of the result of the expression I put at the bottom of the function. In Ruby the last expression is always evaluated as a return statement. Other developers have argued that Javascript maybe should have thrown an error instead of returning undefined, but either way a bunch of my time was burned because my brain was not looking for the return keyword in my functions.

The second one involves trying to integrate a download feature in my current project. While Googling I found several solutions to allow a Javascript application to prompt a user to download a file. The solutions often involved examples, examples often being some of the best documentation. However they fell flat because we had converted our project to modern Javascript we syntax things like [decorators](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841) were not reflected in the tutorial example. I had to sit down and understand the difference between the old and new syntaxes so I could translate the older style Javascript code from the tutorial into the newer style code in my current project.

Finally the best thing I did was discover how to quickly run Javascript using Sublime Text’s build system. While it is not helpful for certain front-end code, being able to write a Javascript function with business logic and an example is a great way to narrow in errors before implementing it in the larger project. By speeding up the feedback cycle and understanding debugging, I was able to more quickly produce code that did the right thing.
