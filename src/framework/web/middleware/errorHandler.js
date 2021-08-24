const logger = require("../../utilities/logger")

errorHandler = (error, request, response, next) => {
    logger.log( {level:'error', message: error} )
    if( error.name === "JsonWebTokenError" ){
        switch( error.message ){
            case "invalid signature" :
                return response.status( 400 ).json( { error : "ivalid signnature" } )
            case "invalid token" :
                return response.status( 401 ).json( { error : "invalid token" })
        }
        
    }
    response.status(500).json(error);
};

module.exports = errorHandler