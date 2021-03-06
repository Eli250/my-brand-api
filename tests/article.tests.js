import request from "supertest";
import { expect, use } from "chai";
import chaiHttp from "chai-http";
import { before } from "mocha";
import app from "../src/app";
import User from "../src/models/user";
import Article from "../src/models/article";
import "dotenv/config";
import { hashPassword } from "../src/helpers/passwordSecurity";

use(chaiHttp);
let tempArticle = {
  title: "Temp Art!",
  content: "This saves temp article.",
};
let ATest1;
let ATest2;
let tempUser;
let tempToken = "";

describe("ARTICLE END-POINT TESTING", () => {
  before("POPULATE TEST", (done) => {
    const user = {
      username: "Admin",
      email: "admin@test.com",
      password: hashPassword("@Admin123"),
    };

    new User(user).save();

    const createArticle = async function () {
      const testArticle1 = Article({
        title: "Testing Article1!",
        content: "This checks if we are able to create the new article.",
      });

      const setArticle1 = async function () {
        ATest1 = await testArticle1.save();
      };
      await setArticle1();
    };

    createArticle();

    const createArticle2 = async function () {
      const testArticle2 = Article({
        title: "Test2",
        content: "This checks if we are able to create the new article.",
      });

      const setArticle2 = async function () {
        ATest2 = await testArticle2.save();
      };
      await setArticle2();
    };

    createArticle2();
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
  it("Should Allow Create Article.", (done) => {
    request(app)
      .post("/api/v1/articles")
      .set("Authorization", tempToken)
      .attach("image", "./public/Victor Status.png", "status.png")
      .field(tempArticle)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  it("Should Not Allow Create Article.", (done) => {
    request(app)
      .post("/api/v1/articles")
      .send(tempArticle)
      .expect(401)
      .then((res) => {
        expect(res.status).to.be.eql(401);
        done();
      })
      .catch((err) => done(err));
  });
  it("Should Get All Articles", async () => {
    const res = await request(app).get("/api/v1/articles");
    expect(res).to.have.status([200]);
    expect(res.type).to.have.equal("application/json");
  });
  it("Should Get One Article", async () => {
    const res = await request(app).get(`/api/v1/articles/${ATest1._id}`);
    expect(res).to.have.status([200]);
  });
  it("Should Not Get Any Article", async () => {
    const res = await request(app).get(`/api/v1/aritcle/${ATest1._id}`);
    expect(res).to.have.status([404]);
  });

  after("AFTER CLEAR POST DATA", (done) => {
    Article.deleteMany({}, (err) => {
      done();
    });
  });
});
