# frozen_string_literal: true

source 'https://rubygems.org'

ruby '3.0.0'

gem 'rails', '~> 6.1.4'

# database
gem 'sqlite3', '~> 1.4'

# Application server
gem 'puma', '~> 5.0'

# friends of Rails
gem 'sass-rails', '>= 6'

gem 'webpacker', '~> 5.0'

# JSON
gem 'jbuilder', '~> 2.7'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.4', require: false

# allows to get hash of the password in a secure manner
gem 'bcrypt', '~> 3.1.13'

# bring React to our Ruby on Rails application
gem 'react-rails'

gem 'rexml', '~> 3.2', '>= 3.2.4'


group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code
  gem 'web-console', '>= 4.1.0'

  gem 'rack-mini-profiler', '~> 2.0'

  # Reenable after https://github.com/rails/rails/issues/26158 is fixed
  gem 'listen', '~> 3.3'

  # Spring speeds up development by keeping your application running in the background
  gem 'spring'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver'
  # Easy installation and use of web drivers to run system tests with browsers
  gem 'webdrivers'
  # Complete suite of testing facilities
  gem 'minitest', '~> 5.8', '>= 5.8.4'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
