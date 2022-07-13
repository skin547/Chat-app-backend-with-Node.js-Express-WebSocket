module.exports = class GetRoomUseCase {

    constructor( roomRepository ){
        if( !roomRepository && !roomRepository instanceof RoomRepository ) throw new Error( "Not giving roomRepository" )
        this.roomRepository = roomRepository
    }

    async byId( id ) {
        let result = await this.roomRepository.getRoomById( id )
        .catch( error => error )
        return result
    }

    async byUserId( userId ){
        let result = await this.roomRepository.getRoomsByUserId( userId )
        .catch( error => error )
        return result
    }
}