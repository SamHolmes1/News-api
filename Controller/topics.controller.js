const { createTopicsArray } = require("../Models/topics.model");

exports.getTopics = function (req, res, next) {
  createTopicsArray().then((data) => {
    res.status(200).send(data);
  });
};
