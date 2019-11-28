---
layout: post
title: Sixteen Ways to Speed Up Your Software Development Workflow
comments: on
---
While many boot camps and guides focus on teaching you how to build a web application, one of the challenges of software development is time. You only have so many hours in the day and want to hit that deadline. After doing web development for several years I have adopted sixteen proven ways to speed up my workflow.

## Learn Keyboard Shortcuts
While graphical interfaces are helpful for feature discovery and centering where you are in your current workspace, they also create friction in executing the commands you need to get your work done. Moving a mouse and clicking through a couple of layers of menus can take more time than simply using a couple of keys you have memorized on your keyboard. However, the problem with keyboard shortcuts is there are a lot of them. The best approach to keyboard shortcuts is to identify the tasks you do most often and look up the keyboard shortcuts for them. Write them down. Then pick one and force yourself to use it every time you use that command, even if you were going to use the graphical interface. The goal is to build the muscle memory for that keyboard shortcut so when you go to do that task, using the keyboard shortcut is automatic. After a week or two you will not need to look up the shortcut and you can move on to learning a new one. Over time your speed of using your computer will increase as you more quickly execute repetitive tasks.

## Use Linters and Auto Formatting
Instead of trying to remember how to format your code, you should be using a linter. A linter analyzes your code for formatting and style issues and within your text editor will tell you what is wrong, suggest fixes, and in some cases fix issues automatically. Each programming language has its linter with its configuration options and preferences. Learning these can take an hour or two, but they pay back that time by making your code consistent and easier to read.

## Dash App
One of the most frequent tasks I engage in is looking up documentation for languages and libraries. Kapeli’s Dash App makes this fast and easy on macOS. Once installed you can hit CTRL+D then start typing to search for documentation around classes, methods, and other components of your favorite library or programming language. As you become more familiar with documentation, this becomes even faster.

## TLDR
The [TLDR document set](https://github.com/tldr-pages/tldr) can be downloaded into Dash and cuts through the cruft of official documentation. It provides practical examples of how a tool is used by real people.

## Text expansion in sublime text
Mastering your text editor can include creating snippets to reduce the amount of code you need to type. You can [build snippets](http://docs.sublimetext.info/en/latest/extensibility/snippets.html) in Sublime Text and/or install snippets created by others. Many developers use [Emmet](https://emmet.io) to speed up their HTML and CSS workflow. Learning snippets can take work at first, but once you master them you will spend less time typing.

## Multi-cursor Select
Many text editors support multi-cursor select. In [Sublime Text](https://www.sublimetext.com/docs/3/multiple_selection_with_the_keyboard.html) you can highlight a phrase and hit CMD+D and it will enter multi-select mode highlighting the next text string that is the same. Then you can edit all those strings at once.

## Fish Shell and bash history
If you use the command line one of the most frequent tasks you have will be invoking a command you used in the past. In the bash shell that most servers use as their default, you can hit Command+R and start typing to search your history. However, if you want to try something that will supercharge your history searching try the [fish shell](https://fishshell.com). It will autocomplete your commands from your history and files in the current working directory as you type new commands.

## iTerm Storing AWS Server connections with tmux
On macOS I use iTerm as my terminal of choice. One of the neat features of iTerm is its support for profiles and [tmux](https://thoughtbot.com/blog/a-tmux-crash-course). With profiles, you can construct a list of servers with relevant usernames and commands to connect to them. This makes them easily accessible by hitting Command+O. With [tmux integration](https://www.iterm2.com/documentation-tmux-integration.html) you can have a shell on the server that you connect to and persists even after you disconnect. This means if you need to invoke a long-running task in a shell you can disconnect from the server, go home, and reconnect and view it when you get back.

## Ripgrep to search your server
At some point, you will need to find a file with a specific word or phrase on your server. This file might be in a regular text file or might be in a compressed file. If you have ventured into `/var/log` on your server you know this feeling. The answer to this challenge is [ripgrep](https://github.com/BurntSushi/ripgrep). With a single command, you can quickly engage in a recursive search for a text string. No longer will you need to open individual log files.

## Tower for GitHub
Git and GitHub can be complicated. Graphical user interfaces can take complex ideas and translate them into something simpler. [Tower](https://www.git-tower.com) is the best at doing this for GitHub. It makes it easy to see and discover the git related properties of your repo and use the features in git you might forget about. They even have [free learning resources](https://www.git-tower.com/learn/) to help you use git better.

## Kaleidoscope for Diffing
Diffing files that have merge conflicts can be annoying. [Kaleidoscope](https://www.kaleidoscopeapp.com) makes this less annoying.

## TablePlus for Databases
When it comes to using databases sometimes a command-line tool like `psql` is enough. However, if you use lots of databases and want to make it easier to remember what you did and explore these databases, a tool like [TablePlus](https://tableplus.com) will make it simpler. Bookmarks will put all your databases within arms reach. Your SQL statements can quickly be formatted and exported and you can get a good overview of your database as you do your work with this tool.

## .railsrc and rails template
If you write enough web applications in Ruby on Rails you might have ideas and preferences that differ from the default options. Instead of having to recall and re-type all these preferences every time, you can create a [rails template](https://guides.rubyonrails.org/rails_application_templates.html) and set up your [.railsrc](https://www.natashatherobot.com/how-to-configure-your-rails-defaults/) file so typing `rails new` will create a Rails application with the settings you usually use. Other frameworks and languages might follow a similar convention where you can place your preferences in a dot file to make using them quicker.

## Delete entire words with “option”
On macOS computers you can hold the “Option” key and then hit delete or a keyboard navigation key to delete an entire word or move your cursor a full word instead of just a single character.

## Go to a specific place in the terminal with “Option + Click”
On macOS computers you can Option + click a spot in your terminal to move your cursor to it. No longer do you need to go back character by character.

## Ngrok
Sometimes the process of deploying a prototype or getting feedback on a change is laborious and not worth it if you are experimenting. [Ngrok](https://ngrok.com) allows you to expose your local development webserver to the public Internet. The app gets its public URL you can share with colleagues. This is also helpful for testing webhooks and features that require secure connections in the browser.
