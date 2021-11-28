const express = require("express");
const cors = require("cors");
const logger = require("./config/logger");

const articlesRouter = require("./articles/articles.router");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const app = express();

app.use(logger);
app.use(cors());
app.use(express.json());

app.use("/articles", articlesRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
