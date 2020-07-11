---
layout: post
title: How to Choose a Database Server
tags: 
- Database
- Servers
- MySQL
- PostgresQL
---
Over the past year I have been mostly using MySQL on Amazon Web Services RDS for a database server when I needed one. It has worked well enough for me and I have learned a lot along the way. There is a great Mac OS X GUI for it called [Sequel Pro](http://www.sequelpro.com) that I recommend any SQL beginner check out. It makes importing CSVs into a database brain dead simple. Large companies like Facebook, AirBnb, and Wordpress use MySQL and it works great for them.

However the trend seems to be moving towards using [PostgreSQL](http://www.databasefriends.co/2014/03/favorite-relational-database.html). The folks at [Heroku prefer and advocate for it](https://twitter.com/herokupostgres), and there appears to be more discussion and excitement about it on HackerNews. Furthermore if you do any work with geogaphic data, [PostGIS is the gold standard](https://blog.heroku.com/archives/2013/4/30/building_location_based_apps_with_postgis). I think that [this link does an interesting job of explaining problems with MySQL](http://grimoire.ca/mysql/choose-something-else). I have finally found a [promising GUI](https://eggerapps.at/postico/). The PostgreSQL developers seem to be focusing on performance and closing or even beating its gap with MySQL. 

There are many places that use both. If you are learning Ruby on Rails the community seems to prefer PostgreSQL and you should choose that to start with. If you later find reason to use MySQL you can add that your stack as well.
