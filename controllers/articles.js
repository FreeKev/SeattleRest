var express = require('express');
var async = require('async');
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
  var tags = [];
  if(req.body.tags){
    tags = req.body.tags.split(',');
  }

  db.article.create(req.body).then(function(createdArticle){
    if(tags.length > 0){
      // do tag stuff
      async.forEach(tags, function(t, callback){
        //Add tag to tag table
        db.tag.findOrCreate({
          where: {content: t.trim()}
        }).spread(function(tag, wasCreated){
          if(tag){
            //Adds relationship in join table
            createdArticle.addTag(tag);
          }
          //Calling this function
          callback(null);
        })
      }, function(){
        //Happens when ALL calls are resolved
        res.redirect('/articles/' + createdArticle.id);
      });
    } else {
        res.redirect('/articles/' + createdArticle.id);
    }
  }).catch(function(err){
    console.log('err', err);
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
    include: [db.author, db.comment, db.tag]
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
