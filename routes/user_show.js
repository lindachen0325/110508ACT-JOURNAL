var express = require('express');
var router = express.Router();

//接收GET請求
router.get('/', function(req, res, next) {
    var email = req.session.email; 

    if(email==null || email==undefined){
      email = '尚未登入';
    }
    
    res.render('user_show', { email: email });

});

module.exports = router;