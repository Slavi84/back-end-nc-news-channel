const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");

afterAll(() => db.end());

describe("PATCH /api/articles/:article_id", () => {
  test("200: increments votes", async () => {
    const res = await request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 1 })
      .expect(200);

    expect(res.body.article.votes).toEqual(expect.any(Number));
  });

  test("200: decrements votes", async () => {
    const res = await request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -10 })
      .expect(200);

    expect(res.body.article.votes).toEqual(expect.any(Number));
  });

  test("400: missing inc_votes", async () => {
    await request(app).patch("/api/articles/1").send({}).expect(400);
  });

  test("400: inc_votes not a number", async () => {
    await request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "wrong" })
      .expect(400);
  });

  test("400: invalid article_id", async () => {
    await request(app)
      .patch("/api/articles/notanid")
      .send({ inc_votes: 1 })
      .expect(400);
  });

  test("404: article does not exist", async () => {
    await request(app)
      .patch("/api/articles/999999")
      .send({ inc_votes: 1 })
      .expect(404);
  });
});
