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

router.get('/drawingboard', function(req, res, next) {
  res.render('drawingboard', { title: 'drawingboard' });
});

router.get('/draw', function(req, res, next) {
  res.render('draw', { title: 'draw' });
});

router.get('/', function(req, res, next) {
  res.render('man_login_form', { title: 'Express' });
});

router.get('/man_login_form', function(req, res, next) {
  res.render('man_login_form', { title: 'man_login_form' });
});

router.get('/success', function(req, res, next) {
  res.render('success', { title: 'success' });
});

router.get('/fail', function(req, res, next) {
  res.render('fail', { title: 'fail' });
});

router.get('/material/add/form', function(req, res, next) {
  res.render('material_add_form', { title: 'material_add_form' });
});

router.get('/mindex', function(req, res, next) {
  res.render('mindex', { title: 'mindex' });
});


module.exports = router;


