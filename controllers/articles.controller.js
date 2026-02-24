const { fetchAllArticles } = require("../models/articles.model");
const { updateArticleById } = require("../models/articles.model");
const { fetchArticles } = require("../models/articles.model");
exports.getAllArticles = (req, res, next) => {
  fetchAllArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.patchArticleVotes = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const { inc_votes } = req.body;

    if (inc_votes === undefined) {
      return next({
        status: 400,
        msg: "Missing inc_votes",
      });
    }

    const article = await updateArticleById(article_id, inc_votes);

    res.status(200).send({ article });
  } catch (err) {
    next(err);
  }
};
exports.getArticles = (req, res, next) => {
  const { sort_by, order } = req.query;
  fetchArticles(sort_by, order)
    .then((articles) => res.status(200).json({ articles }))
    .catch(next);
};
