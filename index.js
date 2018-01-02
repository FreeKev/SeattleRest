//Require the stuff I need, make any global variables I need
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

//Set and Use statements to set set up middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));

//Include controller
app.use('/articles', require('./controllers/articles'));

//Routes
app.get('/', function(req, res){
  // TO make sure everything's up and running initially
  // res.send('This is working like a charm.');
  res.render('home');
});

//Listen on port
app.listen(3000);
