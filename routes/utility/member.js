'use strict';

//引用操作資料庫的物件
var moment = require('moment');
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-新增會員以及新增預設書櫃
//------------------------------------------
var add = async function(newData){
    var result;

    await sql('INSERT INTO member (password, email, birthday, username, privateset) VALUES ($1, $2, $3, $4, $5)', [newData.password, newData.email, newData.birthday,newData.username, newData.privateset])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });

    await sql('select * from member where email=$1',[newData.email])
        .then((data) => {
            result = data.rows;
        }, (error) => {
            result = null;
        });

    await sql('INSERT INTO bookshelf (bsfname, createdate, privatest, memno) VALUES ($1, $2, $3, $4)', ['預設', moment().format("YYYY-MM-DD"), '0',result[0].memno])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//------------------------------------------
//執行資料庫動作的函式-取出單一商品  #後端用
//------------------------------------------
var query = async function(memno){
    var result={};
    
    await sql('SELECT * FROM member WHERE memno = $1', [memno])
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
module.exports = {add, query};