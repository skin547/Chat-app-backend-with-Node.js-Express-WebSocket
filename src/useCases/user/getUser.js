const UserRepository = require("../../framework/repository/userRepository")

module.exports = class GetUserUseCase {

    constructor( userRepository ){
        if( !userRepository && !userRepository instanceof UserRepository ) throw new Error( "Not giving userRepository" )
        this.userRepository = userRepository
    }

    async byEmail( email ) {
        let result = await this.userRepository.getUserByEmail( email )
        delete result.password
        return result
    }

    async byId( id ) {
        let result = await this.userRepository.getUserById( id )
        delete result.password
        return result
    }
}