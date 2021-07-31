let chai = require("chai")
let expect = chai.expect
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const UserRepo = require("../src/framework/repository/user/mysqlUserRepository.js")

describe("User MySQL repository test", function() {
    let userRepo
    this.timeout(10000);

    before( () => {
        userRepo = UserRepo
    })

    after( async () => {
        await userRepo.removeUserByName("Test")
        await userRepo.databaseInstance.close()
    })

    it("can insert new user into database", async () => {
        let newUser = await userRepo.insert("Test","test@test.com","testestest")
        let user = await userRepo.getUserById( newUser.id )
        expect( user.id ).to.equal( newUser.id )
        expect( user.name ).to.equal( "Test" )
        expect( user.login( "testestest" ) ).to.be.true
    })

    it("can get instance of user with id", async () => {
        let user = await userRepo.getUserById("1")
        expect( user.login( "test1234" ) ).to.be.true
    })

    it("can get instance of user with email", async () => {
        let user = await userRepo.getUserByEmail("frank@frank.com")
        expect( user.login( "test1234" ) ).to.be.true
    })

    it("can remove user from database with id", async () => {
        let newUser = await userRepo.insert("Test","test@test.com","testestest")
        await userRepo.removeUserById( newUser.id )
        expect( userRepo.getUserById( newUser.id ) ).to.be.empty
    })
})