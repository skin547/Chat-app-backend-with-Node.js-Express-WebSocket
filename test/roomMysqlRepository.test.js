let chai = require("chai")
let expect = chai.expect
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const RoomRepo = require("../src/framework/repository/room/mysqlRoomRepository")

describe("Room MySQL repository test", function() {
    let roomRepo
    this.timeout(3000);

    before( () => {
        roomRepo = RoomRepo
    })

    after( async () => {
        await roomRepo.removeRoomByName("Test")
        await roomRepo.databaseInstance.close()
    })

    it("can insert new room into database", async () => {
        let users = [ "4f8091d7-1b7c-43f7-8a0b-5c4dd53b4927", "dba675bf-b183-4b1a-83b7-50f6b43fca2f"]
        const name = "Test"
        const result = await roomRepo.insert( name, users )
        expect( result.name ).to.be.equal( "Test" )
        expect( result.users ).to.be.an('array')
        expect( result.users.length ).to.equal(2)
    })

    it("can get instance of room with id", async () => {
        let room = await roomRepo.getRoomById("8214c40f-8cc2-4b72-9145-17d46bd83e5f")
        expect( room ).to.have.property("name")
        expect( room.name ).to.equal("Alice, Bob")
        expect( room ).to.have.property("users")
        expect( room.users ).to.be.an("array")
        expect( room.users.length ).to.equal(2)
    })

    it("should return an empty object with non-existing room's id", async () => {
        let room = await roomRepo.getRoomById("non-exist")
        expect( room ).to.be.empty
    })

    it("can remove room from database with id", async () => {
        let users = [ "4f8091d7-1b7c-43f7-8a0b-5c4dd53b4927", "dba675bf-b183-4b1a-83b7-50f6b43fca2f"]
        const name = "Test"
        const result = await roomRepo.insert( name, users )
        expect( await roomRepo.getRoomById( result.id ) ).not.to.be.empty
        await roomRepo.removeRoomById( result.id )
        expect( await roomRepo.getRoomById( result.id ) ).to.be.empty
    })
})