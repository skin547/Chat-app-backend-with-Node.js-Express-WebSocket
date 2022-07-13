const jwt = require("../../utilities/jwt")
const secretKey = require("../../../../config").authentication.secretkey

module.exports = ( request, response, next ) => {
    try {
        const authorizationHeader = request.headers.authorization
        if( !authorizationHeader ) throw new Error( "Not giving authorizaiton header" )
        const token = authorizationHeader.replace('Bearer ', '')
        const decoded = jwt.verify( token, secretKey )
        request.token = decoded
        next()
    } catch ( error ){
        response.status(401).json( { error : error.message} )
    }
}