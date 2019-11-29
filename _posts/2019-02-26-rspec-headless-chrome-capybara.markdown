---
layout: post
title: RSpec, Capybara and Headless Chrome
comments: on
---
I spent yesterday getting headless Chrome working with RSpec and Capybara on one our projects at MAPC. The reason for doing this is many of our website visitors use the chrome browser, and the new headless version of Chrome allows us to run an automated test suite on our application that uses it in a way our users do. Writing these automated tests that focus on features, called system tests in Rails, can increase our confidence that we are not breaking our application with new code.

The first step to testing with headless chrome is installing the appropriate gems. You will need to install the following in order to make headless chrome work well with your Ruby on Rails application:

```
gem "puma"
group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 2.15', '< 4.0'
  gem 'selenium-webdriver'
  gem 'capybara-screenshot'
end
```

You will need to replace unicorn with puma in your local environment if you want screenshots to work well. The capybara-screenshot gem is one I use to automatically take screenshots of failing tests. On macOS you will also need to install chromedriver using homebrew. I added this simple script to my `bin/setup` to automatically do this for developers that run setup on a macOS machine:

```
if RUBY_PLATFORM =~ /darwin/
  unless system('brew cask ls --versions chromedriver')
	system('brew cask install chromedriver')
  end
else
  puts 'You will need to install Chromedriver before using the automated test suite.'
end
```

I then proceeded to update my RSpec configuration first by including the following line in `spec/rails_helper.rb`:

`require 'support/chromedriver'`

Then `spec/spec_helper.rb` should include:

`require 'capybara/rspec'`

The difference between spec_helper.rb and rails_helper.rb is that spec_helper.rb is for requirements that involve testing anything, and rails_helper.rb are for requirements and configuration that are specific to tests that interact with Ruby on Rails.

Finally just add `spec/support/chromedriver.rb`

```
require 'selenium/webdriver'
require 'capybara-screenshot/rspec'
Capybara.javascript_driver = :selenium_chrome_headless

Capybara::Screenshot.register_driver(:selenium_chrome_headless) do |driver, path|
  driver.browser.save_screenshot(path)
end
```

At this point you should be ready to run RSpec system tests with Capybara. One gotcha with system tests (as opposed to typical RSpec feature tests) is they override the default Capybara driver. While this is documented in some places, this drove me bonkers. Eventually I fixed this by adding:

```
RSpec.configure do |config|
	config.before(:each, type: :system) do
		driven_by(:rack_test)
	end

	config.before(:each, type: :system, js: true) do
		driven_by(:selenium_chrome_headless)
	end
end
```

to my `spec/rails_helper.rb` file. As long as I do not use the Capybara keywords for feature tests, and mark my tests appropriately as system tests, they will now run using rack_test (for non-Javascript tests) and headless Chrome for javascript tests denoted with `js: true`.

Credit where credit is due, much of the original instruction I got was from [this post on Thoughtbot’s blog](https://thoughtbot.com/blog/headless-feature-specs-with-chrome). I also got help from and recommend Myron Marston's [Effective Testing with RSpec 3](https://amzn.to/35WGo6v).
