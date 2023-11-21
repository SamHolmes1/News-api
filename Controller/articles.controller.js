const {
  queryByArticleId,
  queryAllArticles,
  createNewComment,
} = require("../Models/articles.models");

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
  //Make a query to the users database
  //Make a query to the articles database
  //Evaluate these promises
};
