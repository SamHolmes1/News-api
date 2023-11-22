const db = require("../db/connection");
const format = require("pg-format");

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

exports.queryAllArticles = function (input) {
  const query = format(
    `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count 
  FROM comments 
  INNER JOIN articles 
  ON %s
  GROUP BY articles.article_id
  ORDER BY articles.created_at DESC;`,
    [input]
  );
  return db.query(query).then(({ rows }) => {
    return { articles: rows };
  });
};

exports.modifyArticleVotes = function (article_id, inc_votes) {
  if (isNaN(+inc_votes)) {
    // Check data type before passing to the database to keep malformed data away from the database
    return Promise.reject({ status: 400, msg: "Invalid parameter" });
  }
  query = format(
    "UPDATE articles SET votes = votes + %L WHERE article_id = %L RETURNING votes;",
    [inc_votes],
    [article_id]
  );
  return db.query(query).then(({ rows }) => {
    return rows[0].votes;
  });
};
