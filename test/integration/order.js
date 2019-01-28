const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
const server = "localhost:8080";

describe("GET /", () => {
    it("should return 404 for Non configured Urls", done => {
        chai
            .request(server)
            .get("/")
            .end(function(err, res) {
                expect(res).to.have.status(404);
                done();
            });
    });
});

describe("/POST orders", () => {
    it("should return 500 with invalid format", done => {
        chai
            .request(server)
            .post("/orders")
            .send({
                origin: ["98", "77.111761"],
                destination: ["28.530264", "77.111761"]
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it("should create order with valid request", done => {
        chai
            .request(server)
            .post("/orders")
            .send({
                origin: ["28.58484", "77.111761"],
                destination: ["28.530264", "77.111761"]
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
                data = res;
            });
    });

    it("should return response status UNASSIGNED for new order", done => {
        chai
            .request(server)
            .post("/orders")
            .send({
                origin: ["28.530264", "77.111761"],
                destination: ["28.530264", "77.111761"]
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.be.equal("UNASSIGNED");
                done();
            });
    });
});

describe("/PATCH /orders/:id", () => {
    it("should return error for order not found", done => {
        chai
            .request(server)
            .patch("/orders/9999")
            .send({
                status: "taken"
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it("should return 500 for bad format", done => {
        chai
            .request(server)
            .post("/orders")
            .send({
                origin: ["28.530264", "77.111761"],
                destination: ["28.530264", "77.111761"]
            })
            .end((err, res) => {
                chai
                    .request(server)
                    .patch("/orders/" + res.body.id)
                    .send({
                        wrong_parm: "INVALID_STATUS"
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        done();
                    });
            });
    });
    it("should return success for updating status to taken", done => {
        chai
            .request(server)
            .post("/orders")
            .send({
                origin: ["28.530264", "77.111761"],
                destination: ["28.530264", "77.111761"]
            })
            .end((err, res) => {
                chai
                    .request(server)
                    .patch("/orders/" + res.body.id)
                    .send({
                        status: "TAKEN"
                    })
                    .end((err, result) => {
                        expect(result).to.have.status(200);
                        done();
                    });
            });
    });
});

describe("GET /", () => {
    it("should return maximum two orders (limit=2)", done => {
        chai
            .request(server)
            .get("/orders?page=1&limit=2")
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body.items.results).to.have.length(2);
                done();
            });
    });

    it("should return wrong page datatype error with (page=abc)", done => {
        chai
            .request(server)
            .get("/orders?page=abc&limit=1")
            .end(function(err, res) {
                expect(res).to.have.status(500);
                done();
            });
    });
});
