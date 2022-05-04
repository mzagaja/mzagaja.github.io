---
layout: post
title: One Fun Trick with the GitHub CLI
tags:
- Software
---
One of the most useful things as a GitHub user is their [command line interface tool](https://cli.github.com/). I discover more uses for it every day. Ever want to share a git stash or put it somewhere that it won’t disappear on you? The GitHub CLI has you covered:

```
git diff | gh gist create -f my-stash.diff
```

and then when you’re ready to apply it to your repo (or are sharing with a friend:

```
gh gist view [gist_id] | git apply
```