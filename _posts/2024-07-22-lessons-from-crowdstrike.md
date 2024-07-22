---
title: Lessons from Crowdstrike
layout: post
---
As I sat in our hospital room with my wife and newborn son, I was a little bit trapped. The computer the nurses had been using now displayed an error message. Our morning nurse came by and asked for whatever paper records they had left in my son’s bassinet. Our hoped for early discharge was waylaid not by a foreign actor or expert saboteur but by the very software meant to protect the hospital from these threats. Straight out of the 80s the backup discharge plan involved our doctor painstakingly hand scribing our son’s medical record. So much time had been spent trying to prevent disaster yet not nearly enough time and effort had been spent planning to recover from it.

### Why It Matters
Sometimes your defenses fail. Or in this case you fall victim to friendly fire. The faster you can recover from failure the less painful it is.

### Some Things to Consider
* Rather than using a single vendor for computers and software, larger organizations, especially those with mission critical functions, should diversify their pool and engage multiple software tools for the same function. If one fails then it makes it easier to shift resources to the other one(s).
* When engaging vendors companies should require they provide data in standard formats and have standard APIs. This way if one vendor fails you can more easily recover migrate to the next.
* Organizations should run recovery drills where they rebuild their infrastructure from scratch using their backups. They should be required to report their "time to live" from when they start the process. Simply put: if an incident destroys a company infrastructure we should know  how long it will take them to recover.

### A Digital Services Reserve
When natural disaster strikes in the United States, FEMA comes in and helps manage the situation. When a major technical incident occurs we need to a government agency that can swoop in and help. By establishing a Digital Services Reserve we can have experts at the ready to do things like manually update lots of computers or dissect otherwise inscrutable technical problems. If government can provide a surge of help, hospitals, banks, and other critical organizations will more quickly be able to recover.