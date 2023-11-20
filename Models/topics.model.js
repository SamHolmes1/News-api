const db = require("../db/connection");
const fs = require("fs/promises");

exports.retrieveTopicsArray = function () {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
};

exports.retrieveEndPoints = function () {
  return fs.readFile(`${__dirname}/../endpoints.json`).then((data) => {
    return data.toString();
  });
};
