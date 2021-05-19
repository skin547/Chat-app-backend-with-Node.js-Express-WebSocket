logger = (requset, response, next) => {
    console.log(requset.headers['x-forwarded-for'] || requset.connection.remoteAddress);
    console.log(new Date().toLocaleDateString());
    next();
};

module.exports = logger;