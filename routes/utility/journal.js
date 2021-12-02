'use strict';

//引用操作資料庫的物件
var moment = require('moment');
const sql = require('./asyncDB');
//------------------------------------------
// 取出會員書櫃的資料
//------------------------------------------
var getDropdownData = async function () {
    //儲存下拉式選單資料
    var bookshelf;

    //取回bookshelf資料
    await sql('select bsfno,bsfname from bookshelf where memno = $1', [no])
        .then((data) => {
            bookshelf = data.rows;
        }, (error) => {
            result = [];
        });

    //設定回傳資料    
    var result = {};
    result.bookshelf = bookshelf;

    //回傳
    return result;
}
//------------------------------------------
//執行資料庫動作的函式-新增會員書櫃裡的手帳
//------------------------------------------
var addbsfjou = async function (newData,no) {
    var result;

    await sql('INSERT INTO journal (jouname,createdate,memno,photo) VALUES ($1, $2, $3, $4)', [newData.jouname, moment().format("YYYY-MM-DD"), no, newData.photo])
        .then((data) => {
            result = 0;
        }, (error) => {
            result = -1;
        });

    console.log(no);

    await sql('select jouname,jouno,photo from journal where memno = $1 order by jouno desc ', [no])
        .then((data) => {
            result = data.rows;
            //jno=result
            console.log(result);
            jno=result[0].jouno;
        }, (error) => {
            result = null;
        });

    console.log(newData.photo);
    console.log(newData.bsfno);
    console.log(jno);

    await sql('INSERT INTO bookshelf_journal (bsfno,jouno) VALUES ($1, $2)', [newData.bsfno, jno])
        .then((data) => {
            result = 0;
        }, (error) => {
            result = -1;
        });

    return result;
}
//------------------------------------------
//執行資料庫動作的函式-傳回使用者的所有書櫃
//------------------------------------------
var journallist = async function (no) {
    var result = [];

    await sql('select journal.jouno,journal.jouname,journal.photo,bookshelf.bsfname from bookshelf_journal left join journal on bookshelf_journal.jouno=journal.jouno full outer join bookshelf on bookshelf_journal.bsfno=bookshelf.bsfno where bookshelf.memno=$1', [no])
        //no是變數，依據登入者的帳號(memno)，取得對應的書櫃頁面
        //根據bookshelf_journal的資料表，顯示journal以及bookshelf的資料
        .then((data) => {
            result = data.rows;
        }, (error) => {
            result = null;
        });

    return result;
}
//------------------------------------------
//執行資料庫動作的函式-傳回單一手帳頁面
//------------------------------------------
var pagelist = async function (jouno) {
    var result = {};

    await sql('select journal.jouname,page.title1,journal.createdate from journal_page left join journal on journal_page.jouno=journal.jouno left join page on journal_page.pagno=page.pagno where journal.jouno = $1', [jouno])
        //jouno是變數，依據按下的手帳，進到對應的手帳頁面
        .then((data) => {
            if (data.rows.length > 0) {
                result = data.rows;
            } else {
                result = -1;
            }
        }, (error) => {
            result = null;
        });

    return result;
}
//------------------------------------------
//執行資料庫動作的函式-後端-取出單一手帳
//------------------------------------------
var query = async function(jouno){
    var result={};
    
    await sql('SELECT * FROM journal WHERE jouno = $1', [jouno])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows[0];   
            }else{
                result = -1;
            }    
        }, (error) => {
            result = null;
        });
		
    return result;
}

//匯出
module.exports = { getDropdownData, addbsfjou, journallist, pagelist, query};