const { queryCommentsByArticleId } = require("../Models/comments.model");

exports.getCommentsById = function (req, res, next) {
  queryCommentsByArticleId(req.params).then((data) => {
    res.status(200).send({ comments: data });
  });
};
