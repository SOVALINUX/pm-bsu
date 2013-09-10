var express = require('express');
var app = express();
var swig = require('swig');
var http = require('http');
var Dao = require('./db').Dao;

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');
app.use(express.static(__dirname + '/public'));

GLOBAL.dao = new Dao('localhost', 27017);

var catalog = require('./catalog');
app.get('/', catalog.index);
app.get('/index', catalog.index);
app.get('/create', catalog.create);

app.listen(8000);
console.log("Server started!");
