---
title: A Surprisingly Accessible Description of Just in Time Compilers
layout: post
---
[Noah Gibbs writing for the Shopify Engineering Blog](https://shopify.engineering/when-jit-faster-than-compiler):
> A JIT, aka a Just-In-Time compiler, is a partial compiler. A JIT waits until you run the program and then translates the most-used parts of your program into fast native machine code. This happens every time you run your program. It doesn’t write the code to a file—okay, except MJIT and a few others. But JIT compilation is primarily a way to speed up an interpreter—you keep the source code on your computer, and the interpreter has a JIT built into it. And then long-running programs go faster.

A lot of times I find articles about compilers and programming languages to be a bit too dense to understand. However, if you are a software engineer, especially one that codes in Ruby, Noah Gibb’s does a masterful job of describing this concept in plain language.