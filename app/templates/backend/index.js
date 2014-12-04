#!/usr/bin/env node

var express = require('express');
var app = express();

// Whatever you do, make sure you adjust your port according to process.env.PORT
// Ayen requires this for BrowserSync proxying and Critical CSS
var port = parseInt(process.env.PORT, 10) || 80;

app.use(express.static(__dirname + '/../www'));

app.get('/api/example_endpoint', function (req, res) {
  res.status(200);
  res.send('{ "hello": "world" }');
  res.end();
});

if (app.get('env') === 'development') {
  app.use(require('errorhandler')());
}

app.listen(port);
console.log('Server running at http://localhost:' + port);

// Ayen needs to wait for your server to start before firing up BrowserSync. 
// This line gives it the cue, but the wait times out after 4 seconds if the
// cue doesn't show up and BrowserSync is fired up anyway.
process.send('serverStarted');
