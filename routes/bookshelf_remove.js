var express = require('express');
var router = express.Router();

//增加引用函式
const removebs = require('./utility/removebs');

//接收POST請求
router.post('/', function(req, res, next) {
    var bsfno = req.body.bsfno;   //取得會員編號
   
    removebs.remove(bsfno).then(d => {
        if(d>=0){
            res.render('success', {results:d});  //傳至成功頁面     
        }else{
            res.render('fail');     //導向錯誤頁面
        }
    })    
});

module.exports = router;