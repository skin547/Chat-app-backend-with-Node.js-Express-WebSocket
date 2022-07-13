const { v4: uuidv4 } = require("uuid")
const Room = require("../../../entites/room")
const RoomRepository = require("./roomRepository")
const Database = require("../../orm/database.js")

class MysqlRoomRepository extends RoomRepository {

    constructor(){
        super()
        let database = new Database()
        this.databaseInstance = database.instance
        this.roomModel = database.roomModel
        this.userModel = database.userModel
        this.roomUserModel = database.roomUserModel
    }

    insert( name, users ){
        return new Promise( async ( resolve, reject ) => {
            let transaction = await this.databaseInstance.transaction()
            try{
                let newRoom = new Room( uuidv4(), users, name )
                let result = await this.roomModel.create( { id: newRoom.id, name: newRoom.name }, { transaction } )
                let userslist = await this.userModel.findAll( { where : { id : users } } )
                await result.setUsers( userslist, { transaction } )
                await transaction.commit()
                resolve( newRoom )
            }catch( error ){
                await transaction.rollback()
                reject( error )
            }
        })
    }

    getRoomById( id ){
        return new Promise( async ( resolve,reject ) => {
            try{
                let result = await this.roomModel.findOne( { where:{ id: id } })
                .catch( error => reject( error ) )
                if( result === null ) return resolve( {} )
                let room = result.toJSON()
                let users = await result.getUsers()
                users = users.map( user => user.toJSON() )
                let roomInstance = new Room( room.id, users, room.name )
                resolve( roomInstance )
            }catch( error ){
                reject( error )
            }
        })
    }

    getRoomsByUserId( userId ){
        throw new Error("Implement later")
    }

    removeRoomById( id ){
        return new Promise( async ( resolve, reject ) => {
            this.roomModel.destroy( {
                where:{ id: id }
            })
            .then( res => resolve( { result:"remove success" } ) )
            .catch( error => reject(error) )
        })
    }

    removeRoomByName( name ){
        return new Promise( async ( resolve, reject ) => {
            this.roomModel.destroy( {
                where:{ name: name }
            })
            .then( res => resolve( { result:"remove success" } ) )
            .catch( error => reject(error) )
        })
    }
}

module.exports = new MysqlRoomRepository()