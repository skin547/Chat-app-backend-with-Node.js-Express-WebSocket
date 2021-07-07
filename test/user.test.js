// const assert = require('assert').strict
const expect = require("chai").expect

const User = require("../src/entites/user")

describe( "Test user", () => {
    let userId = 1
    let userName = "frank"
    let email = "skin547yo@gmail.com"
    let password = "mypassword"
    let userInstance = new User( userId, userName, email, password )
    
    it( "should return true if login with correct password", () => {
        password = "mypassword"
        expect( userInstance.login( password ) ).to.be.true
    })
    
    it( "should return false if login with wrong password", () => {
        password = "wrongpassword"
        expect( userInstance.login( password ) ).to.be.false
    })
})