const express = require("express");
const fs = require("fs/promises");

const {
  getArticleById,
  getAllArticles,
  patchArticleVotes,
} = require("./Controller/articles.controller");
const { handleInvalidQuery } = require("./errorhandler");
const { getTopics, getEndPoints } = require("./Controller/topics.controller");
const {
  postNewComment,
  deleteCommentById,
} = require("./Controller/comments.controller");
const { getCommentsById } = require("./Controller/comments.controller");
const { getAllUsers } = require("./Controller/users.controller");

const LOG_PATH = `${__dirname}/logfiles/log.txt`;
const app = express();

//Middleware for handling incoming json data
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
app.get("/api/users", getAllUsers);
//Get Endpoints
app.get("/api/topics", getTopics);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsById);

app.get("/api", getEndPoints);

//Post Endpoints
app.post("/api/articles/:article_id/comments", postNewComment);

//Patch Endpoints
app.patch("/api/articles/:article_id", patchArticleVotes);

//Delete Endpoints
app.delete("/api/comments/:comment_id", deleteCommentById);

//Handle unrouted urls
app.all("*", (_req, res) => {
  res.status(404).send({ msg: "Endpoint does not exist!" });
});

//Error handling middleware
app.use(handleInvalidQuery);

module.exports = app;
