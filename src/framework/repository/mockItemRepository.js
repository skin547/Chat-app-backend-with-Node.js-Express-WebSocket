const Item = require("../../entites/item")
const ItemRepository = require("./itemRepository");

module.exports = class MockItemRepository extends ItemRepository {

    constructor(){
        console.log( "Initializing MockItemRepository...")
        super()
        this.currentId = 1
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

    getAll(){
        return new Promise( ( resolve ) => {
            resolve( this.items )
        })
    }

    getItemById( id ){
        return new Promise( ( resolve, reject ) => {
            this.items.forEach( item => {
                if( Number(item.id) === Number(id) ) resolve( item )
            })
            reject( { error: "item not found" } )
        })
    }

    getItemsByStatus( status ){
        return new Promise( ( resolve ) => {
            let foundedItems = []
            this.items.forEach( item => {
                if( item.status === status ) foundedItems.push( item )
            })
            resolve( foundedItems )
        })
    }

    getItemsByOwner( owner ){
        return new Promise( ( resolve ) => {
            let foundedItems = []
            this.items.forEach( item => {
                if( item.owner === owner ) foundedItems.push( item )
            })
            resolve( foundedItems )
        })
    }
}