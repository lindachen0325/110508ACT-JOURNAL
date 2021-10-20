var express = require('express');
var router = express.Router();

//增加引用函式
const member = require('./utility/member');

//接收POST請求
router.post('/', function(req, res, next) {
    var password = req.body.password;
    var email = req.body.email;
    var birthday = req.body.birthday;
    var username = req.body.username;            
    var privateset=req.body.privateset;
    
    // 建立一個新資料物件
    var newData={
        password:password,
        email:email,
        birthday:birthday,
        username:username,
        privateset:privateset
    } 
    
    member.add(newData).then(d => {
        if (d==0){
            res.render('addSuccess');  //傳至成功頁面
        }else{
            res.render('addFail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;

