'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//----------------------------------
// 刪除手帳
//----------------------------------
var remove = async function(jouno){
    var result;

    await sql('DELETE FROM journal WHERE jouno = $1', [jouno])
        .then((data) => {
            result = data.rowCount;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//匯出
module.exports = {remove};