const { createNewComment } = require("../Models/comments.model");
const { queryCommentsByArticleId } = require("../Models/comments.model");
const { checkExists } = require("../mvc.utils");

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
        return createNewComment(body, username, article_id);
      })
      .then(() => {
        res.status(201).send({ msg: "Entry created" });
      })
      .catch(next);
  } else {
    res.status(400).send({ msg: "Bad request" });
  }
};

exports.getCommentsById = function (req, res, next) {
  const article_id = req.params.article_id;

  const promises = [
    checkExists("articles", "article_id", article_id),
    queryCommentsByArticleId(article_id),
  ];

  Promise.all(promises)
    .then((data) => {
      res.status(200).send({ comments: data[1] });
    })
    .catch(next);
};
