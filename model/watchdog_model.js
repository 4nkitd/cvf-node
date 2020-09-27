const connection = require("../utils/db/connection");

module.exports = {

    addAccessLog: (userId, ip_address, useragent, route) => new Promise(async (resolve, reject) => {
        var sql = `INSERT INTO v2_accesslog 
        (  user_id, ip_address, useragent, route )
         VALUES 
        ( ?,?,?,? );`;

        val = [userId, ip_address, useragent, route];

        await connection.query(sql, val).then((results) => {

            resolve(results);

        }).catch((error) => {
            reject(error);
        });
    }),

}