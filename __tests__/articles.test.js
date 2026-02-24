const request = require("supertest");
const app = require("../app");
const { articleData } = require("../db/data/development-data");
describe("GET/api/articles", () => {
  test("200: responds with an array of articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.articles)).toBe(true);
        expect(res.body.articles.length).toBeGreaterThan(0);
        expect(articleData.body).toBeUndefined();
      });
  });
  test("articles are sorted by created_at in DESC order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        const dates = res.body.articles.map((a) => new Date(a.created_at));
        for (let i = 0; i < dates.length - 1; i++) {
          expect(dates[i].getTime()).toBeGreaterThanOrEqual(
            dates[i + 1].getTime(),
          );
        }
      });
  });
});
