var express = require('express');
var router = express.Router();

//增加引用函式
const bookshelf = require('./utility/bookshelf');

//接收POST請求
router.post('/', function(req, res, next) {
    no=req.session.memno;
    var bsfno=req.session.bno;     

    var newData={
        bsfno:bsfno,
        bsfname: req.body.bsfname   //取得產品名稱
    } 
    
    bookshelf.update(newData,no,bsfno).then(d => {
        if (d>=0){
            res.render('success', {results:d});  //傳至成功頁面
        }else{
            res.render('fail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;

