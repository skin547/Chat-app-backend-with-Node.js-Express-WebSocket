module.exports = class AddRoomUseCase {

    constructor( roomRepository ){
        if( !roomRepository && !roomRepository instanceof RoomRepository ) throw new Error( "Not giving roomRepository" )
        this.roomRepository = roomRepository
    }

    execute( users, name ) {
        return new Promise( async ( resolve, reject ) => {
            try {
                if( name === undefined && users instanceof Array ){
                    let name_array = []
                    users.map( user => name_array.push(user.name))
                    name = name_array.join(", ")
                }
                let data = await this.roomRepository.insert( users, name )
                resolve( data )
            } catch( error ){
                reject( error )
            }
        })
    }
}