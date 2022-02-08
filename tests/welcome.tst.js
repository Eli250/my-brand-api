import request from "supertest";
import { expect, use } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";
import "dotenv/config";

use(chaiHttp);

describe("TEST WELCOME PAGE", () => {
  it("Should get welcome page.", async () => {
    const res = await request(app).get("/");
    expect(res.body.message).to.be.eql("Welcome to my the API");
  });
});
