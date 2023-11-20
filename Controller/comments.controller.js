const { queryCommentsByArticleId } = require("../Models/comments.model");

exports.getCommentsById = function (req, res, next) {
  queryCommentsByArticleId(req.params)
    .then(() => {
      res.status(200).send({});
    })
    .catch(next);
};
