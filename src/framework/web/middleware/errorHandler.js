const logger = require("../../utilities/logger")

errorHandler = (error, request, response, next) => {
    logger.log( {level:'error', message: error} )
    if( error.name === "JsonWebTokenError" ){
        switch( error.message ){
            case "invalid token" :
                response.status( 401 ).json( { error : "invalid token" })
                break;
            case "invalid signature" :
                response.status( 400 ).json( { error : "invalid signature" } )
        }
        
    }
    response.status(500).json(error);
};

module.exports = errorHandler