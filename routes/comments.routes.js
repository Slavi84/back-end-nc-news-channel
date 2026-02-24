const express = require("express");
const {
  getCommentsByArticleId,
  postCommentByArticleId,
  deleteComment,
} = require("../controllers/comments.controller");
const commentsRouter = express.Router();
commentsRouter.get("/:article_id/comments", getCommentsByArticleId);
commentsRouter.post("/:article_id/comments", postCommentByArticleId);
commentsRouter.delete("/:comment_id, deleteComment");

module.exports = commentsRouter;
