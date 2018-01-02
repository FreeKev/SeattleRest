var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
  db.author.findAll().then(function(authors){
    res.render('authors/all', {authors: authors});
  });
});

router.post('/', function(req, res){
  console.log('body is', req.body);
  db.author.create(req.body).then(function(createdAuthor){
    res.redirect('/authors/' + createdAuthor.id);
  }).catch(function(err){
    console.log('catch reached - err was', err);
    res.status(500).send('uh oh :(');
  });
});


router.get('/new', function(req, res){
  res.render('authors/new');
});


router.get('/:id', function(req, res){
  console.log('single author page, id is', req.params.id);
  res.send('single author page up');
});


module.exports = router;
