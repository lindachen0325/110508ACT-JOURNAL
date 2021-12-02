var express = require('express');
var router = express.Router();

//增加引用函式
const profile = require('./utility/profile');

//接收GET請求
router.get('/', function(req, res, next) {
    no=req.session.memno;
    profile.profileEdit(no).then(data => {
        if (data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data==-1){
            res.render('notFound');  //導向找不到頁面                
        }else{
            res.render('profileEdit', {item:data});  //將資料傳給顯示頁面
        }  
    })
});

module.exports = router;
