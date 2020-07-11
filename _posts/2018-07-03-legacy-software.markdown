---
layout: post
title: Legacy Software
---
I thought that Mark Headd had an interesting tweet yesterday:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Thought experiment: people in gov tech have been talking about migrating critical apps off of mainframes since the 90’s. Has it been one long fail, or did we completely underestimate the resiliency of mainframes as an enterprise technology?</p>&mdash; Mark Headd (@mheadd) <a href="https://twitter.com/mheadd/status/1013948973592252416?ref_src=twsrc%5Etfw">July 3, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

This tweet gave me a few thoughts from my own experience that I shared:

> After a couple legacy app rewrites (not from mainframes but old Python Django —> Rails) you quickly learn how tough it can be when the best you can do is “match” what was there before. Apple still has whiplash from Apple Maps and that was years ago…
> 
> Things I’ve discovered about legacy software:

> 1. Undocumented functionality is discovered by users. Turns into an “important feature”
> 2. Users map their own abstractions into the existing system as the real world system changes but software stays stagnant.

> Also after writing software on a rather stressful deadline for a City of Boston project I expected it to get junked after. Instead they opted not to rewrite. It’s not the best code I’ve written, but it was battle tested. Never realized how important that was until gov’t.

Ultimately rewriting legacy software often “feels” like the right thing to do but the distance of the rewrite feels like it is less than it actually ends up being once you attempt to do it. It is not that it is never worth doing a rewrite, but the value of the rewrite often is less than you initially think it will be.
