var express = require('express');
var router = express.Router();

//處理GET, POST, PUT, DELETE等所有請求
router.all('/', function(req, res, next) {
    //檢查是否有session註記
    var email = null;

    try{
        email = req.session.email;
    }catch(err){
        email = null;        
    }

    if(email===null || email===undefined){
        res.render('unAuth');  //導向無權限畫面        
    }else{
        next();  //執行在app.use()中, 串接在checkAuth之後的函式 
    }    
});

module.exports = router;