module.exports = class MessageRepository {

    constructor(){
        console.log( `Initializing ${this.constructor.name}...`)
    }

    insert( content, userId, roomId ){
        throw new Error( "not implemented" )
    }

    getMessagesByRoomId( roomId ){
        throw new Error( "not implemented" )
    }

}