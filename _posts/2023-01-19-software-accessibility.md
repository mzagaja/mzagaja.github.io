---
title: Why Software Engineers are Passionate About Accessibility
layout: post
---
Among all the software companies Apple has done a lot to improve the accessibility of computer systems. By accessibility I typically mean the ability of the computer to use a screen reader or other adaptive features to present an interface to humans. As complexity of web technologies has exploded, the compatibility of the resulting products with screen readers has declined, leading to a large group of folks rightfully asking “WTF?”

### Why It Matters
If your web application does not work well or properly with screen readers than a whole bunch of people cannot use it. If it is your Star Wars fan website this is pretty low stakes, but it is a big deal if you are a business that books airline travel, or a government agency that provides benefits.

### The Problem with Building Accessible Web Applications
The elephant in the room with accessible web application technology is the amount of work and implementation required by software engineers. Sometimes this is a function of choosing to use JavaScript frameworks that do not cooperate with screen readers by default. If you create structured markup without intervening JavaScript, you usually do not need to think about accessibility if you use the markup correctly, it just works. This is less true for JavaScript. It is also less true if you do not learn or use HTML tags properly. Lots of work is put into making things better for the end user, but little thought goes into making it less tedious for software developers to make their products accessible.

### Are People Really Going to Write Alt Text?
One thing I am skeptical about is whether culturally we can get end users to write alt text for all their images. Accessibility advocates are passionate about this. However I can barely find software engineers that read and write JIRA tickets. The idea of burdening end users of CMS or social media systems with the responsibility of writing alt text makes the user experience worse. This is even more true when so many people might not be great at writing alt text. Some folks have creatively tried to tackle this with AI solutions, to varying success. I am bullish on this, but do not yet think the technology is there.

### Accessible by Design?
I frame the above two issues because I think the only way for accessibility to become pervasive is if developer and end user tooling makes it simple. A few ideas I like:
* What if your code editor lints for accessibility issues? Some linters and test suite [already support this](https://www.deque.com/axe/).
* What if AI writes a “first draft” of alt text that is presented to a user instead of giving them a blank box?
* GitHub already indexes common security issues and makes automatic pull requests with Dependabot. Can an accessibility bot identify common accessibility issues in code and then pull request a proposed fix?
* Can we make sure GitHub CoPilot is being trained on examples that are compatible with screen readers?