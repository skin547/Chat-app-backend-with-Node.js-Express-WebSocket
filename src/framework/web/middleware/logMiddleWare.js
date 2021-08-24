const logger = require("../../utilities/logger")

logMiddleWare = (request, response, next) => {
    from = request.headers['x-forwarded-for'] || request.connection.remoteAddress
    date = new Date().toLocaleString()
    method = request.method
    url = request.url
    logger.info(`${date} | ${from} | ${method} ${url}`)
    next();
};

module.exports = logMiddleWare;