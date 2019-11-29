---
layout: post
title: Automated Accessibility Testing with RSpec
comments: on
---
At [MAPC](https://www.mapc.org) we have been thinking more about making our web applications accessible to all our users. Unfortunately standard web frameworks and tools do not bake this functionality in. Accessibility is its own specialization with code and nuances that software developers have to learn on top of everything else they do. The good news is that as this issue has become more prominent tools are emerging to make it easier to automate making your application accessible. One tool I started experimenting with is the [axe-matchers gem from Deque](https://github.com/dequelabs/axe-matchers).

In order to use this tool you should add `gem axe-matchers` to your test group in your Gemfile, then `require 'axe/rspec'` in `spec_helper.rb`. After that it is as simple as adding a test to your Rspec test suite:

  ```
  it "is accessible", js: true do
    create(:page)
    visit "/"
    expect(page).to be_accessible
  end
  ```

There are methods to get granular with different parts of your pages if you want to break it up. The nice thing is that axe-matchers provides specific actionable feedback with links that explain the rationale for the rules. Example output is below:

```
3) link-name: Links must have discernible text (serious)
   https://dequeuniversity.com/rules/axe/3.1/link-name?application=axeAPI
   The following 3 nodes violate this rule:

       Selector: .footer-right > a:nth-child(1)
       HTML: <a href="https://twitter.com/mapcmetroboston"><i class="fa fa-twitter"></i></a>
       Fix all of the following:
       - Element is in tab order and does not have accessible text
       Fix any of the following:
       - Element does not have text that is visible to screen readers
       - aria-label attribute does not exist or is empty
       - aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
       - Element's default semantics were not overridden with role="presentation"
       - Element's default semantics were not overridden with role="none"

       Selector: .footer-right > a:nth-child(2)
       HTML: <a href="https://www.instagram.com/mapcmetroboston"><i class="fa fa-instagram"></i></a>
       Fix all of the following:
       - Element is in tab order and does not have accessible text
       Fix any of the following:
       - Element does not have text that is visible to screen readers
       - aria-label attribute does not exist or is empty
       - aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
       - Element's default semantics were not overridden with role="presentation"
       - Element's default semantics were not overridden with role="none"

       Selector: a:nth-child(3)
       HTML: <a href="https://www.facebook.com/mapcmetroboston"><i class="fa fa-facebook"></i></a>
       Fix all of the following:
       - Element is in tab order and does not have accessible text
       Fix any of the following:
       - Element does not have text that is visible to screen readers
       - aria-label attribute does not exist or is empty
       - aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
       - Element's default semantics were not overridden with role="presentation"
       - Element's default semantics were not overridden with role="none
   ```

As a developer using an automated test that provides specific feedback and suggested remedies makes implementing accessibility best practices much easier. Given how easy this was to implement, trying this out is an easy win for any Rails developer.
