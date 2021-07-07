module.exports = class UserRepository {

    constructor(){
        console.log( `Initializing ${this.constructor.name}...`)
    }

    insert( name, email, password ){
        throw new Error( "not implemented" )
    }

    getUserByEmail( email ){
        throw new Error( "not implemented" )
    }

    getUserById( id ){
        throw new Error( "not implemented" )
    }
}