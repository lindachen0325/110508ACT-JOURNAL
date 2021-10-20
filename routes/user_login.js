var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/user');

//接收POST請求
router.post('/', function(req, res, next) {
    var email = req.body.email;                 //取得帳號
    var password = req.body.password;     //取得密碼
    var memno = req.body.memno; 

    user.login(email, password).then(d => {
        if (d==null){
            req.session.email = null;         
            res.render('user_loginFail');  //傳至登入失敗
        }else{
            req.session.memno = d.memno;
            req.session.email = d.email;
            req.session.username=d.username;
            res.render('user_show', {username:d.username});   //導向使用者
        }  
    })
});

module.exports = router;