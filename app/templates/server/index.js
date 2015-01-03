#!/usr/bin/env node

var express = require('express');
var path = require('path');
var app = express();

// Whatever you do, make sure you adjust your port according to process.env.PORT
// Ayen requires this for BrowserSync proxying and Critical CSS
var port = parseInt(process.env.PORT, 10) || 4000;
var publicDir = path.resolve(__dirname , '..', 'public');

app.use(express.static(publicDir));

app.get('/api/example_endpoint', function (req, res) {
  res.status(200);
  res.send('{ "hello": "world" }');
  res.end();
});
<% if (templateType === 'react' ||
       templateType === 'backbone' ) { %>
// For push state to work
app.get('*', function (req, res) {
  res.sendFile(path.join(publicDir, 'index.html'));
});
<% } %>
if (app.get('env') === 'development') {
  app.use(require('errorhandler')());
}

app.listen(port, function () {
  console.log('Server running at http://localhost:' + port);

  // Ayen needs to wait for your server to start before firing up BrowserSync. 
  // This line gives it the cue, but the wait times out after 4 seconds if the
  // cue doesn't show up and BrowserSync is fired up anyway.
  if (process.send) { process.send('serverStarted'); }
});
