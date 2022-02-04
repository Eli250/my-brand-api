import request from "supertest";
import { expect, use } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";
import "dotenv/config";

use(chaiHttp);

describe("QUERIES END-POINT-TEST", () => {
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
    const res = await request(app).get("/api/v1/queries");
    expect(res).to.have.status([200]);
    expect(res.type).to.have.equal("application/json");
  });
  it("Should Get One Querie", async () => {
    const res = await request(app).get(
      "/api/v1/queries/61fd3b7b68361dcc6dd80395"
    );
    expect(res).to.have.status([200]);
  });
  it("Should Not Get Any Query", async () => {
    const res = await request(app).get("/api/v1/queris");
    expect(res).to.have.status([404]);
  });
});
