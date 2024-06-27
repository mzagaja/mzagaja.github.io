---
title: I Wasted $20 on Claude 3.5 Sonnet So You Don't Have To
layout: post
---
After reading the press release and hearing the buzz about Anthropic’s Claude 3.5 Sonnet AI model, I gave in and paid the $20 for their premium tier. The thing that most interested me was their project functionality that allows you to contextualize your conversation with files like code. The demos looked neat so I figured I’d feed it at JavaScript/Node project and ask it to make what should be an easy fix. It flopped spectacularly.

### Why It Matters
A major gap in the usability of AI tools is their lack of context around specific projects and knowledge bases. AI models often impress when they are asked about things that have been included in their training data. Color outside these lines and they quickly belly flop.

### AI is a Relevancy Engine Not a Reasoning Engine
In interviews with folks in the AI space I have heard claims around AI “working like the human brain does” and at the most extreme end folks who think AI will have general intelligence or even super intelligence. In yesterday’s test I had marked a specific spot to implement a code change with a comment, and Claude 3.5 sonnet outright ignored that. As I’ve been aggressively trying to get AI to code for me, I run into the same wall: it cannot reason through the code. Based on prompts it can generate greenfield code, but asking it to evaluate or modify existing code fails.

### GPT-4o is Better
Handing the same task I gave Claude 3.5 Sonnet with less context to OpenAI’s GPT-4o model, it did better at providing output that was on target for what I was looking for.

### AI Remains Almost as Good as a Mediocre College Intern
Whenever I ask for AI to “do the work” and return say a diff file I can patch or rewrite a class or method, it often makes elementary errors. The commit date might be random. It doesn’t ask for my name and email. It stops generating the output and leaves a comment that says “continue refactoring”. Variables and constants are renamed from what I used to what it decided. A friend of mine observes “AI is a good starting point but rarely a good ending point.”