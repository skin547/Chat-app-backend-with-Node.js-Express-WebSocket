const express = require('express')
const http = require("http")

const apiRouter = require("./framework/web/router/apiRouter")
const app = express()
app.use( express.urlencoded( { extended : true } ) )
app.use( express.json() )
app.use('/api', apiRouter)

const port = 8000

const server = http.createServer( app )

const options =  {noServer: true, path:"/api/chat"}
const webSocket = require("./framework/web/websocket/websocket")
const webSocketServer = webSocket(options)

const jwt = require("./framework/utilities/jwt")
const secretKey = require("../config").authentication.secretkey


server.on('upgrade', (request, socket, head) => {
    try {
        const token = request.url.split('Bearer=')[1]
        const decoded = jwt.verify( token, secretKey )
        console.log( decoded )
        if( decoded ){
            webSocketServer.handleUpgrade(request, socket, head, function done(ws) {
                webSocketServer.emit('connection', ws, decoded );
            });
        }
    } catch ( error ) {
        console.log( error )
        socket.destroy();
        return;
    }
})


module.exports = server.listen( port, () => console.log( `server running on port ${port}`) )

// demo message for websocket
// {
//     "data":{
//         "from":1,
//         "to":2,
//         "message":"Hey I'm 1"
//     }
// }