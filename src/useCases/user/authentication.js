const jwt = require("../../framework/utilities/jwt")
const secretkey = require("../../../config").authentication.secretkey

module.exports = class AuthenticationUseCase {

    constructor( userRepository ){
        if( !userRepository && !userRepository instanceof UserRepository ) throw new Error( "Not giving userRepository" )
        this.userRepository = userRepository
        this.secretKey = secretkey
    }
    
    register( name, email, password ){
        return new Promise( async (resolve, reject ) => {
            this.userRepository.getUserByEmail( email )
            .then( foundUser => {
                if( foundUser.login( password ) ){
                    let result = jwt.sign( {id: foundUser.id, name:name, email:email}, this.secretKey, { expiresIn: 60 * 60 * 24 * 7 } )
                    resolve( { token : result } )
                } else {
                    reject( new Error( "authentication failed" ) )
                }
            })
            .catch( error => reject( error ) )
        })
    }

    verify( token ){
        return new Promise( async (resolve, reject) => {
            try {
                let result = jwt.verify( token, this.secretKey )
                resolve( result )
            } catch ( error ) {
                reject( error )
            }
        })
    }

}