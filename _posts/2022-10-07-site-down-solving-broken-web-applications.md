---
title: Site Down - How I Fix Broken Web Applications
layout: post
---
It happens when you least prepared. You’re deep into a project and suddenly get notifications from Slack and your monitoring systems that your site is down. Users are complaining. What do you do?

### Find the Problem
My first goal is to establish a perimeter on the problem. Which server(s) are alerting? What applications are on them? Are the servers working? Making sure apps and infrastructure use a tool like [New Relic](https://newrelic.com) can make it a lot easier to do this.

### Find the Trigger
When did the issue start? Was a new version of the app deployed around then? Did the server get an update?

### Get a Useful Error Message
If the issue is within an application or library the main goal is to get useful logging from the thing that is broken. This means looking at logs of the broken thing for clues. Sometimes you have to increase the log levels or deploy an update with additional logging enabled to get something useful. Sometimes an app is just the symptom and points to another app that is the root issue.

### Google the Error
In a large number of cases you are not the first person in your position. Googling the errors from your logs is surprisingly effective. It is often the case the first link to GitHub or StackOverflow will yield useful information. Even better is on GitHub you can simply scroll down to the post with the most emoji and copy the solution, it tends to work.

### Keep the Focus
If the first solution does not work, keep trying. No problem is inscrutable. Just keep finding errors and searching for answers. Stay hydrated. If you’ve set it up working once before, then you can always do it again.