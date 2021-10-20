var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//------------------------------------------------------------
// 增加引用模組
//------------------------------------------------------------
var session = require('express-session');

var journallist = require('./routes/bookshelf_journal');
var pagelist = require('./routes/journal_page');
var member_add_form = require('./routes/member_add_form');
var member_add = require('./routes/member_add');
var user_login_form = require('./routes/user_login_form');
var user_login = require('./routes/user_login');
var user_logout = require('./routes/user_logout');
var user_show = require('./routes/user_show');
var checkAuth = require('./routes/checkAuth');
//------------------------------------------------------------
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//加入newbookshelf
//var newbookshelf = require('./routes/newbookshelf');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'cute', cookie: { maxAge: 60000 }}));
app.use(express.static(path.join(__dirname, 'img')));
app.use('/img', express.static('img'));
app.use('/', indexRouter);
app.use('/users', usersRouter);

//加入newbookshelf
//app.use('/newbookshelf', newbookshelf);
//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
// 設定模組使用方式
//-----------------------------------------
app.use('/bookcase',checkAuth , journallist);
app.use('/myJournals',checkAuth , pagelist);
app.use('/member/add/form', member_add_form);
app.use('/member/add', member_add);
app.use('/user/login/form', user_login_form);
app.use('/user/login', user_login);
app.use('/user/logout', user_logout);
app.use('/user/show',checkAuth , user_show);
//-----------------------------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
