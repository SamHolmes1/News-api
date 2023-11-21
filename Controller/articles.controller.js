const {
  queryByArticleId,
  queryAllArticles,
  createNewComment,
} = require("../Models/articles.models");

const { checkExists } = require("../mvc.utils");

exports.getArticleById = function (req, res, next) {
  queryByArticleId(req.params)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(next);
};

exports.getAllArticles = function (_req, res) {
  queryAllArticles().then((data) => {
    res.status(200).send(data);
  });
};

exports.postNewComment = function (req, res, next) {
  const article_id = req.params.article_id;
  const { username, body } = req.body;
  if (typeof username === "string" && typeof body === "string") {
    const promises = [
      checkExists("users", "username", username),
      checkExists("articles", "article_id", article_id),
    ];

    Promise.all(promises)
      .then(() => {
        res.status(201).send({ msg: "Entry created" });
      })
      .catch(next);
  } else {
    res.status(400).send({ msg: "Bad request" });
  }
};
