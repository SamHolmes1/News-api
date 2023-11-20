const express = require("express");
const fs = require("fs/promises");
const { getTopics } = require("./Controller/topics.controller");

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

//Handle unrouted urls
app.all("*", () => {
  throw new Error("Bad request");
});

//Catch errors thrown by app.all(*)
app.use((err, _req, res, _next) => {
  res.status(500).send(err);
});

module.exports = app;
