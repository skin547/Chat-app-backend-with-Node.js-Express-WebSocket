const express = require('express')
const http = require("http")

const apiRouter = require("./framework/web/router/apiRouter")

const app = express()

app.use( express.urlencoded( { extended : true } ) )
app.use( express.json() )
app.use('/api', apiRouter)

const port = 8000

// module.exports = app.listen( port, () => console.log( "starting server" ) );
const server = http.createServer( app );

module.exports = server.listen( port, () => console.log( `server running on port ${port}`) );