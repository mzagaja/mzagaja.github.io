---
layout: post
title: Deploying a Rails Application to a Linode VPS
tags: 
- Linode
- Rails
- Ruby
- VPS
---
This seemed like a simple thing to do when I watched a [30 minute video on it](http://confreaks.tv/videos/railsconf2014-deploying-rails-is-easier-than-it-looks). Unfortunately it has been more of a learning experience than I hoped. A minor difference in a file that Ubuntu includes by default meant that the documentation for Phusion Passenger 4 was not correct. I spent a lot of time trying to figure out how to get environmental variables working in my deployment, and my [solution is now on Stackoverflow](http://stackoverflow.com/questions/28912407/phusion-passenger-4-nginx-cannot-see-environment-variables-in-ubuntu-linux/28917445#28917445).

I also have spent quite a bit of time setting up PostgreSQL. It works now but it is strange that flipping the authentication method between peer and md5 does not seem to impact Rails or Postico's ability to access the server even if I have it set on peer and access it from a different user over SSH. I only find it odd because before I briefly flipped it to MD5 initially, I could not connect to the databse server at all using localhost. I am going to just accept this for now since it's not a problem.

Finally I am still in the process of getting the static assets to load and work properly. Heroku did much of this automatically and I now understand its appeal. If you want to start programming in Ruby on Rails I strongly recommend using and sticking with Heroku until you are ready and interested in learning some Linux server administration. It saves you a huge amount of pain.
