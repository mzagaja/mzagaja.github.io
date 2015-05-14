---
layout: post
title: The Ethics of Artificial Intelligence
tags: 
- Ethics
- Artificial Intelligence
- Machine Learning
- Data
comments: on
---
Today [Fred Wilson](http://www.avc.com/) asked his audience about the ethics of algorithms and pointed to a [post](https://www.usv.com/topic/the-ethics-of-algorithms) on his firm's website. I recently read a [good article by Steven Levy on Google's deep learning efforts](https://medium.com/backchannel/google-search-will-be-your-next-brain-5207c26e4523) and have been thinking about this issue quite a bit. I adopted [a comment I wrote on the Union Square Ventures website](https://www.usv.com/topic/the-ethics-of-algorithms#comment-1834792296) into today's blog post.

I think that we can divide the ethical issues into a four buckets:

1. Correctable unforseen consequences
2. Uncorrectable unforseen consequences
3. Forseen correctable consequences
4. Forseen uncorrectable consequences

Type 3 ethical issues are entirely on the people that make the algorithm. A common hypothetical that would be a type 3 issue is the autonomous car that has to decide whether it is going to crash into and kill a pedestrian or crash into some kind of building and kill the driver. We already know what we want the car to do, we're just scared that it might be programmed to do something else. It is a no-win scenario and something bad will happen. All things being equal I think we just program the car to do what the driver would do, or let the automation cease control of the car at the moment and let the person decide.

For a type 3 issue you want to make sure you are collecting appropriate data and using it to correct the algorithm. For type 4 and 2 I think there is a fundamental analysis that is both economic and moral. If you replace a jury with an algorithm that we somehow know gets verdicts wrong 5% of the time, and we also know that jurys get verdicts wrong 12.5% of the time then we are really asking ourselves whether we are more accepting of flaws from people or from machines. The algorithm might mirror some of our own flaws. It could be racist, but people are also racist.

Type 1 problems can fortunately be fixed, but raise the question of whether the victims of the algorithm are deserving of some kind of remedy and if so does the culpability for introducing the problem sit with the designer of the algorithm or with the algorithm itself. In the case of unsupervised deep learning there is little human input into the design of the behavior of the algorithm other than the raw data it is fed. In supervised learning there is more control and the question can be raised about whether the algorithm designer thought about the issue or if it should have been forseen.

In tort law one of the fundamental things that is discussed is negligence so what we're really going to look for is what is the negligence standard for the design of an algorithm. Certainly one that is designed to identify cats in YouTube videos is going to be much lower stakes than an algorithmic jury that can convict someone of a crime and impose the death penalty. There should certainly be a battery of testing involved.

I think an interesting regulatory model to follow is the food and drug administration. The ethical issues raised by algorithms are similar to ethical issues raised by testing new drugs. What are the side effects? Is the algorithm really doing what we need it to do? Is this ok to have this drug in the market if it cures cancer but ends up killing or debilitating a small subset of people? We do not regulate vitamin C supplements as heavily as painkillers because the stakes are completely different.