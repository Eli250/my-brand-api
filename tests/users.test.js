import { expect, use } from "chai";
import request from "supertest";
import chaiHttp from "chai-http";
import app from "../src/app";
import User from "../src/models/user";
import "dotenv/config";
import { randomEmail } from "./random-email";

use(chaiHttp);

describe("USER END-POINT-TEST", (done) => {
  let email = randomEmail(5) + "@test.com";

  it("Log In Succceed", (done) => {
    request(app)
      .post("/api/v1/user/login")
      .send({
        email: "f3a19@test.com",
        password: "@Tester001",
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
  it("Should Register a User", async () => {
    const res = await request(app).post("/api/v1/user/register").send({
      username: "Tester",
      email: email,
      password: "@Tester001",
    });
    expect(res).to.have.status([201]);
  });
  it("Should Not register a User", async () => {
    const res = await request(app)
      .post("/api/v1/user/register")
      .attach("image", "./public/VictorStatus.png", "status.png")
      .field({
        username: "Tester",
        email: email,
        password: "@Tester001",
      });
    expect(res).to.have.status([500]);
  });
  it("Should Fail to Add Existing User", async () => {
    const res = await request(app).post("/api/v1/user/register").send({
      username: "admin",
      email: "admin@test.com",
      password: "@Tester001",
    });
    expect(res).to.have.status([409]);
  });
});
