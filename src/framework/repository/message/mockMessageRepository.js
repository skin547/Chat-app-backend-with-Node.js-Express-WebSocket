const MessageRepository = require("./messageRepository")
const Message = require("../../../entites/message")

class MockMessageRepository extends MessageRepository {

    constructor(){
        super()
        this.id = 1
        this.messages = []
    }

    insert( content, userId, roomId ){
        return new Promise( ( resolve ) => {
            let newMessage = new Message(this.id++, content, userId, roomId)
            this.messages.push( newMessage )
            resolve( newMessage )
        })
    }

    getMessagesByRoomId( roomId ){
        return new Promise( ( resolve ) => {
            let messages = this.messages.filter( ( message ) => message.roomId == roomId )
            resolve( messages )
        })
    }

    getAll(){
        return this.messages
    }

}

module.exports = new MockMessageRepository()