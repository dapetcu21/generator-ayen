'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var when = require('when');
var nodefn = require('when/node');
var callbacks = require('when/callbacks');

var exec = require('child_process').exec;
function execute(command){
    return nodefn.call(exec, command);
}

var AyenGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();
    var self = this;

    // Have Yeoman greet the user.
    this.log(yosay(
      'Hi! I\'m Ayen, a minimal generator that will help you create a full stack, testable, web app with Browserify, Jade, Stylus, Gulp and Bower.'
    ));


    var gitName, gitMail;

    execute('git config --get user.name').then(function (username) {
      gitName = username.toString().replace(/\n,?$/, '');
    }).catch(function () {
    }).then(function () {
      return execute('git config --get user.email');
    }).then(function (mail) {
      gitMail = mail.toString().replace(/\n,?$/, '');
    }).catch(function () {
    }).then(function () {
      var prompts = [{
        type: 'input',
        name: 'appName',
        message: 'Pick your site\'s title:',
        default: 'My New App',
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Your name (for the author field):',
        default: (gitName === undefined) ? 'John Doe' : gitName,
      },
      {
        type: 'input',
        name: 'authorMail',
        message: 'Your email (for the author field):',
        default: (gitMail === undefined) ? 'john.doe@example.com' : gitMail,
      },
      {
        type: 'input',
        name: 'githubName',
        message: 'Your GitHub account name:',
        default: (gitMail === undefined) ? 'somename' : gitMail.replace(/@.*/, ''),
      }];

      return callbacks.call(self.prompt.bind(self, prompts));

    }).then(function (props) {
      self.appName = props.appName;
      self.author = props.authorName + ' <' + props.authorMail + '>';
      self.githubName = props.githubName;

      var packageName = self.appName.toLowerCase()
        .replace(/^[^a-z-]+/, '')
        .replace(/[^a-z-]+$/, '')
        .replace(/[^a-z-]+/g, '-');

      var prompts = [{
        type: 'input',
        name: 'packageName',
        message: 'GitHub repo name for this app:',
        default: packageName,
      }];

      return callbacks.call(self.prompt.bind(self, prompts));

    }).then(function (props) {
      self.packageName = props.packageName;

      var prompts = [{
        type: 'input',
        name: 'stagingURL',
        message: 'Where will this website be hosted?:',
        default: 'http://' + self.packageName + '.herokuapp.com',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Short description:',
        default: 'This is an awesome website.',
      },
      {
        type: 'input',
        name: 'keywords',
        message: 'Some keywords for SEO:',
        default: 'website, awesome',
      }];

      return callbacks.call(self.prompt.bind(self, prompts));

    }).then(function (props) {
      self.stagingURL = props.stagingURL;
      self.description = props.description;
      self.keywords = props.keywords.split(/[, ]+/);

      done();
    });
  },

  writing: {
    app: function () {
      var context = {
        appName: this.appName,
        author: this.author,
        keywords: this.keywords,
        githubName: this.githubName,
        packageName: this.packageName,
        description: this.description,
        stagingURL: this.stagingURL,
      };

      this.dest.mkdir('frontend');
      this.dest.mkdir('frontend/js');
      this.dest.mkdir('frontend/css');
      this.dest.mkdir('frontend/templates');
      this.dest.mkdir('frontend/templates/includes');

      this.template('frontend/index.jade', 'frontend/index.jade', context);
      this.directory('frontend/js', 'frontend/js');
      this.directory('frontend/css', 'frontend/css');
      this.directory('frontend/assets', 'frontend/assets');
      this.directory('frontend/templates', 'frontend/templates');

      this.directory('backend', 'backend');
      this.directory('gulp', 'gulp');
      this.directory('tests', 'tests');

      this.template('_package.json', 'package.json', context);
      this.template('_bower.json', 'bower.json');
      this.src.copy('_gulpfile.js', 'gulpfile.js');
      this.src.copy('bowerrc', '.bowerrc');
      this.src.copy('postinstall.sh', 'postinstall.sh');
    },

    projectfiles: function () {
      this.src.copy('gitignore', '.gitignore');
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('Procfile', 'Procfile');
    }
  },

  install: function () {
    this.npmInstall();
  }
});

module.exports = AyenGenerator;
