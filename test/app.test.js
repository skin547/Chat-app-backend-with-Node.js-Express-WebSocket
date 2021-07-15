const chai = require("chai")
const chaiHttp = require('chai-http')

describe("test express app", function(){
    const expect = chai.expect
    chai.use(chaiHttp);

    let app
    let request;
    let testUser
    let testUserToken
    const apiDomain = "/api"
    const itemEndpoint = apiDomain + "/items"
    const userEndpoint = apiDomain + "/users"
    const roomEndpoint = apiDomain + "/rooms"

    this.timeout(10000); 

    before( () => {
        app = require("../src/app")
        request = chai.request(app).keepOpen()
        const user = {
            username : "test",
            email : "test@test.com",
            password: "test1234"
        }
        request
        .post( userEndpoint + "/signup" )
        .send( user )
        .end( ( err, response ) => {
            if( err ){
                throw new Error("Fail when creating test user")
            }
            testUser = response.body
        })
        request
        .post( userEndpoint + "/login" )
        .send( user )
        .end( ( err, response ) => {
            if( err ){
                throw new Error("Fail when creating test user")
            }
            testUserToken = response.body.token
        })
        // testUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InRlc3RlciIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTYyNTU4MzcwNSwiZXhwIjoxNjk4MTU5NzA1fQ.EIZg8S6OMxi2sErDbheQGRCALyub87em-68PXyw4x6M"
        const numberOfData = 10
        generateItemTestData(itemEndpoint, numberOfData, request )
    })

    after( ( ) => {
        request.close();
        app.close();
    })

    describe("/items API", () => {

        describe('GET /items', () => {

            it("should return an array of items ", ( done ) => {
                request
                .get(itemEndpoint)
                .end((err, response) => {
                    if( err ){
                        throw new Error(`test failed :\n ${err}`)
                    }
                    expect( response ).to.have.status(200)
                    expect( response.body ).to.be.an('array')
                    expect( response.body.length ).to.equal( 10 )
                done()
                })
            })
    
            it("should return an json of item ", ( done ) => {
                let itemId = 1
                request
                .get(itemEndpoint +"/" + itemId)
                .end((err, response) => {
                    expect( response ).to.have.status(200)
                    expect( response.body ).to.be.a('object')
                    expect( response.body.id ).to.equal( itemId )
                done()
                })
            })
        })
    
        describe('POST /items', () => {
            it('should return an object if created successful', (done) => {
                let item = { content : "test", owner : "Frank" }
                
                request
                .post(itemEndpoint)
                .send(item)
                .end( (err, response) => {
                    if( err ){
                        throw new Error(`test failed :\n ${err}`)
                    }
                    expect( response ).to.have.status(201)
                    expect( response.body ).to.be.an('object')
                    expect( response.body ).to.have.property('id')
                    expect( response.body ).to.have.property('content')
                    expect( response.body ).to.have.property('owner')
                    expect( response.body ).to.have.property('status')
                    expect( response.body ).to.have.property('createdAt')
                    done()
                })
            });
        });
    })
  
    describe("/rooms API", () => {
        describe('POST /rooms', () => {
            it("should create a room with participated users ", ( done ) => {
                let Alice = { id : 100, name : "Alice", email : "Alice@test.com" }
                let Bob = { id : 200, name : "Bob", email : "Bob@test.com"  }
                const room = { from : Alice, users : [ Alice, Bob ] }
                request
                .post(roomEndpoint)
                .set({ "Authorization": `Bearer ${testUserToken}` })
                .send( room )
                .end((err, response) => {
                    if( err ){
                        throw new Error(`test failed :\n ${err}`)
                    }
                    expect( response ).to.have.status(201)
                    expect( response.body ).to.be.a('object')
                    expect( response.body ).to.have.property("id")
                    expect( response.body ).to.have.property("name")
                    expect( response.body ).to.have.property("users")
                    expect( response.body.users.length ).to.equal( 2 )
                    done()
                })
            })
        })

        describe('GET /rooms', () => {
            it("should return an json of room with room id ", ( done ) => {
                const roomId = 1
                request
                .get(roomEndpoint +"/" + roomId)
                .end((err, response) => {
                    if( err ){
                        throw new Error(`test failed :\n ${err}`)
                    }
                    expect( response ).to.have.status(200)
                    expect( response.body ).to.be.a('object')
                    expect( response.body.id ).to.equal( roomId )
                    done()
                })
            })
        })
    })

    describe("/users API", () => {
        describe(" GET /users", () => {
            describe(" Get /users/:userId/rooms", (done) => {
                it("should return an array of rooms with user id ", ( done ) => {
                    const userId = 100
                    request
                    .get(userEndpoint + "/" + userId + "/rooms")
                    .set({ "Authorization": `Bearer ${testUserToken}` })
                    .end((err, response) => {
                        if( err ){
                            throw new Error(`test failed :\n ${err}`)
                        }
                        console.log( response.body )
                        expect( response ).to.have.status(200)
                        expect( response.body ).to.be.an('array')
                        expect( response.body.length ).to.equal( 1 )
                        expect( response.body[0] ).to.have.property("id")
                        expect( response.body[0] ).to.have.property("name")
                        expect( response.body[0] ).to.have.property("users")
                        expect( response.body[0].users ).to.be.an('array')
                        expect( response.body[0].users[0] ).to.have.property("email")
                        done()
                    })
                })
            })
        })

        describe(" POST /users", () => {
            it("sign up with api/users/signup", (done) => {
                const user = {
                    name : "forUserApiTest",
                    email : "forUserApiTest@test.com",
                    password: "forUserApiTest"
                }
                request
                .post( userEndpoint + "/signup" )
                .send( user )
                .end( ( err, response ) => {
                    if( err ){
                        console.log( err )
                        throw new Error("test failed")
                    }
                    expect( response.status ).to.equal( 201 )
                    expect( response.body ).to.have.property("id")
                    expect( response.body ).to.have.property("name")
                    expect( response.body ).to.have.property("email")
                    expect( response.body ).to.not.have.property("password")
                    done()
                })
            })
    
            it("should return token after login with api/users/login", (done) => {
                const user = {
                    username : "forUserApiTest",
                    email : "forUserApiTest@test.com",
                    password: "forUserApiTest"
                }
                
                request
                .post( userEndpoint + "/login" )
                .send( user )
                .end( ( err, response ) => {
                    if( err ){
                        throw new Error("test failed")
                    }
                    expect( response.status ).to.equal( 200 )
                    expect( response.body ).to.be.a('object')
                    expect( response.body ).to.have.property( "token" )
                    done()
                })
            })
        })
    })
    
    describe("/messages API", () => {
        describe('POST /messages', () => {
            it("will add message into a room", (done) => {
                const roomId = 1
                const message = {
                    from : "frank",
                    to : roomId,
                    message : "hello world"
                }
                request
                .post(roomEndpoint)
                .send(message)
                .end( (err, response) => {
                    expect( response ).to.have.status(201)
                    done()
                })
            })
        })
    })
})

generateItemTestData = (itemEndpoint, numberOfData, requester ) => {

    let item = {
        content : "for test",
        owner : "Tester"
    }

    for( let i = 0 ; i < numberOfData ; i++ ){
        requester.post(itemEndpoint)
        .send( item )
        .end()
    }
}