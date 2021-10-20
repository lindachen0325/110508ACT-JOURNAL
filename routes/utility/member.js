'use strict';

//引用操作資料庫的物件
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
		
    return result;
}

//匯出
module.exports = {add};