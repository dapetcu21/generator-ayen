# generator-ayen [![Build Status](https://secure.travis-ci.org/dapetcu21/generator-ayen.png?branch=master)](https://travis-ci.org/dapetcu21/generator-ayen)

> [Yeoman](http://yeoman.io) generator with <b>A</b>nything <b>Y</b>ou'll <b>E</b>ver <b>N</b>eed to write a single-page app. Features live-reloading development workflow, Browserify, Bower integration, Jade templates, a CSS preprocessor and testing tools.

**WARNING:** This generator is still in flux. Expect breaking changes.

## Features:

* Choose between [Stylus](http://learnboost.github.io/stylus/), [SASS](http://sass-lang.com/), [LESS](http://lesscss.org/) or just plain CSS
* Start with a bare JS app template, with a [Backbone](http://backbonejs.org/) app or with a [React](http://facebook.github.io/react/) + [Flux](https://facebook.github.io/flux/) scaffold.
* Write modular code with [Browserify](http://browserify.org/)
* Compile your HTML templates with [Jade](http://jade-lang.com/) and [templatizer](https://github.com/HenrikJoreteg/templatizer)
* Manage your dependencies with [npm](https://www.npmjs.org/) and [Bower](http://bower.io/)
* Watch and automatically reload your project when the sources change with [Browsersync](http://www.browsersync.io/)
* Write a custom server for your app for advanced functionality
* Develop easier with source maps
* Produce a [minified](https://github.com/mishoo/UglifyJS2), production ready build with [autoprefixed](https://github.com/postcss/autoprefixer-core) styles and [critical path CSS](https://github.com/pocketjoso/penthouse)

## Installation

### Install Yeoman

Yeoman is a project scaffolding tool. You install it from npm by running:

```bash
npm install -g yo
```

### Installing Ayen

To install generator-ayen from npm, run:

```bash
npm install -g generator-ayen
```

### Installing Gulp

Ayen projects need [Gulp](http://gulpjs.com/) to work. You know the drill:

```bash 
npm install -g gulp
```

## Creating a project

Pick a good spot on your hard drive for your project and cd to it:

```bash
mkdir my-new-app
cd my-new-app
```

Initiate the generator:

```bash
yo ayen
```

Now just answer all the questions truthfully and you're done.

*P.S.:* Did you know you can run `yo ayen` again even after you've already scaffolded an app? Yeoman will help you resolve conflicting files, so don't worry about losing your work if you re-scaffold.

Ayen knows to play nice with your project even after you've done some work, so don't hesitate to upgrade your build environment whenever a new version of ayen is out.

## Using your new project

### Watching

Start the watcher:

```bash
gulp watch
```

A browser window will pop out. It will reload whenever you make a change to a file.

At this point, you can start hacking away with your favorite text editor.

You will find browser-side code in `./client` and server-side code in `./server`.

### Building

```bash
gulp build:dist
```

This builds for production and outputs the results in `./public`.


```bash
gulp build
```

This builds a minimal development build in `./public`. It contains symlinks, so you may not want to move it around.

### Testing (Work in Progress)

```build
gulp test
```

This runs the tests once

```build
gulp test:watch
```

This runs the in continuous live-reload mode (just like `gulp watch`).

```build
gulp pagespeed
```

Checks your site automatically against [Google's Pagepeed](https://developers.google.com/speed/pagespeed/insights/).

## Known issues

* Live reload breaks on each error
* Tests are not implemented yet
* Sometimes, the server process remains orphaned in the background after gulp quits

## License

MPLv2
