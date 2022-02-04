import { expect, request, use } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";
import "dotenv/config";
import supertest from "supertest";

use(chaiHttp);
const tempUser = {
  username: "HirwaD",
  email: "hirwa7@test.com",
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

  it("Should not login", (done) => {
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
});
