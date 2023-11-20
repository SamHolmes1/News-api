const db = require("../db/connection");

exports.queryByArticleId = function (param) {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [param.article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 400, msg: "Article does not exist" });
      } else {
        return rows[0];
      }
    });
};
