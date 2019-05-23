---
layout: post
title: What I Have Learned from Writing Javascript
comments: on
---
Lately at work I have been writing a lot of Javascript. As a consequence I have also been reading lots of Javascript examples and documentation. Javascript is a highly useful language that also happens to not look so great. However it has improved in recent years. The introduction of [arrow functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) has greatly increased the readability of Javascript code, which is often polluted with nested function calls. Along with the introduction of promises, async/await, and string interpolation using backticks, modern Javascript code is now more readable and easier to reason about than ever.

Unfortunately the documentation has not caught up. In looking for examples and explanations I often find code written in the older syntax. Even worse it usually follows its own style guide. The first thing I do with a new example is to reformat it using the AirBnb style via ESLint. A friend turned me on to [`eslint --fix`](https://eslint.org/docs/user-guide/command-line-interface) as a tool to automate this a bit. Then I often have to refactor it to use the newer `let` and `const` style variables over `var`. This usually means thinking about and dealing with scoping issues. Once I have completed these steps I am usually in one of two states: joy or frustration. Reformatting the code usually makes it more comprehensible. If something fails to translate well to my style then I usually have to spend a lot of time figuring out the nuances of that problem.

The most painful disconnect in developing Javascript is it is not quite as universal as it should be. Different browsers support different features and versions of the language. The general solution is to use a tool called [Babel](https://babeljs.io) that converts your new style Javascript into the syntax that works with older browsers. The other solution would be to learn about the feature variations among browsers via the [Mozilla Developer Network](https://developer.mozilla.org/en-US/) and [caniuse.com](https://caniuse.com) documentation.

