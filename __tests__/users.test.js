const request = require("supertest");
const app = require("../app");
const { userData } = require("../db/data/development-data");
describe("GET/api/users", () => {
  test("200: responds with an array of users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.users)).toBe(true);
        expect(res.body.users.length).toBeGreaterThan(0);
      });
  });
});
