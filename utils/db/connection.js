const mysql = require('mysql');
const logger = require('../logger');
const dotenv = require('dotenv');

if (dotenv.error) {
    logger.log('error', dotenv.error, 'main.js');
    return false;
}
dotenv.config();

try {

    var connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

} catch (error) {

    logger.log('error', error)
    console.log(error);

}

connection.connect(function (err) {

    if (err) {
        logger.log('error', err);
        console.error('error connecting: ' + err.stack);
        return true;
    }

    logger.log('info', ` Connected to db, with id : ${connection.threadId} `)
    console.log('connected to DB, with id : ' + connection.threadId);

});


module.exports = {
    query: (sql, val) => new Promise((resolve, reject) => {
        connection.query(sql, val, async (error, results) => {
            if (error) {
                return reject(error.message);
            }

            return resolve(results);
        });
    })
};