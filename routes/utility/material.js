'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
// 新增素材
//------------------------------------------
var matadd = async function(newData){
    var result;

    await sql('INSERT INTO material (matname, material) VALUES ($1, $2)', [newData.matname, newData.material])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//匯出
module.exports = {matadd};