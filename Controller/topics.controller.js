const {
  RetrieveTopicsArray,
  RetrieveEndPoints,
} = require("../Models/topics.model");

exports.getTopics = function (_req, res) {
  RetrieveTopicsArray().then((data) => {
    res.status(200).send(data);
  });
};

exports.getEndPoints = function (_req, res) {
  RetrieveEndPoints().then((data) => {
    res.status(200).send(JSON.parse(data));
  });
};
