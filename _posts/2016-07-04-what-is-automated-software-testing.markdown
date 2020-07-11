---
layout: post
title: What is Automated Software Testing
tags:
- Software
- Testing
---
One of my goals when I started my fellowship at the Berkman Center for Internet and Society was to incorporate auotmated software testing into my workflow. Sections on automated software testing are included in popular tomes like the [Rails Tutorial](http://www.railstutorial.org) but these tutorials also will suggest that you can skip learning about testing. Many people often do. I think the main reasons people skip testing is that it is a second programming language to learn, and its purpose is not well explained. 

If your software is a book of math problems, your tests are the answers at the back of the book. Testing frameworks like [RSpec](https://www.relishapp.com/rspec/rspec-rails/docs) provide a language to describe what your software should do, and also are a way of making sure that it in fact does those things. While automated tests are not a complete replacement for human testing of software, they provide a general sense of what is and is not working in your software by pretending to be a person that uses that software. This can save time when manually testing software would be tedious; for example an automated test can load your site 300 times really quickly to test a rate limiter.

Testing is not without pitfalls. Sometimes a feature will work while testing of that feature fails. This can be due to a mismatch between your understanding of how your testing framework is doing something and how you do it in the real world. It can also be a bug in how the testing framework is executing the steps. Some people will write lots of tests for a model or program and then want to make changes. Extra work is created since for each change the tests also need to be updated to accomodate the change. The upside is tests will force you to be more deliberate in considering how your code works, but the downside is the cost of change increases. That is likely why [many developers do not regularly write tests](https://www.git-tower.com/p/mac-dev-survey/).

Ultimately learning to write tests has benefitted my code and also makes it easier to be confident when integrating changes from others into codebases I maintain. I am not religious about creating tests for every single change, but I believe that having a test suite and including tests with bug fixes is a good practice to prevent regressions and help others understand your program. 
