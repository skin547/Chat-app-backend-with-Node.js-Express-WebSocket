let expect = require('chai').expect

let AddUserUseCase = require("../src/useCases/user/addUser")
let GetUserUseCase = require("../src/useCases/user/getUser")
let MockUserRepository = require("../src/framework/repository/user/mockUserRepository")

describe( "User usecase", () => {

    before( () => {
        userRepo = MockUserRepository
        addUser = new AddUserUseCase( userRepo )
        getUser = new GetUserUseCase( userRepo )
    })

    describe( "Add user usecase ", () => {
        it( "should create user instance and insert it into repository", async () => {
            let userName = "test"
            let email = "test@test.com"
            let password = "test123"
            addUser.execute( userName, email, password )
            .then( res => expect( res.name ).to.equal( userName ) )
            .catch( error => error )
            // expect( actual.name ).to.be.equal( userName )
        })

        it( "should throw error when inserting user with existing email ", async () => {
            let userName = "test2"
            let email = "already@exist.com"
            let password = "test123"
            let actual = await addUser.execute( userName, email, password ).catch( error => error )
            expect( actual.error ).to.equal( "email already exist" )
        })
    })

    describe( "Get user usecase", () => {
        it("should return user instance with email and does not have password", async () => {
            let email = "already@exist.com"
            let expectedName = "test"
            let user = await getUser.byEmail( email )
            expect( user.name ).to.equal( expectedName )
            expect( user ).to.not.have.property( "password" )
        })

        it("should return user instance with id and does not have password", async () => {
            let id = 2
            let user = await getUser.byId( id )
            expect( user.id ).to.equal( 2 )
            expect( user ).to.not.have.property( "password" )
        })
    } )
})