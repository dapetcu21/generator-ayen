var nodefn = require('when/node');
var path = require('path');
var fs = require('fs.extra');

function makeSymlink(src, dst) {
  src = path.resolve(src);
  dst = path.resolve(dst);

  return nodefn.call(fs.rmrf, dst)
    .catch(function () {})
    .then(function () {
      return nodefn.call(fs.symlink, src, dst);
    });
}

module.exports = makeSymlink;
