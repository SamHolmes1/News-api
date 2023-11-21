const { createNewComment } = require("../Models/comments.model");
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
