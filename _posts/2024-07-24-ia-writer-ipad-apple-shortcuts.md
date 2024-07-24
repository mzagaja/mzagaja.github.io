---
layout: post
title: Posting to GitHub Pages with iA Writer on iPad
tags: []
---
A few weeks ago I got an iPad Air. I love using this including writing my blog posts on it, but did not have an easy way to post to my blog, which uses a programmer centric site generator called [Jekyll](https://www.jekyllrb.com/) to create the HTML that is then hosted on GitHub Pages. It turns out using the GitHub API and Apple Shortcuts this problem was not hard to solve.

### Why It Matters
If you want to do some one off convenience scripting on iPadOS Apple Shortcuts bridges the gap between the more simple operating system and some of the advanced things software engineers would want to do. Shortcuts gives you a way to automate the boring stuff.

### The Downers
* Shortcuts feels buggy, dragging and dropping actions does not easily let me order them and would often just place the action I am trying to move on the top of the stack.
* Debugging information is not easily available for every action.
* Trying to use Anthropic’s Claude to guide me in quickly developing the shortcut fell on its face when it gave me the wrong HTTP verb for GitHub’s API. It then failed to identify this issue when I gave it a screenshot of my shortcut.

### Bonus Downer
* The "copy text in Markdown" action misses the YAML front matter. I'll need to find a fix for that.
