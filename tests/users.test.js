import { expect, use } from "chai";
import request from "supertest";
import chaiHttp from "chai-http";
import app from "../src/app";
import User from "../src/models/user";
import "dotenv/config";

use(chaiHttp);

describe("USER END-POINT-TEST", (done) => {
  before("BEFORE ALL TEST", async () => {
    const res = await request(app).post("/api/v1/user/register").send({
      username: "mocker",
      email: "mocker@test.com",
      password: "@Test123",
    });
    expect(res).to.have.status([201]);
  });

  it("Should Create User", async () => {
    const res = await request(app).post("/api/v1/user/register").send({
      username: "@Test123",
      email: "user1@test.com",
      password: "@Test123",
    });
    expect(res).to.have.status([201]);
  });

  it("Log In Succceed", (done) => {
    request(app)
      .post("/api/v1/user/login")
      .send({
        email: "mocker@test.com",
        password: "@Test123",
      })
      .expect(200)
      .then((res) => {
        expect(res.body.message).to.be.eql("Successfully Logged In!");
        done();
      })
      .catch((err) => done(err));
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
  it("Log In Fail (Invalid Credentials)", (done) => {
    request(app)
      .post("/api/v1/user/login")
      .send({
        email: "tester@test.com",
        password: "@Tes",
      })
      .then((res) => {
        expect(res.body.message).to.be.eql("Invalid Credentials!");
        done();
      })
      .catch((err) => done(err));
  });
  after("AFTER CLEAR USER", (done) => {
    User.deleteMany({}, (err) => {
      console.log("success");
      done();
    });
  });
});
