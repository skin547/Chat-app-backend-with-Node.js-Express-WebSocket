const AddUserUseCase = require("../useCases/user/addUser")
const GetUserUseCase = require("../useCases/user/getUser")
const AuthenticationUseCase = require("../useCases/user/authentication")

module.exports = (userRepo) => {

    const getUser = new GetUserUseCase( userRepo )
    const addUser = new AddUserUseCase( userRepo )
    const authentication = new AuthenticationUseCase( userRepo )

    const signUp = ( request, response, next ) => {
        const body = request.body
        addUser.execute( body.name, body.email, body.password )
        .then( result => response.status(201).json( result ) )
        .catch( error => next(error) )
    }

    const login = ( request, response, next ) => {
        const body = request.body
        authentication.register( body.name, body.email, body.password )
        .then( token => response.json(token) )
        .catch( error => next( error ) )
    }

    const verify = ( request, response, next ) => {
        const token = request.header('Authorization').replace('Bearer ', '')
        authentication.verify( token )
        .then( result => response.json( result ) )
        .catch( error => next( error) )
    }

    return {
        signUp,
        login,
        verify
    }
}