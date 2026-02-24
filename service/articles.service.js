const { getArticles } = require("../controllers/articles.controller");
const { fetchArticles } = require("../models/articles.model");
exports.getArticles = () => {
  return fetchArticles();
};
