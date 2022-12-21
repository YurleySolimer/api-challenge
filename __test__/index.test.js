const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/index");

chai.should();
chai.use(chaiHttp);

describe('Tasks API', () => {

    /**
     * Test Get files/list
     */

    describe("GET /files/list", () => {
        it("It should GET all the files", (done) => {
            chai.request(server)
                .get("/files/list")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                });
        });

    });


    /**
     * Test to get files/data
     */
    
    describe("GET /files/data", () => {
        it("It should GET all formatted files", (done) => {
            const taskId = 1;
            chai.request(server)                
                .get("/files/data")
                .end((err, response) => {
                    console.log('response', response.body)
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.map((res) => {
                        res.should.have.property('file');
                        res.should.have.property('lines');   
                    })                
                done();
                });
        });

        it("It should GET a formatted file by name", (done) => {
            chai.request(server)                
                .get("/files/data?fileName=test2.csv")
                .end((err, response) => {
                    console.log('response', response.body)
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body[0].should.have.property('file');
                    response.body[0].should.have.property('lines');   
                done();
                });
        });

        it("It should NOT GET a formatted file by name", (done) => {
            chai.request(server)                
                .get("/files/data?fileName=testj.csv")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

    });
});