---
title: Fine, I am Using Tailwind
layout: post
excerpt_separator: <!--more-->
---
For those unfamiliar with the insider chatter of web development, this post is going to be a boring one. I take no offense if you skip it. For those on the other side, buckle up. I have perspective on criticisms of [Tailwind](https://pdx.su/blog/2023-07-26-tailwind-and-the-death-of-craftsmanship/).

### Why You Should Trust Me
I have been writing websites for small audiences, large audiences, and have used a variety of front end technologies and methodologies including Bootstrap, ZURB Foundation, Material UI, and now Tailwind. I’ve used methodologies like BEM. Sass, SCSS, and related tools have played big roles in the sites I have built. I have worked with sophisticated clients building for audiences of millions, and less sophisticated clients building for hundreds or thousands.

### Why This Matters
Picking an approach to managing styles and CSS will either increase or reduce your pain as you work on a website. We do not pick these frameworks because it looks smart, but because doing so saves ourselves mental work and effort in the future.

### Now We Interrupt for this TED Talk
<div style="max-width:854px"><div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://embed.ted.com/talks/lang/en/malcolm_gladwell_choice_happiness_and_spaghetti_sauce" width="854" height="480" style="position:absolute;left:0;top:0;width:100%;height:100%" frameborder="0" scrolling="no" allowfullscreen></iframe></div></div>

Gladwell reminds us that there may be no correct answer here.

### Why and When Tailwind
The way CSS works, it is primarily useful if you are reusing styles and are good at naming those styles. Given that naming things is one of the tougher challenges in software engineering, I understand why junior developers would prefer a system where they are relived of that burden. Second, stakeholders are often not consistent in how they want things styled. When non-software engineers or non-software designers have input, you can end up with a nearly one to one mapping of style class to HTML element. In these cases the values of Tailwind begins to outshine its drawbacks.

###  This Decision is Low Stakes
Both Tailwind and its alternatives are mature and effective. The systems work, and are about as high stakes as choosing Michelin or Pirelli tires for your automobile. You’re not going to make a horrible decision here. If you and your team are used to using BEM or Bootstrap, keep doing that. Consistency and familiarity may trump any value you get from trying Tailwind.

### Where I Have Landed
I will likely stick with using frameworks like Bootstrap and Foundation for most of my personal sites. If my peers want to use Tailwind on a collaborative project, sure. If they ask for my suggestion, I’ll likely go with something like BEM and regular CSS for projects with a professional software designer, and something like Tailwind for projects where non-software stakeholders have lots of design input.