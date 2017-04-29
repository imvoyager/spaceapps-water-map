var express = require('express');
var gmaps = require('google-maps');

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)
