const express = require("express");
const fs = require("fs/promises");

<<<<<<< HEAD
const { getTopics } = require("./Controller/topics.controller");
const { getArticleById } = require("./Controller/articles.controller");
const { handleInvalidQuery } = require("./errorhandler");
=======
const { getTopics, getEndPoints } = require("./Controller/topics.controller");
>>>>>>> main
const LOG_PATH = `${__dirname}/logfiles/log.txt`;
const app = express();

//Create an entry in LOG_PATH everytime a request is recieved
app.use((req, _res, next) => {
  let date = new Date(Date.now());
  fs.appendFile(
    LOG_PATH,
    `{ \n "IP_ADDRESS": "${req.socket.remoteAddress}" \n "METHOD": "${
      req.method
    }" \n "URL": "${req.url}" \n "TIME": "${date.toString()}" \n}`,
    "utf-8"
  );
  next();
});

//Endpoints
app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);
app.get("/api", getEndPoints);

//Handle unrouted urls
app.all("*", (_req, res) => {
  res.status(404).send({ msg: "Endpoint does not exist!" });
});

//Error handling middleware
app.use(handleInvalidQuery);

module.exports = app;
