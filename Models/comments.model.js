const db = require("../db/connection");

exports.createNewComment = function (body, username, article_id) {
  return db.query(
    "INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3);",
    [body, username, article_id]
  );
};
exports.queryCommentsByArticleId = function (param) {
  if (isNaN(+param)) {
    // Check data type before passing to the database to keep malformed data away from the database
    return Promise.reject({ status: 400, msg: "Invalid parameter" });
  }
  return db
    .query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC",
      [param]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.removeCommentsById = function () {};
