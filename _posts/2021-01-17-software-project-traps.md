---
layout: post
title: Software Project Traps
tags:
  - Software
---
At Code for Boston we run a lot of software projects, and spend time thinking about how to avoid the pitfalls of them. Below are things we look for before and during our projects to make sure we are doing the right thing, and building the thing right.
## Not Talking to Users
Sometimes you have a project where you build something you think someone needs, but it turns out they either do not need the thing or they need it to work differently from how you built it. By interviewing users you can make sure you are building the right thing for them.

## Lack of Demand or Marketing
While the adage goes “if you build it they will come” this is not the case for software projects. You can create the most useful product in the world, but if you do not have a plan and budget to acquire users, then it will be like the tree that falls in the empty forest. No one will hear of it.

## Building for the Wrong Users
Sometimes stakeholders imagine non-existent users will want the product and then base user research on those personas. This is distinct from the lack of marketing problem above because in this case even if you marketed the product, the users would not be there to find. If you define your users as the general public, people who want to learn more about my product, or similarly general terms you are likely in this bucket. In many cases this can be remedied by reframing your audience as a small internal group that is trying to reach the general public, or identifying the more specific group in the public and doing appropriate user research and marketing with them.

## Solution Looking for a Problem
Sometimes you have a neat tool or piece of data but no problem that is solves. In this project you are panning for gold. Your best bet is to allocate most of your time to research in hopes of finding a match. However it is going to be much harder to succeed.

## Project is under-resourced
A typical software project iteration involves a team of four to six people working full-time in two week sprints. They can often delivery a minimum viable product in six weeks. Those people should include at least two software developers, a designer, and a product manager. At Code for Boston our volunteer projects have individuals in these roles (and more) and deliver usually in a year. If you do not have people in those roles, it is likely your project is under-resourced. The canonical resource on under-resourced software projects is [Death March by Edward Yourdon](https://amzn.to/3bV73qa).

## Seductive Distractions
Folks will sometimes get excited about a new technology they want to use. They may hear about their colleagues at large tech companies putting lots of time into accessibility or security and believe the defaults on their small project are no longer sufficient. While on their own merits these ventures may be worthy of a developer’s time, they can crowd out the resources needed to serve user needs and lead to project failure. Make sure to level yourself to the scale of your project and ignore the siren song of shiny new things that will suck up all your time.

## Rabbit Holes and Feature Taxes
Similar to the seductive distraction, the rabbit hole is when building a feature to serve an actual user need ends up being technically complex. The challenge with rabbit holes is you often cannot tell how deep they go. The best way to deal with them is to decide what your appetite to spend on the rabbit hole is and be willing to abandon it if it exceeds that appetite.

In the worst case scenario the necessary technical solution can create an expensive tax on future features, increasing the cost of future work by up to ten times what it would otherwise be. This can take the form of increased setup work to initially work on the application or necessary steps in development that have to be run every time the application is tested or viewed. This is less of an issue if you have plenty of time and experienced developers, but when working with newer folks ripping out the feature can make a substantial difference in the ability of others to work on an application. If it is merely running expensive compute operations you can also mitigate this by purchasing more powerful computers for your developers.

## Brittle Integrations
Connecting your software to an existing tool can feel like an easy way to save work and avoid having to teach users something new. However, in practice, many of these integrations are brittle. The existing tool might be flexible and allow users to make lots choices that developers of the custom software have to write code for. The interface for the existing tool might change in a software update, requiring the integration be re-written. The integration interface might not be documented well or have bugs that you have to work around because you cannot update the existing tool.

This is a tougher issue to spot, but there are a few things you can look at. First check the quality of the API documentation. If it does not look great, you’re probably not going to have a fun time. Second, Google for the tool plus your software development stack. If there are not many results, you are not going to have a fun time. Finally newer and proprietary tools tend to be more painful to deal with than older and open-source ones.

## The Subprime Software Shortcut
Faced with a bear of a technical feature you might discover an easy way out, for today. A particular person knows a particular but otherwise challenging way to resolve the issue. They implement it and the users are happy. Suddenly that individual leaves. In order to maintain or update the feature you now need to pay tuition for the rest of your team to become proficient in the technology or rip it out and rewrite it. The moment you choose that easy path the software becomes a **subprime asset**. It may not be an issue on short-term projects, but for long-lived products taking the cheap path can become extremely expensive later. This can be mitigated by training the rest of your team in the new technology or technique, or choosing a method that more closely fits with the existing software stack and knowledge of the team.
