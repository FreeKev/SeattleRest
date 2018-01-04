var express = require('express');
var router = express.Router();
var db = require('../models');

router.post('/', function(req, res){
  // Establish connects are working and see data
  // console.log('req.body', req.body);
  // res.send('comments post pourt stub');
  // Get real data ->
  db.comment.create(req.body).then(function(createdComment){
    res.redirect('/articles/' + createdComment.articleId);
  });
});

module.exports = router;
