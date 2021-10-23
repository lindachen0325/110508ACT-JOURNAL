'use strict';

//引用操作資料庫的物件
var moment = require('moment');
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-新增會員資料
//------------------------------------------
var add = async function(newData){
    var result;

    console.log(newData);
    await sql('INSERT INTO member (password, email, birthday, username, privateset) VALUES ($1, $2, $3, $4, $5)', [newData.password, newData.email, newData.birthday,newData.username, newData.privateset])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
    console.log('***1');
    await sql('select * from member where email=$1',[newData.email])
        .then((data) => {
            result = data.rows;
        }, (error) => {
            result = null;
        });
    console.log('***2');
    console.log(result);
    await sql('INSERT INTO bookshelf (bsfname, createdate, privatest, memno) VALUES ($1, $2, $3, $4)', ['預設', moment().format("YYYY-MM-DD"), '0',result[0].memno])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
    console.log('***3');

		
    return result;
}

//匯出
module.exports = {add};