const request = require("supertest");
const app = require("../app"); // your Express app
const db = require("../db/connection"); // database connection
const { seedArticles } = require("../db/seeds/articles.seed"); // seed function with example articles

// Run before each test: reset database
beforeEach(() => {
  return seedArticles(); // seed with your two example articles
});

// Close DB connection after all tests
afterAll(() => {
  return db.end();
});

describe("GET /api/articles", () => {
  test("should return all articles sorted by created_at DESC by default", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        const articles = res.body.articles;
        expect(articles.length).toBe(2);

        // newest article first (created_at descending)
        expect(new Date(articles[0].created_at)).toBeGreaterThanOrEqual(
          new Date(articles[1].created_at),
        );

        // Each article should have all required fields
        articles.forEach((article) => {
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("body");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("article_img_url");
        });
      });
  });

  test("should sort articles by votes ascending", () => {
    return request(app)
      .get("/api/articles?sort_by=votes&order=asc")
      .expect(200)
      .then((res) => {
        const articles = res.body.articles;
        expect(articles[0].votes).toBeLessThanOrEqual(articles[1].votes);
      });
  });

  test("should sort articles by title descending", () => {
    return request(app)
      .get("/api/articles?sort_by=title&order=desc")
      .expect(200)
      .then((res) => {
        const articles = res.body.articles;
        expect(
          articles[0].title.localeCompare(articles[1].title),
        ).toBeGreaterThanOrEqual(0);
      });
  });

  test("should return 400 for invalid sort_by", () => {
    return request(app)
      .get("/api/articles?sort_by=invalidColumn")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid sort_by query");
      });
  });

  test("should return 400 for invalid order", () => {
    return request(app)
      .get("/api/articles?order=sideways")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid order query");
      });
  });
});
