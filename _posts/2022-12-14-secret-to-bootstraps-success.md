---
title: The Secret to Bootstrap’s Success
layout: post
---
[Clive Thompson writing on Medium](https://betterprogramming.pub/the-awesome-power-of-well-documented-code-cadf42e07be3?sk=6a73dd59227af6777ff92ff60e0333c8):
> Many software developers are terrible at this. To be fair, most everyone is bad at it; hell, I know full-time journalists who fail at this task all the time.
> 
> The writing of documentation is, in other words, a liberal art.
> 
> And if you’re good at it? Holy crap, it can really make your open-source project explode in popularity.

### Why It Matters
One of the reasons I chose to pick up Ruby on Rails was the quality of the documentation. Specifically the quality of Michael Hartl’s [Rails Tutorial](https://www.railstutorial.org), which had a free version at the time. Without good documentation you have to spend  a lot more effort dissecting code and figuring out how it works.

### Making Documentation Better
Tools like [YARD](https://yardoc.org) provide assistance in creating structured documentation for Ruby libraries, but ironically YARD itself is poorly documented. YARD and similar tools encourage you to document by providing a structured way to do it as you code. It answers “what should you document” but not “how should you document it”. You can even get an analysis of what documentation is missing.

In law school many students quickly learn the power of [examples and explanations](https://www.amazon.com/Examples-Explanations-Procedure-Joseph-Glannon/dp/1454894024) as a study aid. For code this means including a working code example for your methods and functions. **A working example communicates with much higher signal than narrative alone.**

### Secondary Resources Count Less
Many open source contributors make money by writing the missing manual for their code bases. It is not an awful model, but I think it holds back success. In addition to being high quality, **documentation needs to be discoverable**. The easiest documentation to discover is the documentation that is near the code.

### Do Not Forget to Make a Change Log
One of the ways I have learned a lot about the software I use is through its [change log](https://keepachangelog.com/en/1.0.0/). Writing a good change log helps users adopt to changes to your software and discover new features.