'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//傳回所有會員資料
//------------------------------------------
var fetchAllProfile = async function(){
    var result={};
	
    await sql('SELECT * FROM member')
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}
//------------------------------------------
//傳回自己的個人資料
//------------------------------------------
var myprofile = async function(no){
    var result={};
	
    await sql('SELECT photo, username, bio FROM member where memno=$1', [no])
    .then((data) => {
        if(data.rows.length > 0){
            result = data.rows[0];   
        }else{
            result = -1;
        }    
    }, (error) => {
        result = null;
    });
	console.log(no);
    return result;
}
//------------------------------------------
//更新個人資料
//------------------------------------------
/*var profileEdit = async function(newData){
    var results;

    await sql('UPDATE member SET username=$1, bio=$2 where memno=$3', [newData.username, newData.bio, no])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
		
    return results;
}*/
var profileEdit = async function(no){
    var result={};
	
    await sql('SELECT photo, username, bio FROM member where memno=$1', [no])
    .then((data) => {
        if(data.rows.length > 0){
            result = data.rows[0];   
        }else{
            result = -1;
        }    
    }, (error) => {
        result = null;
    });
	console.log(no);
    return result;
}
module.exports = {fetchAllProfile, myprofile, profileEdit}