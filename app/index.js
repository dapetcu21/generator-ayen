'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var when = require('when');
var nodefn = require('when/node');
var callbacks = require('when/callbacks');
var chalk = require('chalk');
var _ = require('lodash');

var exec = require('child_process').exec;
function execute(command){
    return nodefn.call(exec, command);
}

var AyenGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  _promptAndSave: function (prompts, config, cb) {
    _.each(prompts, function(obj) {
      if (config[obj.name] !== undefined) {
        obj.default = config[obj.name];
      }
    });
    this.prompt(prompts, function(results) {
      _.each(results, function(value, key) {
        config[key] = value;
      });
      return cb(results);
    });
  },

  prompting: function () {
    var done = this.async();
    var self = this;
    var config = this._configuration = this.config.getAll();
    var rescaffolding = !_.isEmpty(config);

    // Have Yeoman greet the user.
    this.log(yosay(
      'Hi! I\'m Ayen, a minimal generator that will help you create a full stack, testable, web app with Browserify, Jade, Stylus, Gulp and Bower.'
    ));

    this.log('Scaffolding in ' + chalk.blue(this.destinationRoot()));

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

      return callbacks.call(self._promptAndSave.bind(self, prompts, config));

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

      return callbacks.call(self._promptAndSave.bind(self, prompts, config));

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

      return callbacks.call(self._promptAndSave.bind(self, prompts, config));

    }).then(function (props) {
      self.stagingURL = props.stagingURL;
      self.description = props.description;
      self.keywords = props.keywords.split(/[, ]+/);

      var prompts = [{
        type: 'list',
        name: 'cssPrecompiler',
        choices: [{
          name: 'Stylus',
          value: 'stylus',
        },{
          name: 'SASS',
          value: 'sass',
        },{
          name: 'LESS',
          value: 'less',
        },{
          name: 'Plain CSS',
          value: 'css',
        }],
        message: 'Pick your CSS precompiler:',
        default: 'stylus',
      }];

      return callbacks.call(self._promptAndSave.bind(self, prompts, config));

    }).then(function (props) {
      self.cssPrecompiler = props.cssPrecompiler;

      var prompts = [{
        type: 'checkbox',
        name: 'compilerFeatures',
        choices: [{
          name: 'Jade templates (with templatizer)',
          value: 'templates',
        },{
          name: 'React JSX',
          value: 'react',
        }],
        message: 'Select your compiler features:',
        default: [ 'templates' ],
      }];

      return callbacks.call(self._promptAndSave.bind(self, prompts, config));

    }).then(function (props) {
      self.compilerFeatures = {};
      _.each(props.compilerFeatures, function (x) {
        self.compilerFeatures[x] = true;
      });

      var prompts = [{
        type: 'confirm',
        name: 'useTests',
        message: 'Do you want to be able to test your app (experimental)?',
        default: false,
      }];

      return callbacks.call(self._promptAndSave.bind(self, prompts, config));
    }).then(function (props) {
      self.useTests = props.useTests;

      if (!rescaffolding) {
        return { templateApp: false };
      }

      var prompts = [{
        type: 'confirm',
        name: 'templateApp',
        message: 'Do you wish to rescaffold your app template?',
        default: false,
      }];

      return callbacks.call(self.prompt.bind(self, prompts));
    }).then(function (props) {
      self.templateApp = props.templateApp;

      if (!self.templateApp) {
        return { templateType: config.templateType };
      }

      var choices = [{
        name: 'Simple JS app',
        value: 'bare',
      },{
        name: 'BackboneJS app with a router',
        value: 'backbone',
      },{
        name: 'ReactJS + Flux app with a router',
        value: 'react',
      }];

      var prompts = [{
        type: 'list',
        choices: choices,
        name: 'templateType',
        message: 'Pick your app template:',
        default: 0,
      }];

      return callbacks.call(self._promptAndSave.bind(self, prompts, config));
    }).then(function (props) {
      self.templateType = props.templateType;

    }).then(done);
  },

  _templatePackageJSON: function () {
    var source = '_package.json';
    var destination = 'package.json';

    // Adds to package.json instead of replacing it completely
    var json = JSON.parse(_.template(this.src.read(source), this));
    var oldJson = {};
    try {
      oldJson = this.dest.readJSON(destination);
    } catch (ex) {}

    var oldJsonClone = _.cloneDeep(oldJson);
    var result = _.extend(_.cloneDeep(json), oldJson);

    result.dependencies = _.extend(
        oldJson.dependencies || {}, json.dependencies);
    result.devDependencies = _.extend(
        oldJson.devDependencies || {}, json.devDependencies);
    result.scripts = _.extend(
        oldJson.scripts || {}, json.scripts);

    if (oldJson.version) {
      result.version = oldJson.version;
    }
    if (oldJson.homepage && !/$https:\/\/github.com\//.test(oldJson.homepage)) {
      result.homepage = oldJson.homepage;
    }

    if (!_.isEqual(result, oldJsonClone)) {
      this.dest.write(destination, JSON.stringify(result, null, 2) + '\n');
    }
  },

  _setUpTemplateHelpers: function () {
    var cssExtension = 'css';
    switch (this.cssPrecompiler) {
      case 'stylus':
        cssExtension = 'styl';
        break;
      case 'less':
        cssExtension = 'less';
        break;
      case 'sass':
        cssExtension = 'scss';
        break;
      }
    this.cssExtension = cssExtension;
  },

  writing: {
    app: function () {
      this._setUpTemplateHelpers();

      this.dest.mkdir('client');
      this.template('client/index.jade', 'client/index.jade');

      if (this.templateApp) {
        var jsVariant;
        var hasTemplatizer = this.compilerFeatures.templates;
        switch (this.templateType) {
          case 'react':
            jsVariant = 'react';
            break;
          case 'backbone':
            jsVariant = hasTemplatizer ? 'backbone-templates' : 'backbone';
            break;
          default:
            jsVariant = hasTemplatizer ? 'plain-templates' : 'plain';
            break;
        }

        this.directory('client/js-' + jsVariant + '/js', 'client/js');
        this.directory('client/css-' + this.cssPrecompiler + '/css', 'client/css');
        this.directory('client/assets', 'client/assets');
        if (hasTemplatizer) {
          this.directory('client/templates', 'client/templates');
        }

        this.directory('server', 'server');
        this.directory('tests', 'tests');
      }

      this.directory('gulp', 'gulp');
      this._templatePackageJSON();
      this.template('_bower.json', 'bower.json');
      this.src.copy('_gulpfile.js', 'gulpfile.js');
      this.src.copy('bowerrc', '.bowerrc');
      this.src.copy('postinstall.sh', 'postinstall.sh');

      if (this.useTests) {
        this.dest.delete('gulp/test.js');
      }

      this.config.set(this._configuration);
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
