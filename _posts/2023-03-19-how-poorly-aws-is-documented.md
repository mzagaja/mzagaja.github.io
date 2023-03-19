---
title: How poorly AWS is documented
layout: post
---
AWS is one of the largest cloud platforms and we use it for our projects at Code for Boston. I spent this morning trying to figure out how to view logs from the past day on a project and boy was it a challenge.

### First I asked ChatGPT
I thought this was a good chance to take ChatGPT for a spin. It gave me a series of commands that came close to what I needed, but eventually started recommending arguments like:

```
--query 'events[?startswith(timestamp, `$(date +%Y-%m-%d)`)].{timestamp: fromtimestamp(timestamp/1000).strftime("%Y-%m-%d %H:%M:%S"), message: message}'
```

However the functions it wanted to use were from Python and not available to me in the shell. It was a good attempt, but not quite there.

### Then I asked Kagi
Kagi mostly pointed me to the [official AWS documents](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/logs/filter-log-events.html). These were better, although dense. Enough scanning lead me to discover there are `--start-time` and `--end-time` flags I can set to filter my time.

### The Hard Part Was Getting Time in Milliseconds
The `date` app in UNIX is not well documented either in its manual page nor its `--help` command. StackOverflow suggested using a variation of the format argument that wasn’t available in MacOS. Eventually I learned that `gdate -d "1 day ago  0:00" +%s%3N` can give you the UNIX date in milliseconds for a day ago at midnight if you’ve installed `brew install coreutils`.

### High quantity and low quality documentation
The hard part of using AWS and figuring out how to do things with it is the sheer volume of what can be done. There is a lot of documentation but it is not great. Instead of showing you how to accomplish specific things with examples, you get an isolated portion of a command without the context you need to use it. ChatGPT probably ingested most of this documentation and lacked the ability to provide examples because this input was low quality. I had to manually parse it before I could figure out how to do what I needed.

