---
title: AI Will Not Steal Your Coding Job
layout: post
---
With the rise of [GitHub CoPilot](https://github.com/features/copilot) I hear software engineers worry about artificial intelligence taking their jobs. This is the third major threat to coding jobs I have seen after offshore outsourcing and no-code tools.

### Why It Matters
There has long been a shortage of software engineers. Software has potential to make a whole of industries and processes more efficient and productive. If artificial intelligence **could** replace real coders, it would be the biggest boon to the economy since the industrial revolution.

### You Cannot Take Humans Out of Building Software
Even if we can remove the coders, building software involves lots of people skills and interactions. You have to build an understanding of an existing process or product to design it. Many decisions are discretionary: do you make the easy to use tool for one task, or the powerful flexible tool for many tasks? What hardware and software platform will the tool be built in? Users care about speed, performance, and reliability as much as features but there is not a way without software engineers to make AI software less buggy.[^1]

### The Limits of No and Low Code Tools
Nearly ever tool that is low or no code from AirTable to Salesforce follow the same pattern. They create a product that promises to bring the power of code to non-coders and stay simple, but over time the users demand more functionality. The company dutifully builds features and the no-code or low-code tool starts to mimic its underlying libraries. Organizations then hire coders to integrate it with new custom software or other no-code tools. Eventually they are left with a jumble of black boxes that do not benefit from major advances in software engineering like version control and automated testing. 

### The Fundamental Flaw in AI
The other fundamental flaw in AI is it does not do the same thing every time. The main advantage of regular software is its consistency. You can guarantee given a particular type of input, you will get a certain output. If you lock-in an AI model you can get similar consistency, but you can’t guarantee outputs for values that the model hasn’t been trained or tested against. 

If you are using AI to de-duplicate a list of people, you might know they’re always the same if their phone numbers are the same. In code you can say strip all non numeric characters and then compare it. This will always work. You can try and train an AI model to do this, but it might fail to de-duplicate two items if the phone number has parenthesis instead of dashes and the AI model was not trained on this.

[^1]: If you think AI bugs don’t matter take a look at facial recognition tools that cannot identify people of color, or a self-driving car that gets into an accident.
