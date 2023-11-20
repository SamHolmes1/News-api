const db = require("../db/connection");

exports.createTopicsArray = function () {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
};
