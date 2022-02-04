import { expect, request, use } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";
import "dotenv/config";

use(chaiHttp);
const tempUser = {
  username: "HirwaD",
  email: "hirwa8@test.com",
  password: "@Password1",
};
describe("USER END-POINT-TEST", () => {
  it("Should Create User", (done) => {
    request(app)
      .post("/api/v1/user/register")
      .send(tempUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

  it("Should Not Login", (done) => {
    request(app)
      .post("/api/v1/user/login")
      .send({
        email: "test",
        password: "test",
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });
  it("Log In First", (done) => {
    request(app)
      .post("/api/v1/user/login")
      .send({
        email: "hirwa7@test.com",
        password: "@Password1",
      })
      .then((res) => {
        expect(res.body.message).to.be.eql("Successfully Logged In!");
        done();
      })
      .catch((err) => done(err));
  });
});
