var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const bookshelf = require('./utility/bookshelf');

//接收GET請求
router.get('/', function(req, res, next) {
    var bsfno = req.query.bsfno;   //取出參數

    bookshelf.query(bsfno).then(data => {
        if (data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data==-1){
            res.render('notFound');  //導向找不到頁面                
        }else{
            data.createdate=moment(data.createdate).format("YYYY-MM-DD")
            res.render('bookshelf_query', {item:data});  //將資料傳給顯示頁面
        }  
    })
});

module.exports = router;