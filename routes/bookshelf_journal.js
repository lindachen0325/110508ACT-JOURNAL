var express = require('express');
var router = express.Router();

//增加引用函式
const bookshelf = require('./utility/journal');

router.get('/nullmybookcase', function(req, res, next) {
    res.render('nullmybookcase', { title: 'nullmybookcase' });
  });

//接收GET請求
router.get('/', function(req, res, next) {
    no=req.session.memno;
    bookshelf.journallist(no).then(data => {
        if(data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data.length > 0){
            //同樣書櫃名字的顯示在同一橫排，之後可能要改編號
            names = []
            for (i=0; i< data.length; i++){
                if (names.indexOf(data[i].bsfname)==-1){
                    names.push(data[i].bsfname)
                }
            }
            username = []
            username= req.session.username;
            res.render('bookcase', {items:data, bsfnames:names,username:username});//將資料傳給顯示頁面
        }else{
            res.render('nullmybookcase');  //導向找不到頁面
        }  
    })
});

module.exports = router;