const chai = require("chai")
const chaiHttp = require('chai-http')


describe(" test express app", function(){

    const expect = chai.expect
    chai.use(chaiHttp);

    let app
    const apiDomain = "/api"
    const itemEndpoint = apiDomain + "/items"

    this.timeout(10000); 

    let request;

    before( () => {
        app = require("../src/app")
        request = chai.request(app).keepOpen()

        let numberOfData = 10
        generateTestData(itemEndpoint, numberOfData, request )
    })

    after( ( ) => {
        request.close();
        app.close();
    })

    describe('/GET items', () => {

        it("should return an array of items ", ( done ) => {
            request
            .get(itemEndpoint)
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
            .get(itemEndpoint +"/" + itemId)
            .end((err, response) => {
                expect( response ).to.have.status(200)
                expect( response.body ).to.be.a('object')
                expect( response.body.id ).to.equal( itemId )
            done()
            })
        })
    })

    describe('/POST items', () => {
        it('should return an object if created successful', (done) => {
            let item = {
                content : "test",
                owner : "Frank"
            }
            
            request
            .post(itemEndpoint)
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

        it('can handle 10000 of data', async () => {
            let item = {
                content : "strees",
                owner : "tester"
            }

            for( let i = 0 ; i < 10000 ; i++ ){
                await request
                .post(itemEndpoint)
                .send(item)
            }

            request
            .get(itemEndpoint)
            .end( (err, response) => {
                expect( response.body.length - 11).to.equal( 10000 )
            })
        })
    });
  
})

generateTestData = (itemEndpoint, numberOfData, requester ) => {

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