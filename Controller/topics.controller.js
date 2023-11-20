const {
  retrieveTopicsArray,
  retrieveEndPoints,
} = require("../Models/topics.model");

exports.getTopics = function (_req, res) {
  retrieveTopicsArray().then((data) => {
    res.status(200).send(data);
  });
};

exports.getEndPoints = function (_req, res) {
  retrieveEndPoints().then((data) => {
    res.status(200).send(JSON.parse(data));
  });
};
