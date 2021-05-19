const chai = require("chai")
const chaiHttp = require('chai-http')
chai.use(chaiHttp);

const expect = chai.expect

const app = require("../src/app")


describe(" test express app", () => {

    let request;

    before( () => {
        request = chai.request(app).keepOpen()

        let numberOfData = 10
        generateTestData( numberOfData, request )
    })

    after( ( ) => {
        request.close();
    })

    describe('/GET items', () => {

        it("should return an array of items ", ( done ) => {
            request
            .get('/items')
            .end((err, response) => {
                expect( response ).to.have.status(200)
                expect( response.body ).to.be.an('array')
                expect( response.body.length ).to.equal( 10 )
            done()
            })
        })

        it("should return an json of item ", ( done ) => {
            let itemId = 1
            request
            .get('/items/' + itemId)
            .end((err, response) => {
                expect( response ).to.have.status(200)
                expect( response.body ).to.be.a('object')
                expect( response.body.id ).to.equal( itemId )
            done()
            })
        })
    })

    describe('/POST items', () => {
        it('it should not POST a book without pages field', (done) => {
            let item = {
                content : "test",
                owner : "Frank"
            }
            
            request
            .post("/items")
            .send(item)
            .end( (err, response) => {
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

generateTestData = ( numberOfData, requester ) => {

    let item = {
        content : "for test",
        owner : "Tester"
    }

    for( let i = 0 ; i < numberOfData ; i++ ){
        requester.post("/items")
        .send( item )
        .end()
    }
}