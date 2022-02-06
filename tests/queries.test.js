/*import request from "supertest";
import { expect, use } from "chai";
import chaiHttp from "chai-http";
import User from "../src/models/user";
import app from "../src/app";
import { hashPassword } from "../src/helpers/passwordSecurity";
import "dotenv/config";

use(chaiHttp);

let tempToken = "";

describe("QUERIES END-POINT-TEST", () => {
  before("POPULATE TEST", (done) => {
    const user = {
      username: "Admin",
      email: "admin@test.com",
      password: hashPassword("@Admin123"),
    };

    new User(user).save();
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
  it("Should Allow Create Queries.", (done) => {
    request(app)
      .post("/api/v1/queries")
      .send({
        senderName: "Eli Hirwa",
        email: "hirwaeli@outlook.com",
        message: "We are testing query creation",
      })
      .expect(200)
      .then((res) => {
        expect(res.status).to.be.eql(200);
        done();
      })
      .catch((err) => done(err));
  });
  it("Should Get All Queries", async () => {
    const res = await request(app)
      .get("/api/v1/queries")
      .set("Authorization", tempToken);
    expect(res).to.have.status([200]);
    expect(res.type).to.have.equal("application/json");
  });
  it("Should Get One Querie", async () => {
    const res = await request(app)
      .get("/api/v1/queries/61fd3b7b68361dcc6dd80395")
      .set("Authorization", tempToken);
    expect(res).to.have.status([200]);
  });
  it("Should Not Get Any Query", async () => {
    const res = await request(app).get("/api/v1/queris");
    expect(res).to.have.status([404]);
  });
});
*/
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
      });

      const setQueryTest2 = async function () {
        queryTest2 = await query1.save();
      };
      await setQueryTest2();
    };

    createQuery1();

    const createQuery = async function () {
      const query2 = Query({
        sender: {
          name: "sender name",
          email: "testtest@test.com",
        },
        message: "Test query message",
        location: "testLocation",
      });

      const setQueryTest = async function () {
        queryTest = await query2.save();
      };

      await setQueryTest();
    };

    createQuery();
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
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it("SHOULD GET ALL QUERY", (done) => {
    request(app)
      .get("/api/v1/queries")
      .set("Authorization", tempToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it("SHOULD GET ALL QUERY FAIL", (done) => {
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
      .get(`/api/v1/queries/${queryTest._id}`)
      .set("Authorization", tempToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it("SHOULD DELETE ONE QUERY", (done) => {
    request(app)
      .delete(`/api/v1/queries/${queryTest2._id}`)
      .set("Authorization", tempToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(204);
        done();
      });
  });

  after("AFTER ALL QUERY TEST", (done) => {
    Query.deleteMany({}, (err) => {
      console.log("success");
      done();
    });
  });
});
