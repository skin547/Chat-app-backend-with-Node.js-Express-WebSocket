const express = require('express')

const itemRouter = require("./framework/web/router/itemRouter")

const app = express()

app.use( express.urlencoded( { extended : true } ) )
app.use( express.json() )
app.use('/items', itemRouter)

const port = 3000

module.exports = app.listen( port, () => console.log( "starting server" ) );