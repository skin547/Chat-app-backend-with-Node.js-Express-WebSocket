const ItemRepository = require("../../framework/repository/itemRepository")

module.exports = class GetItemUseCase {

    constructor( itemRepository ){
        if( !itemRepository && !itemRepository instanceof ItemRepository ) throw new Error( "Not giving itemRepository" )
        this.itemRepository = itemRepository
    }

    async getAll() {
        return this.itemRepository.getAll()
    }

    async byId( id ) {
        console.log( "get item by id: " + id )
        return this.itemRepository.getItemById( id )
    }

    async byStatus( status ) {
        return this.itemRepository.getItemsByStatus( status )
    }

    async byOwner( owner ) {
        return this.itemRepository.getItemsByOwner( owner )
    }
}