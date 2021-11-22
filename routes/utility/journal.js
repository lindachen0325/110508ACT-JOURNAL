'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
//------------------------------------------
//執行資料庫動作的函式-傳回所有使用者的書櫃
//------------------------------------------
var journallist = async function (no) {
    var result = [];

    await sql('select journal.jouno,journal.jouname,journal.photo,bookshelf.bsfname from bookshelf_journal left join journal on bookshelf_journal.jouno=journal.jouno full outer join bookshelf on bookshelf_journal.bsfno=bookshelf.bsfno where bookshelf.memno=$1',[no])
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

    await sql('select journal.jouname,page.title1,journal.createdate from journal_page left join journal on journal_page.jouno=journal.jouno left join page on journal_page.pagno=page.pagno where journal.jouno = $1',[jouno])
    //jouno是變數，依據按下的手帳，進到對應的手帳頁面
        .then((data) => {
            if (data.rows.length > 0) {
                result = data.rows;
            }else {
                result = -1;
            }
        }, (error) => {
            result = null;
        });

    return result;
}
//------------------------------------------
//執行資料庫動作的函式-取出單一手帳
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
module.exports = { journallist, pagelist, query};