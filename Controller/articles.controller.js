const {
  queryByArticleId,
  queryAllArticles,
  modifyArticleVotes,
} = require("../Models/articles.models");
const format = require("pg-format");
const { checkExists } = require("../mvc.utils");

exports.getArticleById = function (req, res, next) {
  queryByArticleId(req.params)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(next);
};

exports.getAllArticles = function (req, res, next) {
  const input = req.query.topic
    ? format("articles.topic = %L", [req.query.params])
    : "articles.article_id = comments.article_id";
  queryAllArticles(input)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(next);
};

exports.patchArticleVotes = function (req, res, next) {
  const article_id = req.params.article_id;
  const { inc_votes } = req.body;

  if (!inc_votes) {
    res.status(400).send({ msg: "Invalid parameter" });
  }

  checkExists("articles", "article_id", article_id)
    .then(() => {
      return modifyArticleVotes(article_id, inc_votes);
    })
    .then((newVotes) => {
      res
        .status(201)
        .send({ msg: `Article: ${article_id} updated to ${newVotes}` });
    })
    .catch(next);
};
