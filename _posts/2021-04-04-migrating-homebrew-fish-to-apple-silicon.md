---
layout: post
title: Migrating Homebrew and fish to Apple Silicon
tag: fish shell
---
When Apple released its new computers with the M1 Apple CPU software developers had to update their apps to work with it. In order to make the transition easier the folks at Apple developed the amazing [Rosetta 2](https://support.apple.com/en-us/HT211861) translation layer to let Intel apps run on the M1. Like many early adopters I setup my web development environment entirely in Rosetta 2 to avoid the hiccups associated with using the native versions. A [request to test an update to Nokogiri](https://github.com/sparklemotion/nokogiri/pull/2214) lead me to try migrating my environment from Rosetta 2 to Apple Silicon. It had a few hiccups, but overall was not bad to do. I recommend reading this post **in full** before starting the process because there are some python and homebrew cask specific steps you might need to follow before removing Intel homebrew.

I am a [fish shell](https://fishshell.com) user so my first step was to change my shell back to the MacOS default of zsh with `chsh -s /usr/bin/zsh`. I had to do this because fish was running as an Intel app and as a result all the apps I run in the terminal also would run as Intel. This was advantageous for compatibility but also meant I was not taking full advantage of my new CPU.

The second step is to use your existing homebrew install to create a Brewfile in your home directory with `brew bundle dump`. Next I [uninstalled the Intel version of Homebrew](https://github.com/homebrew/install#uninstall-homebrew):

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
```

As of Homebrew 3.0.0 the default installation on an M1 machine is going to be the Apple Silicon version and will be installed to `/opt/homebrew`. Just follow the usual [install instructions on the home page](https://brew.sh):

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Now that you have reinstalled homebrew you need to reinstall all your homebrew related applications:

```
brew bundle install
```

I found my font and cask related programs did not successfully reinstall. This is because they were left behind by the Intel installation. They will continue to work fine, but eventually you will want to manually uninstall them and then reinstall using the new homebrew so they update automatically. In retrospect it might have been easier to have uninstalled them individually before uninstalling Intel homebrew.

Once this step is complete, you now have an Apple Silicon compatible homebrew installed, and an Apple Silicon version of fish. Add `/opt/homebrew/bin/fish` to `/etc/shells` before running `chsh -s /opt/homebrew/bin/fish` to make fish your default shell. Close out [iTerm2](https://iterm2.com) and re-open it. Now you are running Apple Silicon fish!

As a ruby developer I use [rvm](https://rvm.io) to manage my rubies. To migrate Ruby to Apple Silicon you just need to uninstall rvm with `rvm implode` and then reinstall it with the usual method of `\curl -sSL https://get.rvm.io | bash -s stable`. Finally `rvm install 2.7.2` will compile the latest version of Ruby for Apple Silicon. From there you should be able to run your apps normally. Most gems seem to work, but some need updates for Apple Silicon.

Python is a bit trickier. I use [virtualfish](https://github.com/justinmayer/virtualfish) for managing virtual environments and it caused issues after the migration. You should [uninstall virtualfish](https://virtualfish.readthedocs.io/en/latest/install.html#un-installing) and the hombrew version of pipenv (`brew uninstall pipenv`) before migrating. Once you migrate you can re-install virtualfish and pipenv. From there you should be developing with Python!

Going forward the default mode you run your apps in will be arm64. You will need to prefix shell commands you want to run in Intel mode with `arch -x86_64`. For convenience you might add a Profile in iTerm2 that runs a shell in Intel mode using a command like `arch -x86_64 /bin/zsh`.

What does this all mean? Now your software development should run faster because the code is natively compiled for Apple Silicon. No more waiting for the translation layer to translate. I was blown away at [how fast the test suite for nokogiri ran](https://github.com/sparklemotion/nokogiri/pull/2214#issuecomment-812954091). However you may run into compatibility issues with older applications. They will need to be upgraded or run using the `arch` command above.

#### Other Fish Shell Posts
  <ul>
    {% for post in site.tags['fish shell'] %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
