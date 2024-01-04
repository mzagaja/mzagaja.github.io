---
title: ChatGPT is an Unfair Use
layout: post
---
Recently the [New York Times was in the news for suing OpenAI over copyright infringement](https://www.nytimes.com/2023/12/27/business/media/new-york-times-open-ai-microsoft-lawsuit.html?mwgrp=c-dbar&unlocked_article_code=1.J00.Mg_6.mm478Ym1eMrY&smid=url-share). Tech journalists like Mike Masnick [have taken the other side](https://www.techdirt.com/2023/12/28/the-ny-times-lawsuit-against-openai-would-open-up-the-ny-times-to-all-sorts-of-lawsuits-should-it-win/) and suggest that finding in favor of the Times would be bad for innovation. Having studied copyright in law school and experimenting with large language models (LLMs) makes me think that the Times is correct here, and I doubt that this will hamper innovation.

To understand how copyright matters, you have to understand how LLMs work. They use [neural network algorithms that mimic the functionality of the human brain](https://www.discovermagazine.com/technology/ai-and-the-human-brain-how-similar-are-they). Like a human brain they require memories to produce useful output. Using a text interface like ChatGPT you can prompt an LLM with questions and you receive answers based on the training data. Some LLMs like Kagi and Bing augment their LLMs by feeding them current web results. Fundamentally an LLM is an interface to this training data and whatever you augment it with.

Proving infringement is trivial, you [just have to show the plaintiff owns a copyright and that the defendant copied original expression from the work](https://www.ce9.uscourts.gov/jury-instructions/node/261). ChatGPT has some guardrails around infringing, when I ask for the lyrics to U2’s Angel of Harlem it protests it cannot provide infringing material. However getting ChatGPT to infringe with some work is not hard. With the right prompts ChatGPT will cough up fragments, sometimes substantial, of its training data.

The real issue is fair use. Is an LLM use fair? Courts consider four factors:
1. the purpose and character of your use
2. the nature of the copyrighted work
3. the amount and substantiality of the portion taken, and
4. the effect of the use upon the potential market.

In many cases LLMs are used as nothing more than a fancy search engine. **Much of the value of ChatGPT comes not from the fact it reasons and brings more relevant information to you more quickly, but that it provides it in a place without annoying popover ads, paywalls, cookie consent banners, and other annoyances that litter the modern web.** 

You might ask it to recommend a mobile phone to purchase and it may be trained from multiple mobile phone reviews and mix them, but the result is a recommendation that removes the market for phone review websites altogether and to the extent it shares your exact prose, would infringe on your copyright.

Copyright scholars might object that observations on mobile phones are mere facts, unprotected by copyright, and that would be correct. The idea behind an opinion is not protected, only its expression. This is why content farms like eHow have proliferated, and why every online publication has a page telling you “when is the super bowl this year”? To the extent search engines are research tools for facts, the web has already been creating junk content to answer these fact based questions. Answering a question like when is the super bowl looks like a fair use.

Authors of web content have long noted that Google has been taking the wind out of their sales by grabbing snippets of their work and making them part of its interface. Taking portions of work makes the use look fair, but the fact it robs the target website of traffic and the goal of Google is to make ad money, makes the use look unfair. Google moves from a partner to the content creator to a competitor as it takes the content and tries to occupy the market for it. Answering when the super bowl is might be a fact and only a portion of the work, it feels fair, but if Google’s LLM ingests your website with history of super bowls, facts about the games, and analysis about them and then provides summary or perspective based on that, the use walks into unfair territory. Using a portion of this blog as training data might be fair, but using the entire thing as a part of the dataset is less so.

There are also non-search engine uses for LLMs. The [Kagi Summarizer](https://kagi.com/summarizer/index.html) can take any document and provide you both with a short summary and a chat interface to engage with specific parts of long prose. Apple is looking to augment Siri, which is a phone interface, with an LLM. [Khanmigo](https://blog.khanacademy.org/learner-khanmigo/) can provide critical feedback on written prose. LLMs now power incredibly effective translation tools. Uses like these look a lot more fair than the generic ChatGPT.

I do not think copyright can or should prohibit using widely available publications, copyrighted or not, as training for LLMs, but it certainly can restrict it based on the application of the LLM. A chatbot for a car dealership will never compete with this blog, but Google and Microsoft will. 

