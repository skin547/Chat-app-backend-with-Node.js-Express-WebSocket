const chai = require('chai')
const expect = chai.expect

const Room = require("../src/entites/room")

describe( "Test Room", () => {

    let roomInstance

    before( () => {
        let roomId = 1
        let roomName = "test room"
        let users = [ { name: "memberA", email: "guestA@guest.com" },
                      { name: "memberB", email: "guestB@guest.com" } ]
        roomInstance = new Room( roomId, users, roomName )
    })
    
    it( "can add new user into room", () => {
        let newMember = {
            name: "memberC",
            email: "guestC@guest.com",
        } 
        roomInstance.addUser( newMember )
        expect( roomInstance.getUsers().length ).to.equal(3)
    })

    it( "can add new message into room", () => {
        let message = "new message"
        roomInstance.addMessages( message )
        expect( roomInstance.getMessages().length ).to.equal(1)
    })
})