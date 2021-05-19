const GetItemUseCase = require("../useCases/item/getItem")
const AddItemUseCase = require("../useCases/item/addItem")

module.exports = (itemRepo) => {

    const getItem = new GetItemUseCase( itemRepo )
    const addItem = new AddItemUseCase( itemRepo )

    const getAllItems = ( request, response, next ) => {
        console.log( "get all items ")
        getItem.getAll( )
        .then( res => response.json( res ) )
        .catch( error => next() )
    }

    const getItemById = ( request, response, next ) => {
        const targetId = request.params.itemId
        console.log( targetId )
        getItem.byId( targetId )
        .then( res => response.json( res ) )
        .catch( error => next( error ) )
    }

    const getItemByOwner = ( request, response, next ) => {
        const owner = request.query.owner
        getItem.byOwner( owner )
        .then( res => response.json( res ) )
        .catch( error => next() )
    }

    const getItemByStatus = ( request, response, next ) => {
        const status = request.query.status
        getItem.byStatus( status )
        .then( res => response.json( res ) )
        .catch( error => next() )
    }

    const addNewItem = ( request, response, next ) => {
        const body = request.body
        addItem.execute( body.content, body.owner )
        .then( res => response.status(201).json( res ) )
        .catch( error => next() )
    }

    return {
        getAllItems,
        getItemById,
        getItemByOwner,
        getItemByStatus,
        addNewItem
    }
}