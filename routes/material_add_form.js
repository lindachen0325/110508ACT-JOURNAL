var express = require('express');
var router = express.Router();

//增加引用函式
const material = require('./utility/material');

//接收GET請求
router.get('/', function(req, res, next) {
    material.getDropdownData().then(d => {
        if (d!=[]){
            res.render('material_add_form', {result:d});  //轉至新增頁面
        }else{
            res.render('fail');     //導向錯誤頁面
        }  
    });
});

//匯出
module.exports = router; 