const db = require("../db/connection");

exports.createNewComment = function (body, username, article_id) {
  return db.query(
    "INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3);",
    [body, username, article_id]
  );
};
