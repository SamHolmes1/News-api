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
  test("Should respond with correct error message and status when given out of bounds article_id", () => {
    return request(app)
      .get("/api/articles/400")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Article does not exist");
      });
  });
  test("Should respond with correct error message and status when incorrect article_id type", () => {
    return request(app)
      .get("/api/articles/Hello")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid parameter");
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

describe("GET /api/articles", () => {
  test("Should respond with a status code of 200", () => {
    return request(app).get("/api/articles").expect(200);
  });
  test("Should return array of objects containing correct properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        if (body.articles.length > 0) {
          body.articles.forEach((element) => {
            expect(element).toMatchObject({
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              created_at: expect.any(String),
              article_img_url: expect.any(String),
              comment_count: expect.any(String),
            });
          });
        } else {
          expect(false).toBe(true);
        }
      });
  });
  test("Should return object sorted by created_at value", () => {
    return request(app)
      .get("/api/articles")
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("Should return a status code 201 when given correct data", () => {
    const inputObject = {
      username: "lurker",
      body: "Thanks Gaben, very cool",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(inputObject)
      .expect(201);
  });
  test("Should return a message when an entry is created", () => {
    const inputObject = {
      username: "lurker",
      body: "Thanks Gaben, very cool",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(inputObject)
      .expect(201)
      .then(({ body }) => {
        expect(body.msg).toBe("Entry created");
      });
  });
  test("Should return a 400 when given incorrect keys", () => {
    const inputObject = {
      name: "lurker",
      text: "Thanks Gaben, very cool",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(inputObject)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("Should return a 400 when given incorrect key types", () => {
    const inputObject = {
      username: 52,
      text: [1, 2, 3],
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(inputObject)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("Should return a 404 when given parameter that does not exist", () => {
    const inputObject = {
      username: "lurker",
      body: "Thanks Gaben, very cool",
    };
    return request(app)
      .post("/api/articles/20000/comments")
      .send(inputObject)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("20000 does not exist");
      });
  });
  test("Should create a new entry into the database", () => {
    const inputObject = {
      username: "rogersop",
      body: "Thanks Gaben, very cool",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(inputObject)
      .expect(201)
      .then(() => {
        return db.query(
          "SELECT * FROM comments WHERE author = 'rogersop' AND body = 'Thanks Gaben, very cool'"
        );
      })
      .then(({ rows }) => {
        expect(rows[0]).toEqual({
          body: "Thanks Gaben, very cool",
          votes: 0,
          author: "rogersop",
          article_id: 1,
          comment_id: expect.any(Number),
          created_at: expect.any(Date),
        });
      });
  });
});
