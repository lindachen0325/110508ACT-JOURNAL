var express = require('express');
var router = express.Router();

//增加引用函式
const journal = require('./utility/journal');

//接收GET請求
router.get('/', function(req, res, next) {
    journal.getDropdownData().then(d => {
        if (d!=[]){
            res.render('journal_add_form', {result:d});  //轉至新增頁面
        }else{
            res.render('fail');     //導向錯誤頁面
        }  
    });
});

module.exports = router; 