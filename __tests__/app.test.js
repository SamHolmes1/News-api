const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const app = require("../app");
const request = require("supertest");
const endpoints = require("../endpoints.json");

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
          expect(false).toBe(true);
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

describe("GET /api/articles/:article_id", () => {
  test("should respond with a status code of 200 when given valid ID", () => {
    return request(app).get("/api/articles/1").expect(200);
  });
  test("Should respond with an object containing the correct keys when given valid query", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject({
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
        });
      });
  });
  test("Should respond with a status code 400 when given invalid article_id", () => {
    return request(app).get("/api/articles/300").expect(400);
  });
  test("Should respond with correct error message when given invalid article_id", () => {
    return request(app)
      .get("/api/articles/400")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Article does not exist");
      });
  });
});
describe("GET /api", () => {
  test("should respond with a status code of 200", () => {
    return request(app).get("/api").expect(200);
  });
  test("should respond with an object containing all specified API endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(endpoints);
      });
  });
  test("Should return a status code of 404 when given a query", () => {
    return request(app).get("api/?sort_by=secrets").expect(404);
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
