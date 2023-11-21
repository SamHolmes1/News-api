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

exports.queryAllArticles = function () {
  return db
    .query(
      `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count 
      FROM comments 
      INNER JOIN articles 
      ON articles.article_id = comments.article_id
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC;`
    )
    .then(({ rows }) => {
      return { articles: rows };
    });
};

exports.createNewComment = function () {};
