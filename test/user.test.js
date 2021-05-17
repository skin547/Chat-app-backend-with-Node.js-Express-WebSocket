const assert = require('assert').strict

const User = require("../src/entites/user")

describe( "Test user", () => {
    let userId = 1
    let userName = "frank"
    let email = "skin547yo@gmail.com"
    let password = "mypassword"
    let userInstance = new User( userId, userName, email, password )
    
    it( "should return true if login with correct password", () => {
        password = "mypassword"
        assert.equal( userInstance.login( password ), true )
    })
    
    it( "should return false if login with wrong password", () => {
        password = "wrongpassword"
        assert.equal( userInstance.login( password ), false )
    })
})