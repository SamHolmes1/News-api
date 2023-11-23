exports.handleInvalidQuery = function (err, _req, res, next) {
  if (err.code === "42703") {
    res.status(404).send({ msg: "Parameter not found" });
  }
  res.status(err.status).send({ msg: err.msg });
  next();
};
