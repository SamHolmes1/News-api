const db = require("../db/connection");
const fs = require("fs/promises");

exports.RetrieveTopicsArray = function () {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
};

exports.RetrieveEndPoints = function () {
  return fs.readFile(`${__dirname}/../endpoints.json`).then((data) => {
    return data.toString();
  });
};
