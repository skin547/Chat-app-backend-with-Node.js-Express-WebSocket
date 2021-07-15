module.exports = class ClientRepository {

    constructor(){
        console.log( `Initializing ${this.constructor.name}...`)
    }

    insert( userId, connection ){
        throw new Error( "not implemented" )
    }

    getConnection( userId ){
        throw new Error( "not implemented" )
    }
}