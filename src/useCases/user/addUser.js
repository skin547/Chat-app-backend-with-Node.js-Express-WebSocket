module.exports = class AddUserUseCase {

    constructor( userRepository ){
        if( !userRepository && !userRepository instanceof UserRepository ) throw new Error( "Not giving userRepository" )
        this.userRepository = userRepository
    }

    execute( name, email, password ) {
        return new Promise( async ( resolve, reject ) => {
            this.userRepository.getUserByEmail( email )
            .then( () => reject( { error : "email already exist" } ) )
            .catch( error => error )
            let data = await this.userRepository.insert( name, email, password )
            resolve( {  id : data.id,
                        name: data.name,
                        email : data.email } )
        })
    }
}