const WebSocket = require("ws")
const ClientRepository = require("../../repository/client/mockClientRepository")

module.exports = (options) => {
    
    const webSocketServer = new WebSocket.Server( options )
    const clientRepository = ClientRepository

    webSocketServer.on( "connection", async (connection, token) => {

        let client = await clientRepository.insert( token.id, connection )
        client.send( `Hi ${token.name}, here's your id ${token.id}` )

        connection.on("message", async ( message ) => {
            data = JSON.parse( message ).data
            console.log( data )
            try {
                let destinationConnection = await clientRepository.getConnection( data.to )
                destinationConnection.send( data.message )
            } catch( error ){
                console.log( error )
                connection.send( error )
            }
        })
    })
    

    return webSocketServer
}