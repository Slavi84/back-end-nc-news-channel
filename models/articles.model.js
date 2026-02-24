const db = require("../db/connection");

exports.fetchAllArticles = () => {
  return db
    .query(
      `
      SELECT
        articles.author,
        articles.title,
        articles.article_id,
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url,
        COUNT(comments.comment_id)::INT AS comment_count
      FROM articles
      LEFT JOIN comments ON comments.article_id = articles.article_id
      GROUP BY 
        articles.article_id,
        articles.author,
        articles.title,
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url
      ORDER BY articles.created_at DESC;
      `,
    )
    .then(({ rows }) => {
      // convert created_at strings to JS Date objects
      return rows.map((article) => ({
        ...article,
        created_at: new Date(article.created_at),
      }));
    });
};
exports.updateArticleById = async (article_id, inc_votes) => {
  const id = Number(article_id);
  if (!Number.isInteger(inc_votes)) {
    return Promise.reject({ status: 400, msg: "Inc_votes must be a number" });
  }
  if (!Number.isInteger(id)) {
    return Promise.reject({ status: 400, msg: "Article_ID must be a number" });
  }
  const query = `UPDATE articles SET votes = votes + $1
  WHERE article_id = $2
  RETURNING * `;

  const { rows } = await db.query(query, [inc_votes, article_id]);
  if (rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Article not found" });
  }
  return rows[0];
};
const validColumns = [
  "article_id",
  "title",
  "topic",
  "author",
  "body",
  "created_at",
  "votes",
  "article_img_url",
];
exports.fetchArticles = (sort_by = "created_at", order = "desc") => {
  return new Promise((resolve, reject) => {
    if (!validColumns.includes(sort_by)) {
      return reject({ status: 400, msg: `Invalid sort-by query` });
    }
    const orderLower = order.toLowerCase();
    if (!["asc", "desc"].includes(orderLower)) {
      return reject({ status: 400, msg: `Invalid order query` });
    }
    const queryStr = `SELECT article_id, title, topic, author, body, created_at, votes, article_img_url FRPM 
    articles ORDER BY ${sort_by} ${orderLower.toUpperCase()}`;
    db.query(queryStr)
      .then(({ rows }) => resolve(rows))
      .catch((err) => reject({ status: 500, msg: err.message }));
  });
};
