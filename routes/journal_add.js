var express = require('express');
var router = express.Router();

//增加引用函式
const journal = require('./utility/journal');

//---------------------------
// 引用multer外掛
//---------------------------
const multer = require('multer');

// 宣告上傳存放空間及檔名更改
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/photo');
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname);
    }
})
// 產生multer的上傳物件
var maxSize = 1024 * 1024;  //設定最大可接受圖片大小(1M)

var upload = multer({
    storage: storage
})
//---------------------------

//接收POST請求
router.post('/', upload.single('photo'), function (req, res, next) {
    var sign = 0;

    no = req.session.memno;
    jno = req.session.jouno;

    var jouname = req.body.jouname;
    var bsfno = req.body.bsfno;
    var photo;


    // 如果有選擇圖片
    if (typeof (req.file) != 'undefined') {
        photo = req.file.filename;   //取得上傳照片名稱
    }

    // 建立一個新資料物件
    var newData = {
        jouname: jouname,
        bsfno: bsfno,
        photo: photo
    }

    journal.addbsfjou(newData, no).then(d => {
        if (d == 0) {
            res.render('success');  //傳至成功頁面
        } else {
            sign=1;
            res.render('fail');     //導向錯誤頁面
        }
    })

    if (sign === 1) {
        return;
    }

    // 如果有選擇圖片
    if (typeof req.file != 'undefined') {
        // 傳入檔案不可超過maxSize
        if (req.file.size > maxSize) {
            res.render('fail');  //圖片過大
            return;
        }
    }
    
});

module.exports = router;

