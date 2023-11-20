const express = require("express");
const fs = require("fs/promises");

const { getTopics } = require("./Controller/topics.controller");
const LOG_PATH = `${__dirname}/logfiles/log.txt`;
const app = express();

//Express middleware for handling incoming JSON
app.use(express.json());

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
app.all("*", (_req, res) => {
  res.status(404).send({ msg: "Endpoint does not exist!" });
});

module.exports = app;
