const winston = require("winston")

let logger
if( process.env.NODE_ENV === 'production' ){
    logger = winston.createLogger({
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
          new winston.transports.File({ filename: 'error.log', level: 'error' }),
          new winston.transports.File({ filename: 'app.log' }),
        ],
      })
} else {
    logger = winston.createLogger({
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
          new winston.transports.Console( { format: winston.format.simple(), } ),
        ],
    })
}

module.exports = logger