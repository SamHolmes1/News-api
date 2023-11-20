const { queryByArticleId } = require("../Models/articles.models");

exports.getArticleById = function (req, res) {
  queryByArticleId(req.params).then((data) => {
    res.status(200).send(data);
  });
};
