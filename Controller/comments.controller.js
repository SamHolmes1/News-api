const { queryCommentsById } = require("../Models/comments.model");

exports.getCommentsById = function (req, res) {
  res.status(200).semd({});
  queryCommentsById();
};
