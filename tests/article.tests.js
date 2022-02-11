import request from "supertest";
import { expect, use } from "chai";
import chaiHttp from "chai-http";
import { before } from "mocha";
import app from "../src/app";
import User from "../src/models/user";
import Article from "../src/models/article";
import { ArticleServices } from "../src/services/articleServices";
import "dotenv/config";

use(chaiHttp);

let ATest1;
let ATest2;
let tempToken = `Bearer ${process.env.TEST_TOKEN}`;

describe("ARTICLE END-POINT TESTING", () => {
  beforeEach("POPULATE TEST", (done) => {
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

  it("Should Allow Create Article.", (done) => {
    const tempArticle = {
      title: "Multer",
      content: "This saves temp article.",
    };
    request(app)
      .post("/api/v1/articles")
      .set("Authorization", tempToken)
      .attach("image", "./public/VictorStatus.png", "status.png")
      .field(tempArticle)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });
  it("Should Not Create Article. Missing Field.", (done) => {
    request(app)
      .post("/api/v1/articles")
      .set("Authorization", tempToken)
      .attach("image", "./public/VictorStatus.png", "status.png")
      .field({
        title: "This is my title",
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
  it("Should Not Allow Create Article.", (done) => {
    request(app)
      .post("/api/v1/articles")
      .send({ title: "Temp Art!", content: "This saves temp article." })
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
  it("Should Update an Article", async () => {
    const res = await request(app)
      .patch(`/api/v1/articles/${ATest1._id}`)
      .set("Authorization", tempToken)
      .send({
        title: "Testing Article1!",
        content: "This checks if we are able to create the new article.",
      });
    expect(res).to.have.status([201]);
  });
  it("Should Fail to Update an Article", async () => {
    const res = await request(app)
      .patch(`/api/v1/articles/${ATest2._email}`)
      .set("Authorization", tempToken)
      .send({
        title: "Testing Article1!",
        content: "This checks if we are able to create the new article.",
      });
    expect(res).to.have.status([404]);
  });

  it("Should Add Comment", async () => {
    const res = await request(app)
      .post(`/api/v1/articles/${ATest1._id}/comments`)
      .send({
        sender: "Hirwa",
        comment: "That really worlks!",
      });
    expect(res).to.have.status([201]);
  });
  it("Should Fail to Add Comment Wrong URL", async () => {
    const res = await request(app)
      .post(`/api/v1/articles/${ATest1._id}/comme`)
      .send({
        sender: "Hirwa",
        comment: "That really worlks!",
      });
    expect(res).to.have.status([404]);
  });
  it("Should Fail to Add Comment If Any Field Is Empty", async () => {
    const res = await request(app)
      .post(`/api/v1/articles/${ATest1._id}/comments`)
      .send({
        sender: "",
        comment: "That really worlks!",
      });
    expect(res).to.have.status([400]);
  });
  it("Should Fail to Add Comment (No article found)", async () => {
    const res = await request(app).post(`/api/v1/articles/comments`).send({
      sender: "Hirwa",
      comment: "That really worlks!",
    });
    expect(res).to.have.status([404]);
  });
  it("Should Get Comments", async () => {
    const res = await request(app).get(
      `/api/v1/articles/${ATest1._id}/comments`
    );
    expect(res).to.have.status([200]);
  });
  it("Should Not Get Comments For Wrong Article ID", async () => {
    const res = await request(app).get(
      `/api/v1/articles/${ATest1._i}/comments`
    );
    expect(res).to.have.status([404]);
  });
  it("Should Not Get Any Article", async () => {
    const res = await request(app).get(`/api/v1/aritcle/${ATest1._id}`);
    expect(res).to.have.status([404]);
  });
  it("Should Delete an Article", async () => {
    const res = await request(app)
      .delete(`/api/v1/articles/${ATest1._id}`)
      .set("Authorization", tempToken);
    expect(res).to.have.status([404]);
  });
  after("AFTER CLEAR POST DATA", (done) => {
    Article.deleteMany({}, (err) => {
      done();
    });
  });
});
