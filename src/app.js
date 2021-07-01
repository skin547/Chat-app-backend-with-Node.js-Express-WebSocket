const express = require('express')
const http = require("http")
const WebSocket = require("ws")

const apiRouter = require("./framework/web/router/apiRouter")

const app = express()

app.use( express.urlencoded( { extended : true } ) )
app.use( express.json() )
app.use('/api', apiRouter)

const port = 8000

const server = http.createServer( app )
const ws = new WebSocket.Server( {server} )

let clients = {}
let id = 1

ws.on( "connection", (connection) => {
    if( !connection.id ){
        connection.id = id
        clients[id] = connection
        connection.send( `here's your id: ${id}` )
        id++
    }
    connection.on("message", ( message ) => {
        data = JSON.parse( message ).data
        console.log( data )
        if( clients[data.to] && clients[data.from] ){
            clients[data.to].send( data.message )
        }else{
            connection.send("user not connect")
        }
    })

})

module.exports = server.listen( port, () => console.log( `server running on port ${port}`) )