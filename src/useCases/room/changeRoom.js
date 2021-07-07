module.exports = class ChangeRoomUseCase {

    constructor( roomRepository ){
        if( !roomRepository && !roomRepository instanceof RoomRepository ) throw new Error( "Not giving roomRepository" )
        this.roomRepository = roomRepository
    }

    withMessage( id, message ) {
        return new Promise( async ( resolve, reject ) => {
            try {
                let roomInstance = await this.roomRepository.getRoomById( id )
                roomInstance.addMessages( message )
                let result = await this.roomRepository.updateRoomById( roomInstance.id, roomInstance )
                resolve( result )
            } catch( error ){
                reject( error )
            }
        })
    }

    withUsers( id, users ){
        return new Promise( async ( resolve, reject ) => {
            try {
                let roomInstance = await this.roomRepository.getRoomById( id )
                if( users instanceof Array ){
                    users.forEach( user => roomInstance.addUser( user ) )
                } else {
                    roomInstance.addUser( users )
                }
                let result = await this.roomRepository.updateRoomById( roomInstance.id, roomInstance )
                resolve( result )
            } catch( error ){
                reject ( error )
            }
        })
    }
}