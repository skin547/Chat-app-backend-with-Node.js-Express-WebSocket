let expect = require('chai').expect

let AddRoomUseCase = require("../src/useCases/room/addRoom")
let GetRoomUseCase = require("../src/useCases/room/getRoom")
let ChangeRoomUseCase = require("../src/useCases/room/changeRoom")
let MockRoomRepo = require("../src/framework/repository/room/mockRoomRepository")

describe( "Room user usecase", () => {

    before( () => {
        roomRepo = MockRoomRepo
        addRoom = new AddRoomUseCase( roomRepo )
        getRoom = new GetRoomUseCase( roomRepo )
        changeRoom = new ChangeRoomUseCase( roomRepo )
    })

    describe("Add room use case", () => {
        it("can create a new room", async () => {
            const users = [ 
                { id: 1, name :"frank"},
                { id: 2, name : "lisa" } ]
            const name = "frank, lisa"
            const result = await addRoom.execute( users, name )
            expect( result.name ).to.be.equal( "frank, lisa" )
        })
    })

    describe("Change room use case", () => {
        it("can add message to a room", async () => {
            const newMessage = "Hello world"
            const result = await changeRoom.withMessage( 1, newMessage )
            expect( result.messages.length ).to.equal( 1 )
            expect( result.messages[ result.messages.length - 1 ] ).to.equal( "Hello world" )
        })

        it("can add a user to a room", async () => {
            const newUser = {
                id: 3,
                name : "josh",
            }
            const result = await changeRoom.withUsers( 1, newUser )
            expect( result.users.length ).to.equal( 3 )
            expect( result.users[ result.users.length - 1 ].name ).to.equal( "josh" )
        })
        
        it("can add multiple users to a room", async () => {
            const users = [
                { id: 4, name : "alice" },
                { id: 5, name : "john" },
                { id: 6, name : "bob" } ]
            const result = await changeRoom.withUsers( 1, users )
            expect( result.users.length ).to.equal( 6 )
            expect( result.users[ result.users.length - 1 ].name ).to.equal( "bob" )
        })
    })

    describe("Get room use case", () => {
        it("can get room a user has participated in", async () => {
            const user = {
                id : 1,
                name : "frank",
            }
            const rooms = await getRoom.byUserId( user.id )
            expect( rooms ).to.be.an('array')
            expect( rooms.length ).to.equal( 1 )
        })
    })

})