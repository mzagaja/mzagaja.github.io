---
title: AI LLM Shootout
layout: post
---
Realizing that large language models are imperfect as a user interface, I had the idea last week what if I could use them to translate documentation into some of the tools like [fish shell](https://fishshell.com) and [Dash](https://kapeli.com/dash) to augment their data and improve my efficiency. This way rather than having to wait for the LLM to load or referring back to it, I can get my assistance where it’s most convenient.

### Why It Matters
Translating documentation from human written formats to machine processable data and configuration files is a trivial thing for people to do. It is also rote and boring. With claims of being able to pass the bar exam, I would expect an LLM to excel at this trivial task and save me hours of time.

### A Massive Bellyflop
I tried multiple models and asked friends to tried their paid tiers, and only one LLM was able to somewhat successfully complete this task:
* ❌ OpenAI Chat-GPT 3.5
* ❌ OpenAI Chat-GPT 4
* ❌ Kagi FastGPT
* ❌ Kagi Ultimate Mistral Large
* ✅ [Kagi Clause 3 Opus](https://help.kagi.com/kagi/plans/ultimate-plan.html)

I still had to tweak and futz with the output of Claude 3, and it needs some work to get it to work with prefixed (`bundle exec`) completions.

### I Remain Bullish on Specialized AI
Generalized artificial intelligence tools and LLMs do not feel like they do a great job at the tasks I throw at them. For some things like getting ffmpeg flags or acting as a proxy to general search they are fine. However when you ask them to reason or “do the work” they struggle unless you have a good model and that model has the relevant training data. Because of the nature of the languages and libraries I use are a bit less common, LLMs tend to struggle with the tasks I throw at them. When AI companies claim their AI can do things like “pass the bar exam” more likely than not they have been trained on law and bar exam related questions. It does not mean the LLM is smart: it’s easy to pass a test when you have an answer key. However finding situations where there are patterns in translating to or from some sort of fuzzy input or output that generally follows a pattern, AI can do if you give it enough data. 