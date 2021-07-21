module.exports = class MessageUseCase {

    constructor( messageRepository, notificationManager ){
        if( !messageRepository ) throw new Error( "Not giving messageRepository" )
        this.messageRepository = messageRepository
        this.notificationManager = notificationManager
    }

    create( content, roomId, userId ) {
        return new Promise( async (resolve, reject ) => {
            let newMessage = await this.messageRepository.insert( content, userId, roomId )
            this.notify( userId, newMessage.roomId, newMessage )
            resolve(newMessage)
        })
    }

    getAll( ) {
        return new Promise( async (resolve, reject ) => {
            resolve( this.messageRepository.getAll() )
        })
    }

    async notify( senderId, roomId, message ) {
        this.notificationManager.notify( senderId, roomId, message )
    }

    getMessagesByRoomId( roomId ){
        return new Promise( async (resolve, reject ) => {
            let messages = await this.messageRepository.getMessagesByRoomId( roomId )
            resolve( messages )
        })
    }
}