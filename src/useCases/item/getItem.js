const ItemRepository = require("../../framework/repository/item/itemRepository")

module.exports = class GetItemUseCase {

    constructor( itemRepository ){
        if( !itemRepository && !itemRepository instanceof ItemRepository ) throw new Error( "Not giving itemRepository" )
        this.itemRepository = itemRepository
    }

    async getAll( queries ) {
        return this.itemRepository.getAll( queries )
    }

    async byId( id ) {
        return this.itemRepository.getItemById( id )
    }

    async byStatus( status ) {
        return this.itemRepository.getItemsByStatus( status )
    }

    async byOwner( owner ) {
        return this.itemRepository.getItemsByOwner( owner )
    }
}