const { RetrieveTopicsArray } = require("../Models/topics.model");

exports.getTopics = function (req, res, next) {
  RetrieveTopicsArray().then((data) => {
    res.status(200).send(data);
  });
};
