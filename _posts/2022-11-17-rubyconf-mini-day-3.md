---
title: RubyConf Mini Day 3
layout: post
---
I am on the train to Boston from Providence and glad I spent the past few days at RubyConf Mini. Today we learned about peephole optimizations in compilers, functional programming in Ruby, and class macros. While I did not fully grok all the technical presentations, I enjoyed seeing aspects of Ruby that I have not explored.

### Teaching Ruby to Count
The most practical presentation was about Teaching Ruby to Count. [Joël](https://twitter.com/joelquen) from Thoughtbot showed us how to create custom objects that work with the ranges and iterations by implementing an `each` method and including the Enumerable module. By understanding how other Ruby objects implement this behavior, you can now create your own objects that work the way most Rubyists expect.

### Code Complexity is the Demon Everyone is Fighting
Battling code complexity is such an awful problem that I attended a second session on it. The tips were similar to the first presentation:
* Use [RubyCritic](https://github.com/whitesmith/rubycritic) to identify candidates for refactoring.
* Use [flog](https://github.com/seattlerb/flog) to measure complexity as you code.
	* Conditional statements and DRY code are often complexity culprits. Sometimes you need to re-hydrate your code.
* Files with high churn but low complexity are probably just data you can put into a database or data file.

### A Standing Ovation
Rose Wiegley, a Senior Staff Software Engineer at Shopfiy, received a standing ovation for her closing keynote. She brought us through the history of software engineering, the decline of women being involved in the field, and challenged us to be leaders. I learned that the difference between a Senior Engineer and a Staff Engineer is the Senior Engineer solves problems and the Staff Engineer discovers problems. Her presentation did a great job of leading by example, giving advice and showing us how she implemented that advice in her own organization.

