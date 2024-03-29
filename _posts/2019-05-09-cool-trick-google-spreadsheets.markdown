---
layout: post
title: One Cool Trick with Google Spreadsheets
---
Yesterday I was looking for an easy way to take a bunch of data and geocode it. In the past I used to either write a basic Ruby script to manipulate a CSV (which is not hard but more tedious than my late afternoon brain enjoys). I remembered I used to use Google Fusion tables to do this sort of thing and after some searching I learned you can now [write Javascript functions for your Google spreadsheet](https://developers.google.com/apps-script/guides/sheets/functions). Now instead of writing a full script I could write a four line function that accepted the address from another cell as an argument and return a latitude or longitude. I can imagine this feature being not only useful for me, but my colleagues as well.
