const db = require("../db/connection");

exports.queryCommentsByArticleId = function (param) {
  if (isNaN(+param.article_id)) {
    // Check data type before passing to the database to keep malformed data away from the database
    return Promise.reject({ status: 400, msg: "Invalid parameter" });
  }
  return db
    .query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC",
      [param.article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: [],
        });
      } else {
        return rows;
      }
    });
};
