module.exports = class ItemRepository {

    constructor(){
        console.log( `Initializing ${this.constructor.name}...`)
    }

    insert( itemInstance ){
        throw new Error( "not implemented" )
    }

    getAll(){
        throw new Error( "not implemented" )
    }

    getItemById( id ){
        throw new Error( "not implemented" )
    }

    getItemsByStatus( status ){
        throw new Error( "not implemented" )
    }

    getItemsByOwner( owner ){
        throw new Error( "not implemented" )
    }
}