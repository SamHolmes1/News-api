const { queryAllUsers } = require("../Models/users.model");

exports.getAllUsers = function (_req, res, next) {
  queryAllUsers()
    .then((data) => {
      res.status(200).send({ users: data });
    })
    .catch(next);
};
