const { v4: uuidv4 } = require("uuid")

const MessageRepository = require("./messageRepository");
const Database = require("../../orm/database.js");
const Message = require("../../../entites/message");

class MysqlMessageRepository extends MessageRepository{

    constructor(){
        super()
        this.database = new Database()
        this.databaseInstance = this.database.instance
        this.messageModel = this.database.messageModel
        this.roomModel = this.database.roomModel
    }

    insert( content, userId, roomId ){
        return new Promise( async ( resolve, reject ) => {
            let transaction = await this.databaseInstance.transaction()
            try {
                let message = new Message( uuidv4(), content, userId, roomId )
                console.log( message )
                let result = await this.messageModel.create( message, { transaction } )
                .catch( error => reject( error ) )
                let room = await this.roomModel.findOne( { where : { id : roomId } } )
                await room.addMessage( result, { transaction } )
                await transaction.commit()
                resolve( message )
            }catch( error ){
                await transaction.rollback()
                reject( error )
            }
        })
    }

    getMessagesByRoomId( roomId ){
        return new Promise( async ( resolve ) => {
            let room = await this.roomModel.findOne( { where : { id: roomId } } )
            let messages = await room.getMessages()
            messages = messages.map( message => message.toJSON() )
            resolve( messages )
        })
    }
}

module.exports = new MysqlMessageRepository()