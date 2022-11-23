---
title: The Cost of Legacy Web Applications
layout: post
---
A common scenario I see in web application development goes like this:
1. A developer is presented with an existing web application and is asked to add a new feature.
2. Lacking familiarity and confidence in the old code base, they suggest creating a new web application that both implements the new functionality and then *easily* replaces the old application.
3. The new application is built with the needed feature, but the re-implemented functionality from the old application falls short. Sometimes of user expectations, sometimes of being able to work with existing systems.
4. Instead of throwing effort at re-implementing old functionality, the organization decides to run the old and new applications side-by-side.

Now the organization is paying the carrying cost for servers and maintenance of the old and new applications.

### It Gets Worse
Over time requests for features that rely on both and old and new applications arrive. The software developers dutifully implement these features, and in the process the old and new applications become tightly coupled. Eventually changes cannot be made to the old system without understanding the new system and vice-versa.

### Is It Worth Retiring the Old System?

From [18F’s Article on the Encasement Strategy](https://18f.gsa.gov/2014/09/08/the-encasement-strategy-on-legacy-systems-and-the/):
> Let us say that it costs $1,000,000 present-day dollars to maintain this team every year…
> 
> How much money would you have to save this year in order to justify paying out $1,000,000 a year?… 
> 
> $34 million or more.

### If Maintenance is Free You Need Insurance
One objection to the above method is maintenance is free. If an application works, do not touch it. This works, until it does not.[^1] If maintenance is free then you should ask: how much would I need to pay if this system disappeared today to replace its business utility? Put that money in a bank account, or buy an insurance policy for it.

[^1]: Web applications rarely exist in a vacuum. Even if it does not change, something it connects to will. The server might break and require a re-setup of the app. Vendors might stop supporting an old standard or file format. The application might not change, but the world around it does.