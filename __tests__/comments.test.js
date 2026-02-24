const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET/api/articles/:article_id/comments", () => {
  test("200:responds with an array of comments for the given article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.comments)).toBe(true);
        expect(res.body.comments.length).toBeGreaterThan(0);

        res.body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: expect.any(Number),
          });
        });
      });
  });

  test("200: comments are sorted by created_at in DESC order", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        const dates = res.body.comments.map((c) => c.created_at);
        const sorted = [...dates].sort((a, b) => new Date(b) - new Date(a));
        expect(dates).toEqual(sorted);
      });
  });

  test("400: responds with error if article_id is invalid", () => {
    return request(app)
      .get("/api/articles/not-a-number/comments")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid article ID");
      });
  });

  test("200: responds with empty array if article exists but has no comments", () => {
    return request(app)
      .get("/api/articles/2/comments") // use an article that exists but has no comments
      .expect(200)
      .then((res) => {
        expect(res.body.comments).toEqual([]);
      });
  });
});
//Comments delete request tests:
describe("DELETE /api/comments/:comment_id", () => {
  test("204 deletes existing comment", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });

  test("404 when comment does not exist", () => {
    return request(app)
      .delete("/api/comments/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Comment Not Found");
      });
  });

  test("400 when comment_id is invalid", () => {
    return request(app).delete("/api/comments/not-a-number").expect(400);
  });
});
