var express = require('express');
var router = express.Router();

//增加引用函式
const bookshelf = require('./utility/bookshelf');

//接收GET請求
router.get('/', function(req, res, next) {
    no=req.session.memno;
    var bno = req.query.bsfno;
    req.session.bno=bno;
    
    bookshelf.getDropdownData(bno).then(d => {
        if (d!=null && d!=-1){
            var data = {
                bsfno: bno,
                bsfname: d.bsfname
            }
            res.render('bookshelf_update_form', {item:data});  //將資料傳給更新頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    });
});

module.exports = router; 