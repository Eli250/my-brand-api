import request from "supertest";
import { expect, use } from "chai";
import chaiHttp from "chai-http";
import { before } from "mocha";
import app from "../src/app";
import "dotenv/config";

use(chaiHttp);

const testArticle = {
  title: "This is a testing article!",
  content: "This checks if we are able to create the new article.",
};

let tempToken = "";
describe("ARTICLE END-POINT TESTING", () => {
  before("Log In First", (done) => {
    request(app)
      .post("/api/v1/user/login")
      .send({
        email: "hirwa7@test.com",
        password: "@Password1",
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
      .field(testArticle)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  it("Should Not Allow Create Article.", (done) => {
    request(app)
      .post("/api/v1/articles")
      .send(testArticle)
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
    const res = await request(app).get(
      "/api/v1/articles/61f42201beffd6aaf5a96956"
    );
    expect(res).to.have.status([200]);
  });
  it("Should Not Get Any Article", async () => {
    const res = await request(app).get("/api/v1/aritcle/");
    expect(res).to.have.status([404]);
  });
});
