const MessageUseCase = require("../useCases/message/message")
const NotificationManager = require("../framework/utilities/notificationManager")

module.exports = (messageRepo, roomRepo, clientRepo ) => {

    messageNotifer = new NotificationManager( roomRepo, clientRepo )
    message = new MessageUseCase( messageRepo, messageNotifer )

    const getAll = ( request, response, next ) => {
        message.getAll()
        .then( res => response.json( res ) )
        .catch( error => next( error ) )
    }

    const createMessage = ( request, response, next ) => {
        const body = request.body
        const token = request.token
        message.create( body.content, body.roomId, token.id )
        .then( res => response.status(201).json( res ) )
        .catch( error => next( error ) )
    }

    const getMessagesByRoomId = ( request, response, next ) => {
        const roomId = request.params.roomId
        message.getMessagesByRoomId( roomId )
        .then( res => response.json( res ) )
        .catch( error => next( error ) )
    }

    return {
        createMessage,
        getMessagesByRoomId,
        getAll
    }
}