let chai = require("chai")
let expect = chai.expect
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const MessageRepo = require("../src/framework/repository/message/mysqlMessageRepository")

describe("Room MySQL repository test", function() {
    let messageRepo
    this.timeout(3000);

    before( () => {
        messageRepo = MessageRepo
    })

    after( async () => {
        // await messageRepo.removeRoomByName("Test")
        await messageRepo.databaseInstance.close()
    })

    it("can insert new room into database", async () => {
        const content = "Test Message"
        const userId = "dba675bf-b183-4b1a-83b7-50f6b43fca2f"
        const roomId = "8214c40f-8cc2-4b72-9145-17d46bd83e5f"
        const result = await messageRepo.insert( content, userId, roomId )
        expect( result.content ).to.equal( "Test Message" )
    })

    it("can get messages of a room with roomId", async () => {
        let messages = await messageRepo.getMessagesByRoomId("8214c40f-8cc2-4b72-9145-17d46bd83e5f")
        expect( messages ).to.be.an("array")
    })
})