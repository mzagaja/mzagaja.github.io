---
layout: post
title: How to Get iOS 6, Mac OS X, and Google Contacts to Sync Properly
tags: []
---
<strong>Note:</strong> Updated on December 14, 2012 to reflect that GMail will not be working with Exchange anymore.

One of the most miserable parts of owning multiple gadgets and using multiple technologies is getting them to all play nicely together. Today Apple released iOS 6 and with it deep facebook and twitter integration that can confuse even the best of us. I have been spending the afternoon experimentally attempting to determine how all these different systems work together. This system assumes you are using an iPhone or iPad with iOS 6 and the latest version of Mac OS X. It also assumes you want all your contacts in GMail.

<strong>Important</strong>: Before starting this process you may want to backup your contact lists using the procedures appropriate to each account. You probably won't lose anything provided you follow these instructions exactly and do not choose options to delete all your contacts, but it is better safe than sorry. More info: <a href="http://support.google.com/mail/bin/answer.py?hl=en&amp;answer=24911">Export GMail Contacts</a>, <a href="http://osxdaily.com/2012/06/14/how-to-back-up-your-iphone-contacts/">How to backup iPhone Contacts</a>, <a href="http://osxdaily.com/2011/09/19/backup-address-book-mac-os-x/">Backup Apple Address Book</a>.

<!--more-->The first step is to setup your iOS devices so you are only using iCloud for your contacts. It will make your life simpler. To see if you are using iCloud for your contacts you go into "Settings" and then "iCloud" and make sure it is setup. The switch to contacts should be set to on like the picture below:



Then you should set your Mail, Calendars, and Contacts section so that you are syncing only your mail to your Google account. After Google depreciated the use of Exchange I setup my e-mail with the official GMail App using <a href="http://www.theverge.com/2012/12/5/3732364/best-way-gmail-google-calendar-iphone-how-to">instructions from The Verge</a>. As a bonus using the official GMail app seems to use less battery than Exchange.

Next you'll need to make sure OS X is setup for your accounts properly. Again you will run everything but e-mail through iCloud. You can also choose to setup Messages and Notes with Google. If iCloud is not yet setup on your computer you can follow the <a href="http://www.apple.com/icloud/setup/mac.html">instructions from Apple</a>. If you need to setup your Google mail on your desktop you can <a href="https://support.google.com/mail/bin/static.py?hl=en&amp;ts=1668960&amp;page=ts.cs">follow these instructions</a>. I recommend using IMAP. If you already added your Facebook and Twitter accounts then your mail settings screen in OS X will look something like this:

<a href="http://www.zagaja.com/images/2012/09/iCloud-settings.png"><img class="size-medium wp-image-364" title="Mail, Contacts, and Calendars settings" alt="Apple Mail, Contacts, and Calendars Settings" src="http://www.zagaja.com/images/2012/09/iCloud-settings-300x230.png" width="300" height="230" /></a> This is what the settings will look like in Mail, Contacts, and Calendars after you have set things up properly.[/caption]

Also you should make sure your Contacts app is setup to default to iCloud for contacts. You can do so by opening the Mac OS X Contacts app and clicking the "Contacts" menu in the upper left hand corner of the screen and choosing preferences. The first screen should look like:

<a href="http://www.zagaja.com/images/2012/09/Screen-Shot-2012-09-20-at-12.06.44-AM.png"><img class="size-medium wp-image-365" title="Contacts App Preferences" alt="Contacts App Preferences" src="http://www.zagaja.com/images/2012/09/Screen-Shot-2012-09-20-at-12.06.44-AM-300x151.png" width="300" height="151" /></a> This is what the preferences in the contacts app should look like.

Once you have confirmed that setting then you are ready to move on.

The next step is to install <a href="http://itunes.apple.com/us/app/cobook/id525225808?mt=12">Cobook</a>. Cobook seems to do the best job of synchronizing Google's contacts with iCloud and OS X. You should install it from the Mac App Store and then set it up to sync to your google account. Instructions on doing that <a href="http://support.cobookapp.com/kb/faq/can-cobook-sync-with-google-contacts">are here</a>. After you set it up with some luck you will start getting a sync going between your Google and Mac contacts. Changes made on your Mac or your phone will be sent to and from Google using this app. After it finishes syncing you may have to spend some time cleaning your contact information. A helpful tip is to open the Mac OS X Contacts app and go to the "Card" menu and choose "Look for duplicates" and it will merge them together. Additional cleaning to contact information is mostly a manual endeavor.

At this point you can feel free to go into the settings of your iOS device and Mac OS X and add your Facebook and twitter accounts. The OS will attempt to match your contacts. The twitter, facebook, and iCloud contacts will all be kept in separate "buckets" on the computer. However your contacts in Google and iCloud will have a link inserted into them so the computers know they go with certain facebook and twitter contacts. In other words, the information from facebook and twitter will not permanently alter your contacts. It will just be accessible to you in an easy manner.

This is how I have chosen to setup my devices. You have other options as well depending on your needs. Cobook can use its own facebook and twitter sync options to add info to the iCloud contacts that will sync with Google. However I am not sure if it will cause problems with duplicate data. If you have questions or suggestions feel free to leave them in the comments.
