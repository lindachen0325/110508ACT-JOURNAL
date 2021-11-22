var express = require('express');
var router = express.Router();

//增加引用函式
const manlog = require('./utility/manlog');

//接收POST請求
router.get('/', function(req, res, next) {
    req.session.email = null;
    req.session.password = null;           
    res.render('man_logout', {name:'已登出'});  //傳至登出    
});

module.exports = router;