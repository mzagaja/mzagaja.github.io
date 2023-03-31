---
title: The Brutal Complexity of AWS
layout: post
---
Like many folks we use Amazon Web Services (AWS) at Code for Boston for our projects. AWS is a powerful platform with lots of products that can meet almost any need you have for cloud. The downside to this is operations that seem simple can become confusing.

### Why It Matters
When you work on a project the complexity of AWS might not be worth the effort. It is a great platform for your company or start-ups server infrastructure. If you need to do lots of video encoding or want to be able to summon resources without having to onboard a new vendor, AWS is the everything store. If you’re a small fish, other providers like [Digital Ocean](https://www.digitalocean.com) or [Linode/Akamai](https://www.linode.com) might provide a simpler setup for you.

### By the Numbers
- Last night I spent **90 minutes** trying to debug the nature of the connection between AWS RDS and Elastic Container Service.
- Getting the most recent logs from my deployment requires a command with **6 parameters**.
- **Four parameters** are required to re-deploy my cluster, but it does not seem to pull new versions of my task definition.

### Security is the Opposite of User Experience
Much of the complexity in AWS is introduced through security and isolation features. Having to manage the dance of users, security groups, and VPCs is a lot of overhead in a world where your application only needs an application server and database.