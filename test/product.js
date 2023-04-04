import request from "supertest";
import app from "../app.js";
import { expect } from "chai";
import config from '../config.test.js';
import mongoose from "mongoose";

describe("GET /product/:productId", function () {
  before(async () => {
    await mongoose.connect(config.MONGO_URI,
      { useNewUrlParser: true });
  });
  after(async () => {
    await mongoose.connection.close();
  });
  it("It should throw an error if it allow an id not supported by mongoDB", function (done) {
    request(app)
      .get("/products/12ds")
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body.errors).to.be.an("array");
        expect(res.body.errors).to.have.lengthOf(1);
        expect(res.body.errors[0].msg).to.equal("Invalid product ID");
        done();
      });
  });
});
