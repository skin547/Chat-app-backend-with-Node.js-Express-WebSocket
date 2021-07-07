module.exports = class GetRoomUseCase {

    constructor( roomRepository ){
        if( !roomRepository && !roomRepository instanceof RoomRepository ) throw new Error( "Not giving roomRepository" )
        this.roomRepository = roomRepository
    }

    async getAllByUserId( userId ){
        let result = await this.roomRepository.getRoomsByUserId( userId )
        return result
    }

    async byId( id ) {
        let result = await this.roomRepository.getRoomById( id )
        return result
    }

    async byUserId( userId ){
        let result = await this.roomRepository.getRoomsByUserId( userId )
        return result
    }
}