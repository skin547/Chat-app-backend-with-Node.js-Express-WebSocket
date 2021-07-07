const ItemRepository = require("../../framework/repository/item/itemRepository")

module.exports = class AddItemUseCase {

    constructor( itemRepository ){
        if( !itemRepository && !itemRepository instanceof ItemRepository ) throw new Error( "Not giving itemRepository" )
        this.itemRepository = itemRepository
    }

    async execute( content, owner ) {
        let result = await this.itemRepository.insert( content, owner )
        return result
    }
}