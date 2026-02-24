const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("POST /api/articles/:article_id/comments", () => {
  test("201: responds with the posted comment", () => {
    const newComment = { username: "icellusedkars", body: "Great article!" };

    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toMatchObject({
          author: "icellusedkars",
          body: "Great article!",
          article_id: 1,
          comment_id: expect.any(Number),
          votes: 0,
          created_at: expect.any(String),
        });
      });
  });

  test("400: responds with error if missing username or body", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ username: "icellusedkars" }) // missing body
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Missing username or body");
      });
  });

  test("400: responds with error if article_id is invalid", () => {
    return request(app)
      .post("/api/articles/not-a-number/comments")
      .send({ username: "icellusedkars", body: "Test" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid article ID");
      });
  });
});
