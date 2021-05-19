errorHandler = (error, request, response, next) => {
    response.status(500).json(error);
};

module.exports = errorHandler