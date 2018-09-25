---
layout: post
title: Iterating Vote.CTNewsJunkie.com
comments: on
---
Over the weekend I continued updating [vote.ctnewsjunkie.com](https://vote.ctnewsjunkie.com/) which is the voter information site that I launched it with CTNewsJunkie two years ago. The site began with the idea that we wanted to provide a utility for people to find the candidates running for office and then read surveys that these candidates would fill out. No other media outlet has attempted to compile information about all the candidates running for office in the state, nor interview them all. We have learned a lot from doing this over two years.

The first is that getting candidates to fill out surveys is challenging. Our main tool is an email list we have of all the candidates. We send them information including a login and links to the surveys. From their feedback we learned our login flow was a bit confusing. So over the weekend in addition to providing links to the candidate profile we added a link to the survey itself. Now as long as a candidate manages to login (whether from our email or a password reset email) they will be able to access the resources we need. We also removed some confusing elements of the login page that were causing people to try and sign up for a new account. 

The second is that there is a lot of back end work in making an app flexible for future elections before one time use. Our two years of experience uncovered abstractions that we did not see when we first started. However I do not regret waiting this long to implement them. While it was a bunch of work, we learned so much more from implementing the basic case and putting it out there than we would have from over-engineering the first version.