let expect = require('chai').expect

let MessageUseCase = require("../src/useCases/message/message")
let MockMessageRepo = require("../src/framework/repository/message/mockMessageRepository")

describe( "Message use case", () => {

    before( () => {
        messageRepo = MockMessageRepo
        message = new MessageUseCase( messageRepo )
    })

    describe("Message use case", () => {
        it("can create a message", async () => {
            const newMessage = {
                content : "Hello",
                roomId : 1,
                userId : 1
            }
            let messageInstance = await message.create( newMessage.content, newMessage.roomId, newMessage.userId )
            expect( messageInstance ).to.have.property("id")
            expect( messageInstance.content ).to.equal( newMessage.content )
            expect( messageInstance.roomId ).to.equal( newMessage.roomId )
            expect( messageInstance.userId ).to.equal( newMessage.userId )
        })
        
        it("should return messages from a room", async () => {
            const roomId = 1
            let messages = await message.getMessagesByRoomId( roomId )
            console.log( messages )
            expect( messages ).to.be.an('array')
            expect( messages[0].roomId ).to.equal( 1 )
        })
    })
})