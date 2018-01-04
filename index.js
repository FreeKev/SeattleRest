//Require the stuff I need, make any global variables I need
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var moment = require('moment');
var app = express();
// var db = require('./models');

//Set and Use statements to set set up middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));
app.use(function(req, res, next){
  res.locals.moment = moment;
  next();
})

//Include controller
app.use('/articles', require('./controllers/articles'));
app.use('/authors', require('./controllers/authors'));
app.use('/comments', require('./controllers/comments'));
app.use('/tags', require('./controllers/tags'));

//Routes
app.get('/', function(req, res){
  // TO make sure everything's up and running initially
  // res.send('This is working like a charm.');
  res.render('home');
});

//Listen on port
app.listen(3000);
