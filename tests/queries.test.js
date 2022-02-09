import { expect, use } from "chai";
import request from "supertest";
import chaiHttp from "chai-http";
import app from "../src/app";
import "dotenv/config";
import User from "../src/models/user";
import Query from "../src/models/query";
import { hashPassword } from "../src/helpers/passwordSecurity";
import { generateToken } from "../src/helpers/jwtFunctions";
use(chaiHttp);

let queryTest;

let queryTest2;
let tempToken = "";

describe("QUERY END-POINT-TEST", () => {
  before("POPULATE QUERY", (done) => {
    const user = {
      username: "Admin",
      email: "admin@test.com",
      password: hashPassword("@Admin123"),
    };

    new User(user).save();
    tempToken = `Bearer ${generateToken({ id: user._id })}`;

    const createQuery1 = async function () {
      const query1 = Query({
        senderName: "user",
        message: "Test query message",
        email: "test@test.com",
      });

      const setQueryTest = async function () {
        queryTest = await query1.save();
      };
      await setQueryTest();
    };

    createQuery1();

    const createQuery2 = async function () {
      const query2 = Query({
        senderName: "Another One",
        message: "Test query message",
        email: "test@test.com",
      });

      const setQueryTest2 = async function () {
        queryTest2 = await query2.save();
      };

      await setQueryTest2();
    };

    createQuery2();
    done();
  });

  it("Query Creation Succeed!", (done) => {
    request(app)
      .post("/api/v1/queries")
      .send({
        senderName: "New User",
        message: "Test query message create",
        email: "me@you.com",
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it("Should Get All Queries", (done) => {
    request(app)
      .get("/api/v1/queries")
      .set("Authorization", tempToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  it("Should Get One Query", async () => {
    const res = await request(app)
      .get(`/api/v1/queries/${queryTest._id}`)
      .set("Authorization", tempToken);
    expect(res).to.have.status([200]);
  });
  it("Should Fail To Create Query", (done) => {
    request(app)
      .post("/api/v1/queries")
      .send({
        senderName: "New User",
        message: "Test query message create",
      })
      .end((err, res) => {
        expect(res.body.message).to.equal(
          "Please check your input: email is required"
        );
        done();
      });
  });
  it("Should Fail To get All Queries", (done) => {
    request(app)
      .get("/api/v1/querie")
      .set("Authorization", tempToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });
  it("Should Fail (Anauthorized)", (done) => {
    request(app)
      .get("/api/v1/queries")
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });
  it("Should Fail To Get One Query (Anauthorized)", async () => {
    const res = await request(app).get(`/api/v1/queries/${queryTest._id}`);
    expect(res).to.have.status([401]);
  });
  after("AFTER ALL QUERY TEST", (done) => {
    Query.deleteMany({}, (err) => {
      done();
    });
  });
});
