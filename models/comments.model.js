const db = require("../db/connection");
exports.fetchCommentsByArticleId = (article_id) => {
  const queryStr = `SELECT 
    comment_id,
    votes,
    created_at,
    author,
    body,
    article_id
    FROM comments WHERE article_id = $1
    ORDER BY created_at DESC;`;
  return db.query(queryStr, [article_id]).then(({ rows }) => {
    return rows;
  });
};

exports.insertComment = (article_id, { username, body }) => {
  if (!username || body) {
    return Promise.reject({ status: 400, msg: "Missing username or body" });
  }
  const queryStr = `
    INSERT INTO comments (author, body, article_id)
    VALUES ($1, $2, $3)
    RETURNING comment_id, votes, created_at, author, body, article_id;
  `;

  return db
    .query(queryStr, [username, body, article_id])
    .then(({ rows }) => rows[0]);
};

exports.deleteCommentById = (comment_id) => {
  if (isNaN(comment_id)) {
    return Promise.reject({ status: 400, msg: "Invalid Comment ID" });
  }
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [
      comment_id,
    ])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      }
    });
};
