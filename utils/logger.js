'use strict';

const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../server.log');

module.exports = {
    log: (level, msg, file = null) => {

        if (typeof msg == 'object' || typeof msg == 'Array') {
            msg = JSON.stringify(msg);
        }

        let log = '';

        if (file != null) {
            log += `---\n ${file} \n`;
        }

        log += `[${new Date().toISOString()}] - [${level}] - { ${msg} };\n`;
        fs.appendFile(logFile, log, (err) => {
            if (err) throw err;
        })
    }
}