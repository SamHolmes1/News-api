const db = require("../db/connection");

exports.queryByArticleId = function (param) {
  if (isNaN(+param.article_id)) {
    // Check data type before passing to the database to keep malformed data away from the database
    return Promise.reject({ status: 400, msg: "Invalid parameter" });
  }
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [param.article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        // Check if we actually got anything back
        return Promise.reject({ status: 400, msg: "Article does not exist" });
      } else {
        return rows[0];
      }
    });
};

exports.QueryAllArticles = function () {
  // The articles should be sorted by date in descending order
  // There should not be a body property on any of the objects
  return db.query("SELECT * FROM articles").then(({ rows }) => {
    let copyOfData = [...rows];
    copyOfData.forEach((element) => {
      if (element.hasOwnProperty("body")) {
        delete element.body;
      }
    });
    return copyOfData.sort(({ created_at: a }, { created_at: b }) => b - a);
  });
};
