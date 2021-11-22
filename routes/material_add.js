var express = require('express');
var router = express.Router();

//增加引用函式
const mat = require('./utility/material');

//---------------------------
// 引用multer外掛
//---------------------------
const multer  = require('multer');

// 宣告上傳存放空間及檔名更改
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/picture');
    },

    filename: function (req, file, cb) {
        cb(null, Date.now()+"--"+file.originalname);    
    }   
})

// 產生multer的上傳物件
var maxSize=4096*4096;  //設定最大可接受圖片大小(1M)

var upload = multer({
    storage:storage
})
//---------------------------

//接收POST請求
router.post('/', upload.single('material'), function(req, res, next) {

    var sign=0;
    

    //var matno = req.body.matno;            //取得產品編號
    var matname = req.body.matname;        //取得產品名稱  
    var material;                           //用來存放圖片名稱

    // 如果有選擇圖片
    if (typeof(req.file) != 'undefined'){
        material=req.file.filename;   //取得上傳照片名稱
    }

    // 建立一個新資料物件
    var newData={
        matname:matname,
        material:material
    } 
    
    // 新增素材
    mat.matadd(newData).then(d => {
        if (d==0){
            res.render('success');  //傳至成功頁面
        }else{
            sign=1;
            res.render('fail');     //導向錯誤頁面
        }  
    })

    if(sign===1){
        return;
    }

    // 如果有選擇圖片
    if (typeof req.file != 'undefined'){
        // 傳入檔案不可超過maxSize
        if(req.file.size > maxSize){
            res.render('fileSizeError');  //圖片過大
            return;
        }                      
    }  
    
});

module.exports = router;
