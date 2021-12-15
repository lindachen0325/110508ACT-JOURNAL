var express = require('express');
var router = express.Router();

//增加引用函式
const removemem = require('./utility/removemem');

//接收POST請求
router.post('/', function(req, res, next) {
    var memno = req.body.memno;   //取得會員編號
   
    removemem.remove(memno).then(d => {
        if(d>=0){
            res.render('removeSuccess', {results:d});  //傳至成功頁面     
        }else{
            res.render('removeFail');     //導向錯誤頁面
        }
    })    
});

module.exports = router;