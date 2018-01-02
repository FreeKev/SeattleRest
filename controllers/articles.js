var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
  // res.send('GET ATRICLES IS WORKIN');
  // equivalent to SQL SELECT ->
  db.article.findAll({
    include: [db.author]
  }).then(function(articles){
      res.render('articles/all', {results: articles});
  });
  // res.render('articles/all');  <- moved into finaAll function
});

router.post('/', function(req, res){
  db.article.create(req.body).then(function(createdArticle){
    res.redirect('/articles/' + createdArticle.id);
  }).catch(function(err){
    res.send('uh oh!', err);
  });
});

router.delete('/:id', function(req, res){
  console.log('Delete route. Id = ', req.params.id);
  // res.send('Delete Route Workin');
  db.article.destroy({
    where: { id: req.params.id }
  }).then(function(deleted){
    console.log('delete = ', deleted);
    res.send('successful');
  }).catch(function(err){
    console.log('Error occured', err);
    res.send('fail');
  })
});

router.get('/new', function(req, res){
  // res.render('articles/new');
  db.author.findAll().then(function(authors){
    res.render('articles/new', {authors: authors});
  });
});


router.get('/:id', function(req, res){
  //was findById
  db.article.findOne({
    where: {id: req.params.id},
    include: [db.author]
  }).then(function(article){
      // console.log(article);
      res.render('articles/single', { result: article });
  });
});



//For test data
// db.article.create({
//   title: 'Testing Title',
//   content: 'Lorem ipsum dolor sit amet',
//   author: 'Me'
// });

module.exports = router;
