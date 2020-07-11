---
layout: post
title: Javascript Tips and Traps
---
I have been spending a lot of time learning modern Javascript over the past month or two. From this there are a few key tools and tips I have picked up:

1. The [`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) and [`map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) functions are the main tools you end up using to manipulate arrays and hashes.
2. You can avoid lots of scoping problems by using [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions). However you cannot always drop arrow functions into non-arrow function examples. A lot of it has to do with understanding the use of [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) for scoping. Many times if something is not working as expected, sit back and evaluate your scope.
3. The `debugger;` command can drop you into your console at any point in your code. It is the Javascript equivalent of `binding.pry`.
4. If you want to make it easier to debug your code in the Javascript console make sure you are generating a source map with your code. Some frameworks give this to you by default. Some frameworks require you to specify this in your configuration file.
5. In Sublime Text using full project search can give you lots of noise when globally searching a Javascript project that compiles to minified code. Make sure to ignore your compiled source directory when configuring your project file or you can globally ignore directory names if you use the same names consistently.
6. If you need to grab a JSON representation of an object `JSON.stringify(emberModelObject);` can be your friend, at least in Ember.
