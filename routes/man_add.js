var express = require('express');
var router = express.Router();

//增加引用函式
const manadd = require('./utility/manadd');

//接收POST請求
router.post('/', function(req, res, next) {
    var manname = req.body.manname;
    var password = req.body.password;
    var email = req.body.email;
    var phonenum = req.body.phonenum;            
    
    // 建立一個新資料物件
    var newData={
        manname:manname,
        password:password,
        email:email,
        phonenum:phonenum,
    } 
    
    manadd.add(newData).then(d => {
        if (d==0){
            res.render('success');  //傳至成功頁面
        }else{
            res.render('fail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;

