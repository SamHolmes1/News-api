const db = require("../db/connection");

exports.queryAllUsers = function () {
  return db.query("SELECT * FROM users").then(({ rows }) => {
    return rows;
  });
};
