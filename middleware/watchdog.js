
const logger = require("../utils/logger");

module.exports = async (req, res, next) => {

    try {

        req.useragent = useragent;
        req.ip_address = ip_address;
        return next();

    } catch (error) {
        logger.log('error', error)
    }


};