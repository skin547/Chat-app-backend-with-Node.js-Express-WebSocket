const Room = require("../../../entites/room")
const RoomRepository = require("./roomRepository");

class MockRoomRepository extends RoomRepository {

    constructor(){
        super()
        this.currentId = 1
        this.rooms = {}
        this.mappingTable = {}
    }

    insert( users, name ){
        return new Promise( ( resolve ) => {
            let newRoom = new Room( this.currentId, users, name )
            this.rooms[ newRoom.id ] = newRoom
            for( let index in users ){
                let userId = users[index].id
                this.mappingTable[userId] = newRoom.id
            }
            this.currentId = this.currentId + 1
            console.log( this.rooms )
            console.log( this.mappingTable )
            resolve( newRoom )
        })
    }

    getRoomById( id ){
        return new Promise( ( resolve,reject ) => {
            if( this.rooms[id] ){
                resolve( this.rooms[id] )
            }else{
                reject(new Error( "user not found"))
            }
        })
    }

    getRoomsByUserId( userId ){
        return new Promise( ( resolve ) => {
            let rooms = []
            for( let index in this.mappingTable ){
                if( Number(index) === Number(userId) ){
                    let roomId = this.mappingTable[index]
                    rooms.push( this.rooms[roomId] )
                }
            }
            resolve( rooms )
        })
    }

    updateRoomById( id, roomInstance ){
        return new Promise( (resolve) => {
            if( this.rooms[id] ){
                this.rooms[id] = roomInstance
                roomInstance.users.forEach( user => this.mappingTable[user.id] = roomInstance.id )
                resolve( this.rooms[id] )
            }else{
                reject(new Error( "user not found"))
            }
        })
    }
}

module.exports = new MockRoomRepository()