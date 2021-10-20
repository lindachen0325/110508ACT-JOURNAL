var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/newbookshelf', function(req, res, next) {
  res.render('newbookshelf', { title: 'Express' });
});

router.get('/newnote', function(req, res, next) {
  res.render('newnote', { title: 'newnote' });
});

router.get('/following', function(req, res, next) {
  res.render('following', { title: 'following' });
});

router.get('/follower', function(req, res, next) {
  res.render('follower', { title: 'follower' });
});

router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'profile' });
});

router.get('/profileEdit', function(req, res, next) {
  res.render('profileEdit', { title: 'profileEdit' });
});

router.get('/privateSet', function(req, res, next) {
  res.render('privateSet', { title: 'privateSet' });
});

router.get('/drawingboard', function(req, res, next) {
  res.render('drawingboard', { title: 'drawingboard' });
});

router.get('/draw', function(req, res, next) {
  res.render('draw', { title: 'draw' });
});

module.exports = router;


