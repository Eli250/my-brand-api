import { expect, request, use } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";
import User from "../src/models/user";
import { hashPassword } from "../src/helpers/passwordSecurity";
import "dotenv/config";

use(chaiHttp);

describe("USER END-POINT-TEST", () => {
  before("BEFORE ALL TEST", async () => {
    const user = {
      username: "Tester",
      email: "tester@test.com",
      password: hashPassword("@Test123"),
    };

    await new User(user).save();
  });

  it("Should Create User", (done) => {
    request(app)
      .post("/api/v1/user/register")
      .send({
        username: "@Test123",
        email: "user1@test.com",
        password: "@Test123",
      })
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
  it("Log In Succceed", (done) => {
    request(app)
      .post("/api/v1/user/login")
      .send({
        email: "tester@test.com",
        password: "@Test123",
      })
      .then((res) => {
        expect(res.body.message).to.be.eql("Successfully Logged In!");
        done();
      })
      .catch((err) => done(err));
  });
  it("Log In Fail (Invalid Credentials)", (done) => {
    request(app)
      .post("/api/v1/user/login")
      .send({
        email: "tester@test.com",
        password: "@Tes",
      })
      .then((res) => {
        expect(res.body.message).to.be.eql("Invalid credentials!");
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
