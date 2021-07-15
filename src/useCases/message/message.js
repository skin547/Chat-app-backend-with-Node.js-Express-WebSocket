module.exports = class MessageUseCase {

    constructor( messageRepository ){
        if( !messageRepository ) throw new Error( "Not giving messageRepository" )
        this.messageRepository = messageRepository
    }

    create( content, userId, roomId ) {
        return new Promise( async (resolve, reject ) => {
            let newMessage = await this.messageRepository.insert( content, userId, roomId )
            this.notify( newMessage.roomId, newMessage )
            resolve(newMessage)
        })
    }

    getAll( ) {
        return new Promise( async (resolve, reject ) => {
            resolve( this.messageRepository.getAll() )
        })
    }

    async notify( roomId, message ) {
        
    }

    getMessagesByRoomId( roomId ){
        return new Promise( async (resolve, reject ) => {
            let messages = await this.messageRepository.getMessagesByRoomId( roomId )
            resolve( messages )
        })
    }
}