---
title: The Value of Code Comments
layout: post
---
One of the things I changed my mind about after joining TED was the value of code comments. TED codebases take advantage of [YARD](https://yardoc.org) to annotate its code. This makes it easy to generate searchable documentation for every app we use. I then often import these document sets into [Dash app](https://kapeli.com/dash).

### Why It Matters
Often time code bases have little documentation. Martin Fowler and folks that look at refactoring often [cite comments as a code smell](https://refactoring.guru/smells/comments). Their point that more intuitive code is more valuable than comments is astute, but narrative can go a long way in aiding understanding. Putting comments along your code means you’re more likely to document things, and also keeps it under version control with your code. It’s no longer an afterthought.

### Matt’s Tips for Good Code Comments
* **Examples** are the best way to communicate how to use a piece of code.
* URLs go stale, issue trackers change, so err on the side of inlining information in longer comments as well as linking to outside resources.
* Simple methods and functions need little explanation but if you’re using less common coding techniques like meta programming it can help junior developers to state what the function does.
* Useful comments answer the question: how can I use this function, method, or class?
	* What goes into the arguments?
	* What is returned?
	* Are there constraints or limitations?

### How I Import YARD Docs into Dash App
There is a [nice ruby gem called doc_to_dash](https://github.com/minglecm/doc_to_dash) that lets you convert HTML files into something you can use with Dash. I often do something like:

```
yardoc --output-dir doc/yard - doc/guides/*.md && 
doc_to_dash --name $(basename $PWD) --output ~/Developer/dash-docsets/ doc/yard
```

I then import the document set into Dash.

### Use the /docs directory instead of the GitHub Wiki

GitHub helpfully provides a Wiki feature which is a bit friendlier to novices for storing documentation. However there are [many reasons to keep documentation in a /docs folder of your repo instead](https://michaelheap.com/github-wiki-is-an-antipattern/). 