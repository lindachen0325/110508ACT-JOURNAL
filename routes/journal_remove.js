var express = require('express');
var router = express.Router();

//增加引用函式
const removejou = require('./utility/removejou');

//接收POST請求
router.post('/', function(req, res, next) {
    var jouno = req.body.jouno;   //取得會員編號
   
    removejou.remove(jouno).then(d => {
        if(d>=0){
            res.render('msuccess', {results:d});  //傳至成功頁面     
        }else{
            res.render('mfail');     //導向錯誤頁面
        }
    })    
});

module.exports = router;