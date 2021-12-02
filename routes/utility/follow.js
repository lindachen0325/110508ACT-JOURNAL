'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//傳回所有追蹤資料
//------------------------------------------
var fetchAllFollow = async function(){
    var result={};
	
    await sql('SELECT * FROM follow')
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
    return result;
}
//------------------------------------------
//傳回我追蹤的人的資料
//------------------------------------------
var following = async function(memno){
    var result={};
	
    await sql('SELECT photo, username, bio FROM follow f join member m on f.befollow=m.memno where f.memno=$1', [memno])
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
    return result;
}

//------------------------------------------
//傳回追蹤我的人的資料
//------------------------------------------
var follower = async function(befollow){
    var result={};
	
    await sql('SELECT photo, username, bio FROM follow f join member m using(memno) where f.befollow=$1', [befollow])
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}

//------------------------------------------
//執行資料庫動作的函式-新增追蹤資料
//------------------------------------------
var foadd = async function(newData){
    var result;

    console.log(newData);
    await sql('INSERT INTO follow (serial, memnno, befollow) VALUES ($1, $2, $3)', [newData.serial, newData.memno, newData.befollow])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
    return result;
}


module.exports = {fetchAllFollow, following, follower, foadd}