'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-新增管理員資料
//------------------------------------------
var add = async function(newData){
    var result;
    
    console.log(newData);
    await sql('INSERT INTO manager (manname, password, email, phonenum) VALUES ($1, $2, $3, $4)', [newData.manname, newData.password, newData.email,newData.phonenum])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//匯出
module.exports = {add};