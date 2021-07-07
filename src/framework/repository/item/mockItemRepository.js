const Item = require("../../../entites/item")
const ItemRepository = require("./itemRepository");

class MockItemRepository extends ItemRepository {

    constructor(){
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

    getAll( queries ){
        return new Promise( ( resolve ) => {
            if( queries ){
                let result = this.items.filter( item => {
                    let flag = true
                    for( let query in queries ){
                        flag = flag && item[query] == queries[query]
                    }
                    if( flag ) return item
                })
                resolve( result )
            } else {
                resolve( this.items )
            }
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

            for( let i = 0 ; i < this.items.length ; i++ ){
                if( this.items[i].status === status ) foundedItems.push( this.items[i] )
            }
            resolve( foundedItems )
        })
    }

    getItemsByOwner( owner ){
        return new Promise( ( resolve ) => {
            let foundedItems = []
            for( let i = 0 ; i < this.items.length ; i++ ){
                if( this.items[i].owner === owner ) foundedItems.push( this.items[i] )
            }
            resolve( foundedItems )
        })
    }

    updateItem( item ){
        return new Promise( (resolve) => {
            for( let i = 0 ; i < this.items.length ; i++ ){
                if( Number(this.items[i].id) === Number(item.id) ) {
                    this.items.slice( i, 1 )
                    this.items.push( item )
                }
            }
            resolve( item )
        })
    }
}

module.exports = new MockItemRepository()