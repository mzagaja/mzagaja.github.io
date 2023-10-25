---
title: Use Selenium with Docker and RSpec
layout: post
---
This is a technical post, meant to share knowledge from my adventures on a work project yesterday. The combination of using an [official Docker selenium Chrome image](https://hub.docker.com/r/selenium/standalone-chrome) and [Rails system tests](https://guides.rubyonrails.org/testing.html#changing-the-default-settings) is not well documented if you use RSpec. My contribution is below the fold.

### Why Do This
If you run a complex application then orchestrating its components with Docker and Docker Compose can simplify development. Instead of having to configure a bunch of local services, you can drop a `.env` file in your app repo and then try `docker compose up`. If you then also deploy with Docker, you eliminate the issue of differences between your development and production environments when you need to debug something.

### How to Configure Docker
Just add something like the following to your `docker-compose.yml`:

```
  selenium:
    image: selenium/standalone-chrome:latest
    container_name: consus_lite_selenium
    ports:
      - 4444:4444
    networks:
      - consusnet
```

Make sure the network uses the same container as your Rails application.

### Your Gemfile
Make sure to include:
```
gem 'selenium-webdriver
```

in your test group.

### How to Configure RSPec
In `spec/spec_helper.rb`:
```
require 'capybara/rspec'
# Configurtion for Capybara System Tests in Docker Remote
Capybara.server_host = "0.0.0.0"
Capybara.app_host = "http://#{IPSocket.getaddress(Socket.gethostname)}"
```

Then for your tests that require Selenium (put in a `before` block or update Capybara’s default configuration):

```
driven_by(:selenium, using: :headless_chrome, options: { browser: :remote, url: 'http://selenium:4444' })
WebMock.disable_net_connect!(allow_localhost: true, allow: 'selenium')
```

In the above block you can interchange `:headless_chrome` with your selenium browser of choice, provided you are using the corresponding image. Using `:chrome` instead of `:headless_chrome` will let you look at the browser execution in the container’s web interface. You will need to replace `selenium` in the `url` and `allow` keyword arguments to use the name of the container you used in `docker-compose.yml`. You can  skip the `Webmock` statement if you do not use WebMock.

### Be Smart: Do Not Be Tricked by ChatGPT
When I asked ChatGPT how to do this it told me to try:
```
driven_by :selenium, using: :remote, url: 'http://remote-server-ip:4444/wd/hub', desired_capabilities: :chrome
```

The above throws a somewhat challenging to debug error. The above approach is potentially influenced by the [Official Selenium Documentation](https://www.selenium.dev/documentation/webdriver/drivers/remote_webdriver/). However, you’ll note there is a difference between the Selenium gem being called directly and calling it through Rails.

As I have been experimenting with ChatGPT to accelerate my development work, I have found it to be a net negative.