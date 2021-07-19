let chai = require("chai")
let expect = chai.expect
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

let AuthenticationUseCase = require("../src/useCases/user/authentication")
let AddUserUseCase = require("../src/useCases/user/addUser")
let MockUserRepository = require("../src/framework/repository/user/mockUserRepository");

describe( "Authentication usecase", () => {

    before( async () => {
        userRepo = MockUserRepository
        authentication = new AuthenticationUseCase( userRepo )
        addUser = new AddUserUseCase( userRepo )

        let userName = "test"
        let email = "already@exist.com"
        let password = "test123"
        await addUser.execute( userName, email, password )
    })

    describe( "Authentication usecase ", () => {
        it( "can register a jwt with email and password", async () => {
            let user = {
                username: "test",
                email : "already@exist.com",
                password : "test123"
            }
            let result = await authentication.register( user.username, user.email, user.password )
            expect( result ).to.be.an('object')
            expect( result.token.split(".").length ).to.equal( 3 )
        })

        it("should throw error when registering jwt with wrong password", async () => {
            let user = {
                username: "test",
                email : "already@exist.com",
                password : "wrongpassword"
            }
            await expect( authentication.register( user.username, user.email, user.password ) ).to.be.rejectedWith( Error, "authentication failed" )
        })

        it("should throw error when user not found", async () => {
            let user = {
                username: "thisGuyNotExist",
                email : "nonexist@gmail.com",
                password : "nonExistPassword"
            }
            await expect( authentication.register( user.username, user.email, user.password ) ).to.be.rejectedWith( Error, "user not found" )
        })

        it("can verify with jwt", async () => {
            let user = {
                username: "test",
                email : "already@exist.com",
                password : "test123"
            }
            let registerResult = await authentication.register( user.username, user.email, user.password )
            let result = await authentication.verify( registerResult.token )
            expect( result ).to.have.property( "name" )
            expect( result ).to.have.property( "email" )
            expect( result ).to.not.have.property( "password" )
            expect( result ).to.have.property( "iat" )
            expect( result ).to.have.property( "exp" )
        })
    })
})