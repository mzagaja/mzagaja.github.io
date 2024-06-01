---
title: You're Insecure, Don't Know What For
layout: post
---
The software industry’s approach to security is broken. Among professionals there is a lack of consensus on best practices. Adoption of innovations is slow, uneven, and poorly executed. The regulatory and compliance framework around security involves large amounts of labor by businesses and practices that are hostile to end users. Despite all the effort that goes into security, it fails and fails often. 

### User Experience is the Biggest Barrier to Good Security
In an effort to improve my own personal security posture and experiment with the current state of the technology I picked up two Yubikey 5C NFC modules from [Yubico](https://www.yubico.com). This is the gold standard of security but has quite a learning curve. A Yubikey 5C NFC has seven different security functions within it, and can require up to ten separate PIN codes to fully utilize. The recommended usage of this device requires enrolling two security keys to every account you own so you have a backup if the primary one fails, is lost, or stolen.

The most painful aspect of this is demonstrated by this multi-step process for adding a Passkey to GitHub:
<iframe src="https://mastodon.social/@mzagaja/112542909761145874/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://mastodon.social/embed.js" async="async"></script>

This is less painful in Google Chrome which seems to have its own mechanism for accessing the Yubikey and will even respect the idea that your passkey’s PIN has already been entered on the machine with another application.

Bad UX can be mitigated with good documentation, but unfortunately Yubico’s “getting started” [setup documentation](https://www.yubico.com/setup/) is outdated with recommendations to use an older “Yubikey Manager” software instead of the better Yubico Authenticator app.

In a perfect world you would plug in your Yubikey, enter your PIN, and then when you go to a website you would use the ability of a Passkey to “one touch login” by tapping the Yubikey’s touch sensor. No need to remember usernames or passwords, or go through multiple screens. This is technically possible, but nobody has implemented this yet.

### Security is a Weak Link Game
You can put in all the effort to secure your accounts but in an effort to prevent you from being locked out of your account software developers often let you recover access with a “security question” which might be easier to guess than your password. Or they might send a one time code or link to your email address to let you login. They might allow access from less secure second factors like SMS or a link in their phone app. These allowances probably prevent customer service challenges, but render the use of Passkey or Security Kay moot.

### The Industries with the Strictest Security Needs and Regulations Have Yet to Adopt the Best Technologies
While my e-email and iCloud accounts are well protected by my new security keys, my bank and health portals are not. There is something ironic about my healthcare provider claiming sending personal health information to my e-mail is not “secure” but then requiring me to login to their proprietary portal with less stringent security protection and standards.

### The Impact
* [According to The Record](https://therecord.media/ransomware-tracker-the-latest-figures): “In the last month alone, the cities of Birmingham, Alabama, and East Baton Rouge, Louisiana said that security incidents disrupted public services, while Jackson County in Missouri was forced to declare a state of emergency after discovering a ransomware attack.
* [Change Healthcare paid hackers $22 million after it was victim of a ransomware attack](https://www.wired.com/story/change-healthcare-admits-it-paid-ransomware-hackers/).
* [Pharmacies were disrupted and couldn’t fill prescriptions after the Change Healthcare attack](https://www.reuters.com/business/healthcare-pharmaceuticals/change-healthcare-network-hit-by-cybersecurity-attack-2024-02-22/).

