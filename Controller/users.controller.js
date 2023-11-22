const { queryAllUsers } = require("../Models/users.model");

exports.getAllUsers = function (_req, res, next) {
  queryAllUsers()
    .then(({ rows }) => {
      res.status(200).send(rows);
    })
    .catch(next);
};
