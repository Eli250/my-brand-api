import { expect, request, use } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";
import "dotenv/config";

use(chaiHttp);

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
});
