import request from "supertest";
import { expect, use } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";
import Article from "../src/models/article";
import "dotenv/config";

use(chaiHttp);

const testArticle = {
  title: "This is a testing article!",
  description: "This checks if we are able to create the new article.",
  content: "This is the created article.",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/1175px-Test-Logo.svg.png",
};

describe("ARTICLE END-POINT TESTING", () => {
  it("Should retrieve the articles", async () => {
    const res = await request(app).get("/api/v1/articles");
    expect(res).to.have.status([200]);
    expect(res.type).to.have.equal("application/json");
  });
  it("Should retrieve one article", async () => {
    const res = await request(app).get(
      "/api/v1/articles/61f42201beffd6aaf5a96956"
    );
    expect(res).to.have.status([200]);
    // expect(res.type).to.have.equal("application/json");
  });
  it("Should not retrieve the articles", async () => {
    const res = await request(app).get("/api/v1/aritcle/");
    expect(res).to.have.status([404]);
  });
  it("Should not allow anauthorized access to the article", (done) => {
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
});
