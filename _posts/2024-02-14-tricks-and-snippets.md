---
title: Why Tricks and Snippets Beat Custom Tools for Developer Experience
layout: post
---
A common pattern I see programmers try is to write little scripts and utilities to streamline repetitive tasks. A program might arrive with a small app in “./bin/utility” you can add to your $PATH and quickly execute on things. These scripts and utilities are well meaning, but long term they tend to break. Once they do, their value proposition evaporates.

### Why It Matters
In the name of convenience or developer experience folks will put effort into streamlining repetitive processes. Convenience wrappers and utilities can reduce effort and mental load, especially if frequently used. However trying to package these for other systems or use them long term introduces new commitments to support them that did not exist on your system. Save yourself and others the headache of fighting with your custom tooling by not abstracting the underlying tools.

### Alternatives to the Convenience Tool
* [Fish shall abbreviations](https://fishshell.com/docs/current/cmds/abbr.html) work great.
* iTerm2 offers [snippets](https://iterm2.com/documentation-one-page.html).
* Write some documentation and include it in an easily copyable block in Markdown.

### Shell Scripts are Fine
The exception to this rule is standardized scripts that are included with applications like `./bin/setup` that should automatically setup a Rails application, or `yarn start` that should start a JavaScript app. A self-contained shall script like `do_stuff.sh` is going to be less painful than `script_of_functions.sh` that is trying to map input to an existing CLI tool. After all, if I have to put in the effort to memorize or read your custom function list, why not just do so for the underlying tool?