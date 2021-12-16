'use strict';

//引用操作資料庫的物件
var moment = require('moment');
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-新增會員書櫃
//------------------------------------------
var addbsf = async function(newData){
    var result;

    await sql('INSERT INTO bookshelf (bsfname,createdate,memno) VALUES ($1, $2, $3)', [newData.bsfname, moment().format("YYYY-MM-DD"),no])
        .then((data) => {
            result = 0;  
        }, (error) => {
           result = -1;
        }); 

    return result;
}
//------------------------------------------
// 取出會員書櫃的資料
//------------------------------------------
var getDropdownData = async function(bsfno){
    //儲存下拉式選單資料
    var bookshelf;
    
    //取回bookshelf資料
    await sql('select bsfno,bsfname from bookshelf where memno=$1',[no])
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
//執行資料庫動作的函式-刪除會員書櫃
//------------------------------------------
var remo = async function(bsfno){
    var result;

    await sql('DELETE FROM bookshelf WHERE bsfno=$1', [bsfno])
        .then((data) => {
            result = data.rowCount;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//----------------------------------
// 更新書櫃名稱
//----------------------------------
var update = async function(newData,no,bsfno){
    var results;

    await sql('UPDATE bookshelf SET bsfname=$1 where memno=$2 and bsfno=$3', [newData.bsfname,no,bsfno])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
		console.log(results);
    return results;
}

//------------------------------------------
//執行資料庫動作的函式-後端查詢取出單一商品
//------------------------------------------
var query = async function(bsfno){
    var result={};
    
    await sql('SELECT * FROM bookshelf WHERE bsfno = $1', [bsfno])
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
module.exports = {addbsf,getDropdownData,remo,update,query};