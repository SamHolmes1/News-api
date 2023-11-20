const { createTopicsArray } = require("../Models/topics.model");

exports.getTopics = function (req, res, next) {
  console.log("Hello from controller");
  res.status(200).send({});
};
