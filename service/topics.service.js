const { getAllTopics } = require("../controllers/topics.controller.js");
const { fetchAllTopics } = require("../models/topic_model");
exports.getAllTopics = () => {
  return fetchAllTopics();
};
