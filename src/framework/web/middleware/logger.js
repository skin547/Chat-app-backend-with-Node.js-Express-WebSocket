logger = (request, response, next) => {
    from = request.headers['x-forwarded-for'] || request.connection.remoteAddress
    date = new Date().toLocaleString()
    method = request.method
    url = request.url
    console.log(`${date} | ${from} | ${method} ${url}`);
    next();
};

module.exports = logger;