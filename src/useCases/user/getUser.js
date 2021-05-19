const UserRepository = require("../../framework/repository/userRepository")

module.exports = class GetUserUseCase {

    constructor( userRepository ){
        if( !userRepository && !userRepository instanceof UserRepository ) throw new Error( "Not giving userRepository" )
        this.userRepository = userRepository
    }

    async byEmail( email ) {
        return this.userRepository.getUserByEmail( email )
    }

    async byId( id ) {
        return this.userRepository.getUserById( id )
    }
}