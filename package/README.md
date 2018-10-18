[![npm version](https://badge.fury.io/js/%40marsbased%2Fmarscss.svg)](https://badge.fury.io/js/%40marsbased%2Fmarscss)

# marscss

[Marscss](https://marscss.com). Front-end CSS framework for faster and easier web development.

=======

## How to use?

Install the dependency

```shell
npm i @marsbased/marscss --save
```

Use it from your main scss file:

```scss
@import 'node_modules/@marsbased/marscss/index';
```

Alternatively, if you are using a bundler you probably can use a shortcut like:

```scss
@import '~@marsbased/marscss/index';
```

## Documentation

Visit [Marscss](http://marscss.com/documentation/) documentation, powered by marsman [Marsman](https://github.com/MarsBased/marsman).

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
