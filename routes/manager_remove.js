var express = require('express');
var router = express.Router();

//增加引用函式
const removeman = require('./utility/removeman');

//接收POST請求
router.post('/', function(req, res, next) {
    var manno = req.body.manno;   //取得會員編號
   
    removeman.remove(manno).then(d => {
        if(d>=0){
            res.render('success', {results:d});  //傳至成功頁面     
        }else{
            res.render('fail');     //導向錯誤頁面
        }
    })    
});

module.exports = router;