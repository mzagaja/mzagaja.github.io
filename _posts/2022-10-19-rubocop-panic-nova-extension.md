---
title: Rubocop Panic Nova Extension
layout: post
---
The other day I released [v1.2](https://github.com/mzagaja/Rubocop.novaextension/releases/tag/v1.2) of the Rubocop extension I wrote for my text editor, [Panic Nova](https://nova.app).

### What’s New
You can now specify running rubocop with a `bundle exec` prefix to make sure you’re using the version of Rubocop specified by your application’s Gemfile. This avoids rule conflicts if you update your system Rubocop to a different version.

### Why I Like Panic Nova
When I was looking to transition from Sublime Text to another editor, I tried VSCode. It had an annoying bug where my 4K monitor would flicker when I typed. I discovered Panic Nova which is made by the same folks that created Transmit, a file transfer app I loved. A few highlights:
* Nova is Mac native.
* Lots of extensions are available and they are easy to write.
* Fantastic customer support. They always email me back with helpful information or appreciation for my feedback.
* It is regularly updated. Does not feel like abandonware the way Sublime Text did.

### What’s Next
I’m working to add a feature to auto-format the current file with Rubocop from a menu item.

