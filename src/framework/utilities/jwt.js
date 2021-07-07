const jwt = require("jsonwebtoken")

function sign( payload, secretKey, options ){
    return jwt.sign( payload, secretKey, options )
}

function verify( token, secretKey ){
    return jwt.verify( token, secretKey )
}

module.exports = { sign, verify }