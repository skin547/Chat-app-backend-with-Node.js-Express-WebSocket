const Item = require("../../entites/item")
const ItemRepository = require("./itemRepository");

module.exports = class MockItemRepository extends ItemRepository {

    constructor(){
        console.log( "Initializing MockItemRepository...")
        super()
        this.currentId = 0
        this.items = []
    }

    insert( content, owner ){
        return new Promise( (resolve) => {
            let itemInstance = new Item( this.currentId , content, owner )
            this.currentId = this.currentId + 1
            this.items.push( itemInstance )
            resolve( itemInstance )
        })
    }
}