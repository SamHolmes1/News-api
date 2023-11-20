exports.handleInvalidQuery = function (err, _req, res, next) {
  res.status(err.status).send({ msg: err.msg });
  next();
};
