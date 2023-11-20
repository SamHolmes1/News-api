const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const app = require("../app");
const request = require("supertest");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/topics", () => {
  test("should respond with a status code of 200", () => {
    return request(app).get("/api/topics").expect(200);
  });
  test("Should return array of objects containing a slug and a description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        if (body.length > 0) {
          body.forEach((element) => {
            expect(element).toMatchObject({
              slug: expect.any(String),
              description: expect.any(String),
            });
          });
        } else {
          fail("request did not return an array");
        }
      });
  });
  test("Should return a status code of 404 when given a query", () => {
    return request(app).get("api/topics?sort_by=passwords").expect(404);
  });
  test("Should return a status code of 404 when given a parameter", () => {
    return request(app).get("api/topics/5").expect(404);
  });
});

describe("Incorrect endpoints", () => {
  test("should respond with a status code of 400", () => {
    return request(app).get("/api/passwords").expect(404);
  });
  test("Should respond with an error message", () => {
    return request(app)
      .get("/api/governmentSecrets")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Endpoint does not exist!");
      });
  });
});
