module.exports = class RoomRepository {

    constructor(){
        console.log( `Initializing ${this.constructor.name}...`)
    }

    insert( name, users ){
        throw new Error( "not implemented" )
    }
    
    getRoomById( id ){
        throw new Error( "not implemented" )
    }
}