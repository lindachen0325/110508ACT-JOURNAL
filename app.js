var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//------------------------------------------------------------
// 增加引用模組
//------------------------------------------------------------
var session = require('express-session');

var bookshelf_update_name = require('./routes/bookshelf_update_name');
var bookshelf_update_form = require('./routes/bookshelf_update_form');
var bookshelf_update = require('./routes/bookshelf_update');
var journal_add_form = require('./routes/journal_add_form');
var journal_add = require('./routes/journal_add');
var bookshelf_remo_form = require('./routes/bookshelf_remo_form');
var bookshelf_remo = require('./routes/bookshelf_remo');
var bookshelf_add_form = require('./routes/bookshelf_add_form');
var bookshelf_add = require('./routes/bookshelf_add');
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
var myprofile = require('./routes/myprofile');
var profileEdit = require('./routes/profileEdit');
var following = require('./routes/following');
var follower = require('./routes/follower');
//加入newbookshelf
//var newbookshelf = require('./routes/newbookshelf');
//-----back---------------------------------------------
var man_login_form = require('./routes/man_login_form');
var man_login = require('./routes/man_login');
var man_logout = require('./routes/man_logout');
var index_success = require('./routes/index_success');
var man_add_form = require('./routes/man_add_form');
var man_add = require('./routes/man_add');
var manager_remove_form = require('./routes/manager_remove_form');
var manager_remove= require('./routes/manager_remove');
var member_query_form = require('./routes/member_query_form');
var member_query = require('./routes/member_query');
var member_remove_form = require('./routes/member_remove_form');
var member_remove = require('./routes/member_remove');
var journal_query_form = require('./routes/journal_query_form');
var journal_query = require('./routes/journal_query');
var journal_remove_form = require('./routes/journal_remove_form');
var journal_remove = require('./routes/journal_remove');
var material_add_form = require('./routes/material_add_form');
var material_add = require('./routes/material_add');
var material_query_form = require('./routes/material_query_form');
var material_query = require('./routes/material_query');
var material_remove_form = require('./routes/material_remove_form');
var material_remove= require('./routes/material_remove');
var bookshelf_query_form = require('./routes/bookshelf_query_form');
var bookshelf_query = require('./routes/bookshelf_query');
var bookshelf_remove_form = require('./routes/bookshelf_remove_form');
var bookshelf_remove = require('./routes/bookshelf_remove');
//--------------------------------------------------
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//----------------------------------------
// 可由外部直接取用資料夾
//----------------------------------------
app.use(express.static('public/photo'));
app.use(express.static('public/picture'));
//-----------------------------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));  //to use style.css
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
app.use('/bookshelf/update/name',checkAuth , bookshelf_update_name);
app.use('/bookshelf/update/form',checkAuth , bookshelf_update_form);
app.use('/bookshelf/update',checkAuth , bookshelf_update);
app.use('/journal/add/form',checkAuth , journal_add_form);
app.use('/journal/add',checkAuth , journal_add);
app.use('/bookshelf/remo/form',checkAuth , bookshelf_remo_form);
app.use('/bookshelf/remo',checkAuth , bookshelf_remo);
app.use('/bookshelf/add/form',checkAuth , bookshelf_add_form);
app.use('/bookshelf/add',checkAuth , bookshelf_add);
app.use('/bookcase',checkAuth , journallist);
app.use('/myJournals',checkAuth , pagelist);
app.use('/member/add/form', member_add_form);
app.use('/member/add', member_add);
app.use('/user/login/form', user_login_form);
app.use('/user/login', user_login);
app.use('/user/logout', user_logout);
app.use('/user/show',checkAuth , user_show);
app.use('/myprofile',checkAuth, myprofile);
app.use('/profileEdit',checkAuth, profileEdit);
app.use('/following',checkAuth, following);
app.use('/follower',checkAuth, follower);
//----back-------------------------------------
app.use('/man/login/form', man_login_form);
app.use('/man/login', man_login);
app.use('/man/logout', man_logout);
app.use('/index/success', index_success);
app.use('/man/add/form', man_add_form);
app.use('/man/add', man_add);
app.use('/manager/remove/form', manager_remove_form);
app.use('/manager/remove', manager_remove);
app.use('/member/query/form', member_query_form);
app.use('/member/query', member_query);
app.use('/member/remove/form', member_remove_form);
app.use('/member/remove', member_remove);
app.use('/journal/query/form', journal_query_form);
app.use('/journal/query',journal_query);
app.use('/journal/remove/form', journal_remove_form);
app.use('/journal/remove', journal_remove);
app.use('/material/add/form', material_add_form);
app.use('/material/add', material_add);
app.use('/material/query/form', material_query_form);
app.use('/material/query',material_query);
app.use('/material/remove/form', material_remove_form);
app.use('/material/remove', material_remove);
app.use('/bookshelf/query/form', bookshelf_query_form);
app.use('/bookshelf/query', bookshelf_query);
app.use('/bookshelf/remove/form', bookshelf_remove_form);
app.use('/bookshelf/remove', bookshelf_remove);
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
