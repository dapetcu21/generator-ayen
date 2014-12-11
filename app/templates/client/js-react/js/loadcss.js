module.exports = function (path) {
  var cb = function () {
    var h = document.getElementsByTagName('head')[0];
    var links = h.getElementsByTagName('link');

    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = path;

    for (var i = 0, n = links.length; i < n; i++) {
      if (links[i].rel === l.rel && links[i].href === l.href) {
        return;
      }
    }

    l.media = 'only x';
    h.appendChild(l);
    setTimeout(function () {
      l.media = 'all';
    }, 0);
  };
  var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  if (raf) {
    raf(cb);
  } else {
    window.addEventListener('load', cb);
  }
};
