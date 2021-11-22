var express = require('express');
var router = express.Router();

//增加引用函式
const bookshelf = require('./utility/bookshelf');

//接收POST請求
router.post('/', function(req, res, next) {
    no=req.session.memno;
    var bsfname = req.body.bsfname;            
    
    // 建立一個新資料物件
    var newData={
        bsfname:bsfname
    } 
    
    bookshelf.addbsf(newData).then(d => {
        if (d==0){
            res.render('success');  //傳至成功頁面
        }else{
            res.render('fail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;

