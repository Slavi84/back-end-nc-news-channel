// const express = require("express");
// const { getArticlesById } = require("../controllers/articles_id.controller");
// const articlesByIdRouter = express.Router();
// articlesByIdRouter.get("/:article_id", getArticlesById);

// module.exports = articlesByIdRouter;

const express = require("express");
const { getArticlesById } = require("../controllers/articles_id.controller");
const articlesByIdRouter = express.Router();
articlesByIdRouter.get("/:article_id", getArticlesById);

module.exports = articlesByIdRouter;
