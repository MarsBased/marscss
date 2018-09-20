# marscss

Framework for professional front-end for faster and easier web development.

=======

## Running documentation

1. Run `bundle install` to install Ruby and middleman dependencies
2. Run `yarn install` to install Node.js dependencies.
3. Run `bundle exec middleman server` to up middleman server
4. Open http://localhost:4567/documentation in you browser

## Create the tests

1. Run `ruby scripts/tests-type-of.rb`
2. Add `@include tests()` in your scss file after marscss importer

## Create the shapes

This script is responsible for compressing the different svg that are in the shapes folder and passing them to the partial that we added in the general layout

Run `yarn svg`
