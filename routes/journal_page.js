var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const journal = require('./utility/journal');

//接收GET請求
router.get('/:jouno', function(req, res, next) {
    var jouno = req.params.jouno;   //取出參數

    journal.pagelist(jouno).then(data => {
        if(data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data==-1){
            res.render('nullmyJournals');  //當手帳內沒有頁面時，會導向這裡
        }else{
            res.render('myJournals', {items:data, moment:moment});  //將資料傳給顯示頁面
        }  
    })
});

module.exports = router;