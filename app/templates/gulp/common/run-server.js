var config = require('./config');

var when = require('when');
var fork = require('child_process').fork;
var _ = require('lodash');

var childProcess = null;

function runServer(port) {
  var env = _.extend({}, process.env, config.serverEnvVars);
  if (port !== undefined) {
    _.extend(env, { PORT: port.toString() });
  }
  
  childProcess = fork(config.paths.server + '/index.js', {
    env: env,
    silent: false,
  });

  var childMessaged = when.promise(function (resolve) {
    childProcess.on('message', function (msg) {
      if (msg === 'serverStarted') {
        resolve();
      }
    });
  });

  var childExited = when.promise(function (resolve, reject) {
    childProcess.on('exit', function (code, signal) {
      childProcess = null;
      var reason = (code === null) ? signal : ('exit code ' + code);
      reject(new Error('Server exited prematurely with ' + reason));
    });
  });

  return when.race([
    childMessaged, 
    childExited, 
    when(null).delay(config.serverStartTimeout)
  ]);
}

runServer.close = function() {
  if (childProcess) {
    childProcess.kill();
  }
};

module.exports = runServer;
