---
title: Do Not Fall For This GitHub Codespaces Trap with Ruby
layout: post
---
Last night I was excited to show a group of new people our GitHub Codespace to quickly get them up to speed with our project at Code for Boston. Unfortunately when we went to start it up, our “stateless” Docker environment crashed. Instead of an easy to use IDE we landed in a recovery container and I got to debug why it did not work.

### The Problem Was a Ruby Update
Ruby [recently released version 3.1.3 with security fixes](https://www.ruby-lang.org/en/news/2022/11/24/ruby-3-1-3-released/). Our docker image referenced `mcr.microsoft.com/devcontainers/ruby:3.1-bullseye` which pulls the latest version of the 3.1 Ruby image from Microsoft. Once we started pulling 3.1.3 we needed to update our `Gemfile` and `.ruby-version` files to reflect v3.1.3 instead of v3.1.2. Otherwise we [crashed on a Gemfile Ruby check](https://bundler.io/guides/gemfile_ruby.html#specifying-a-ruby-version).

### Specifying Docker Versions is not a Great Option
The [documentation for the Ruby container](https://github.com/microsoft/vscode-dev-containers/tree/main/containers/ruby#using-this-definition) does not suggest that Microsoft makes the third decimal of version levels specifiable in the variant. You can confirm this by [reviewing the version tags](https://mcr.microsoft.com/v2/vscode/devcontainers/ruby/tags/list). Presumably specifying the semantic version of the Docker image would work, but you have to figure out which one has the right Ruby version and then you do not get other updates. Yuck.

### Make Your Gemfile Optimistic
To fix this: in your Gemfile you can [update the Ruby directive to allow any patch level version](https://bundler.io/guides/gemfile_ruby.html#specifying-a-ruby-version) change with the `~>` operator.

### No Good Solution for .ruby-version
`.ruby-version` wants the patch level specified when using a tool like [asdf](https://asdf-vm.com):

```
ruby -v
No preset version installed for command ruby
Please install a version by running one of the following:

asdf install ruby 3.1

or add one of the following versions in your config file at /Users/mzagaja/.tool-versions
ruby 3.1.2
ruby 3.1.3
```

I believe the container will not crash as long as Gemfile is acceptable. But you do have to make sure you bump `.ruby-version` at some point.

### Docker Remains Rough Around the Edges
Docker was supposed to solve many of the frustrations of managing software versions. In practice it just becomes another dance partner with the other tools I use to do this. From a developer experience standpoint Microsoft should tag and make available minor patch versions of the docker images for Ruby by default. Otherwise you have to be aware of this issue, or I would advise pinning others to the [image version](https://github.com/devcontainers/images/tree/main/src/ruby/history) instead of the Ruby version. 