const AddRoomUseCase = require("../useCases/room/addRoom")
const GetRoomUseCase = require("../useCases/room/getRoom")
const MessageUseCase = require("../useCases/message/message")


module.exports = (roomRepo, messageRepo) => {
    const getRoom = new GetRoomUseCase( roomRepo )
    const addRoom = new AddRoomUseCase( roomRepo )
    const message = new MessageUseCase( messageRepo )

    const getAll = ( request, response, next ) => {
        const token = request.header('Authorization').replace('Bearer ', '')
        getRoom.byUserId( token.id )
        .then( res => response.json( res ) )
        .catch( error => next( error ) )
    }

    const createRoom = ( request, response, next ) => {
        const body = request.body
        const token = request.header('Authorization').replace('Bearer ', '')
        addRoom.execute( body.users, token.name )
        .then( res => response.status(201).json( res ) )
        .catch( error => next( error ) )
    }

    const getById = ( request, response, next ) => {
        const roomId = request.params.roomId
        getRoom.byId( roomId )
        .then( res => response.json( res ) )
        .catch( error => next( error ) )
    }

    const getRoomMessages = ( request, response, next ) => {
        const roomId = request.params.roomId
        message.getMessagesByRoomId( roomId )
        .then( res => response.json( res ) )
        .catch( error => next( error ) )
    }

    return {
        getAll,
        createRoom,
        getById,
        getRoomMessages
    }
}