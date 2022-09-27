---
title: Make the terminal better with fish shell plug-ins
layout: post
tag: fish shell
---
Yesterday I discovered two helpful plug-ins for fish shell:
* [fzf](https://github.com/PatrickF1/fzf.fish) is an enhanced fuzzy search tool
* [tide](https://github.com/IlanCosman/tide) is a more useful terminal prompt you can customize.

### Why customize your terminal?
The user experience of existing terminal applications requires lots of looking up commands or discovering information. **fzf** reduces the work required to find file paths and other information when you are typing terminal commands. **tide** makes sure the status of your terminal environment is visible to you, reducing confusion and errors in your work.

### fish shell? I use bash/zsh
[fish shell](https://fishshell.com) includes a lot of the features that you can install with zsh by default. It also has great documentation and is easier to use. 

### Go Deeper
  <ul>
    {% for post in site.tags['fish shell'] %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>