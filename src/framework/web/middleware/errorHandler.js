errorHandler = (error, request, response, next) => {
    console.log( error.name )
    if( error.name === "JsonWebTokenError" ){
        response.status(401).json( error )
    }
    response.status(500).json(error);
};

module.exports = errorHandler