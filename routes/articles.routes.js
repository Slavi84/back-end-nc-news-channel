const express = require("express");

const articlesRouter = express.Router();

const { getAllArticles } = require("../controllers/articles.controller");
articlesRouter.get("/", getAllArticles);

const { patchArticleVotes } = require("../controllers/articles.controller");
articlesRouter.patch("/:article_id", patchArticleVotes);

// const getArticles = require("../controllers/articles.controller");
// articlesRouter.get("api/articles", getArticles);
module.exports = articlesRouter;
