import { expect, use } from "chai";
import request from "supertest";
import chaiHttp from "chai-http";
import app from "../src/app";
import "dotenv/config";
import User from "../src/models/user";
import Query from "../src/models/query";
import { hashPassword } from "../src/helpers/passwordSecurity";

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

    const createQuery1 = async function () {
      const query1 = Query({
        senderName: "user",
        message: "Test query message",
        email: "test@test.com",
        location: "Kigali",
      });

      const setQueryTest = async function () {
        queryTest = await query1.save();
      };
      await setQueryTest();
    };

    createQuery1();

    const createQuery2 = async function () {
      const query2 = Query({
        sender: {
          name: "sender name",
          email: "testtest@test.com",
        },
        message: "Test query message",
        location: "testLocation",
      });

      const setQueryTest2 = async function () {
        queryTest2 = await query2.save();
      };

      await setQueryTest2();
    };

    createQuery2();
    done();
  });
  it("Should Log In First", (done) => {
    request(app)
      .post("/api/v1/user/login")
      .send({
        email: "admin@test.com",
        password: "@Admin123",
      })
      .expect(200)
      .then((res) => {
        expect(res.body.message).to.be.eql("Successfully Logged In!");
        tempToken = `Bearer ${res.body.accessToken}`;
        done();
      })
      .catch((err) => done(err));
  });
  it("QUERY SHOULD BE CREATED", (done) => {
    request(app)
      .post("/api/v1/queries")
      .send({
        senderName: "New User",
        message: "Test query message create",
        email: "me@you.com",
        location: "Kigali",
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it("SHOULD GET ALL QUERIES", (done) => {
    request(app)
      .get("/api/v1/queries")
      .set("Authorization", tempToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it("GET QUERY SHOULD FAIL", (done) => {
    request(app)
      .get("/api/v1/querie")
      .set("Authorization", tempToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });

  it("SHOULD GET ONE QUERY", (done) => {
    request(app)
      .get(`/api/v1/queries/${queryTest2._id}`)
      .set("Authorization", tempToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it("SHOULD DELETE ONE QUERY", (done) => {
    request(app)
      .delete(`/api/v1/queries/${queryTest._id}`)
      .set("Authorization", tempToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  after("AFTER ALL QUERY TEST", (done) => {
    Query.deleteMany({}, (err) => {
      done();
    });
  });
});
