# generator-ayen [![Build Status](https://secure.travis-ci.org/dapetcu21/generator-ayen.png?branch=master)](https://travis-ci.org/dapetcu21/generator-ayen)

> [Yeoman](http://yeoman.io) generator with *A*nything *Y*ou'll *E*ver *N*eed to write a single-page app. Features live-reloading development workflow, Browserify, Bower integration, Jade templates, Stylus and testing tools.

## Getting Started

### Install Yeoman

Yeoman is a project scaffolding tool. You install it from npm by running:

```bash
npm install -g yo
```

### Installing Ayen

To install generator-ayen from npm, run:

```bash
npm install -g generator-anyen
```

### Installing Gulp

Ayen projects need [Gulp](http://gulpjs.com/) to work. You know the drill:

```bash 
npm install -g gulp
```

### Creating a project

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

### Using your new project

Usually, what you'll want to do is run `gulp watch` in a separate window, then forget about it and hack away at the project with your favorite text editor. Every time you save a file, ayen's internal hamsters will sniff you out and reload the browser window for you, so you can see what you're modifying on a quick glance. We use [Browsersync](http://www.browsersync.io/) for this, in case you're wondering. (*Known bug:* `gulp watch` will quit on syntax errors and you'll have to run it again. 

If you want to get a super-quick development build, run `gulp build`, then gloat over your brain-child in the `www` folder. (*WARNING:* contains symlinks)

If you want to get an optimized, production-ready build, then `gulp build:dist` is for you. Be sure to run `gulp clean` first if the `www` folder is not empty.

If you want to use the same live-reloading process as `gulp watch`, but for the test suite (TDD), run `gulp test:watch`.

If you just want to run the tests once, run `gulp test`.

To check your site automatically against [Google's Pagespeed](https://developers.google.com/speed/pagespeed/insights/), just run `gulp pagespeed`.

*WARNING:* Anything related to testing is currently broken. Check back later.

### Developing your new project

TODO

## License

MPLv2
