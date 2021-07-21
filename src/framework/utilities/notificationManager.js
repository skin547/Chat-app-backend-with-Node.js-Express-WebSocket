class NotificationManager{
    constructor( roomRepository, clientRespotiory ){
        if( !roomRepository ) throw new Error( "Not giving room Repository" )
        if( !clientRespotiory ) throw new Error("Not giving client repository ")
        this.roomRepository = roomRepository
        this.clientRespotiory = clientRespotiory
    }

    async notify( senderId, roomId, message ){
        let room = await this.roomRepository.getRoomById( roomId )
        let subscribers = room.users
        subscribers.forEach( (subscriber) => {
            if( subscriber.id != senderId ){
                console.log( subscriber )
                this.clientRespotiory.getConnection( subscriber.id )
                .then( connection => connection.send( JSON.stringify( message ) ) )
                .catch( error => console.error( error ) )
            }
        })
    }
}

module.exports = NotificationManager