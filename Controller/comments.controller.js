const { queryCommentsByArticleId } = require("../Models/comments.model");
const { checkExists } = require("../mvc.utils");

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
