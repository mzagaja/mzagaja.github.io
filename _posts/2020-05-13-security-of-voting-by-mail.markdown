---
layout: post
title: Lunch Talk Notes - The Security of Voting by Mail
tags:
- Lunch Talk Notes
---
On Tuesday the Berkman Klein Center hosted a [virtual lunch with Ben Adida on voting security](https://cyber.harvard.edu/events/virtual-building-better-voting-systems). Ben has created a non-profit organization, [VotingWorks](https://voting.works), that has developed an open source voting machine. As a result we got a master class in the principles of election security. 

Ben framed the enormity of this challenge as follows: “Your vote should be secret from the government your employer neighbor and spouse even if you’d like them to know. Otherwise you can sell your vote.” He noted this is more stringent than even health or banking security. We put a higher bar on our elections than security associated with anything else.

The VotingWorks machine relies on a paper ballot that is marked either by a machine or voter, and scanned by a machine. The reason for the use of paper in the process is because to be secure people must trust the medium their ballot is being transmitted in. Paper is the only medium that most voters can verify privately. Coupled with the auditing of voting machines we can reliably and reproducibly have secret elections that scale.

VotingWorks has also focused on accessibility. Ben noted that many blind users have apps that will read the text on the paper ballot to them. They also have developed a guided electronic ballot that reads choices to a voter and then will print out their marked ballot. Ben noted that the issue of whether a machine or person marked ballot is more secure is unsettled, but the person marked ballot certainly seems less expensive since they can be marked with any marking device.

When it comes to vote by mail, Ben said that this was the best option for the 2020 election that balances safety and security. However he also noted it should not be the default forever. In a vote by mail scenario the secrecy of the ballot is more vulnerable than an in-person voting scenario. Someone could watch you mark your ballot and put it in a mailbox, as opposed to the supervised scenario you undergo in a polling place where moderators would prevent that.

The pink elephant in the room is, of course, Internet voting. Why in 2020 can we not Internet vote? It boils down to the fact that in addition to guaranteeing the security of the underlying system, we also would need to guarantee the security of all the users computers. What if someone hacked your computer and managed to change your vote before you submitted it? The system would never know. Paper ballots do not have this issue. Ben did note that you have to consider the security in context of the risk. As noted on the website for his Internet voting tool [Helios](https://heliosvoting.org/faq):

>Online elections are appropriate when one does not expect a large attempt at defrauding or coercing voters. For some elections, notably US Federal and State elections, the stakes are too high, and we recommend against capturing votes over the Internet. This has nothing to do with Helios itself: we just don’t trust that people’s home computers are secure enough to withstand significant attacks.

Ben’s talk was an accessible introduction to voting security, and I really liked the VotingWorks open source voting machine concept. I wish more security talks were like his.
