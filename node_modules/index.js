var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sign_up', function(req, res, next) {
  res.render('sign_up', { title: 'Express' });
});

router.get('/sign_in', function(req, res, next) {
  res.render('sign_in', { title: 'Express' });
});

router.get('/myJournals', function(req, res, next) {
  res.render('myJournals', { title: 'myJournals' });
});

router.get('/sign_out', function(req, res, next) {
  res.render('sign_out', { title: 'Express' });
});

router.get('/bookcase', function(req, res, next) {
  res.render('bookcase', { title: 'Express' });
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

router.get('/journals', function(req, res, next) {
  res.render('journals', { title: 'journals' });
});

router.get('/templets', function(req, res, next) {
  res.render('templets', { title: 'templets' });
});

router.get('/material', function(req, res, next) {
  res.render('material', { title: 'material' });
});

module.exports = router;


