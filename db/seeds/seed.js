const db = require("../connection");
const format = require("pg-format");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments`) //<< write your first query in here.
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics`);
    })
      .then(() => {
        return db.query(`
        CREATE TABLE topics (
          slug VARCHAR PRIMARY KEY,
          description VARCHAR NOT NULL,
          img_url VARCHAR(1000)
        );
      `);
      })

      // CREATE USERS
      .then(() => {
        return db.query(`
        CREATE TABLE users (
          username VARCHAR(50) PRIMARY KEY,
          name VARCHAR(100),
          avatar_url VARCHAR(1000)
        );
      `);
      })

      // CREATE ARTICLES
      .then(() => {
        return db.query(`
        CREATE TABLE articles (
          article_id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          topic VARCHAR REFERENCES topics(slug) NOT NULL,
          author VARCHAR(50) REFERENCES users(username) NOT NULL,
          body TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          votes INT DEFAULT 0,
          article_img_url VARCHAR(1000)
        );
      `);
      })

      // CREATE COMMENTS
      .then(() => {
        return db.query(`
        CREATE TABLE comments (
          comment_id SERIAL PRIMARY KEY,
          article_id INT REFERENCES articles(article_id) NOT NULL,
          body TEXT NOT NULL,
          votes INT DEFAULT 0,
          author VARCHAR(50) REFERENCES users(username) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      })

      // INSERT TOPICS
      .then(() => {
        const formattedTopics = topicData.map((topic) => [
          topic.slug,
          topic.description,
          topic.img_url,
        ]);

        const queryStr = format(
          `INSERT INTO topics (slug, description, img_url) VALUES %L;`,
          formattedTopics,
        );

        return db.query(queryStr);
      })

      // INSERT USERS
      .then(() => {
        const formattedUsers = userData.map((user) => [
          user.username,
          user.name,
          user.avatar_url,
        ]);

        const queryStr = format(
          `INSERT INTO users (username, name, avatar_url) VALUES %L;`,
          formattedUsers,
        );

        return db.query(queryStr);
      })

      // INSERT ARTICLES
      .then(() => {
  const formattedArticles = articleData.map((article) => [
    article.title,
    article.topic,
    article.author,
    article.body,
    article.created_at,
    article.votes,
    article.article_img_url,
  ]);

  const queryStr = format(
    `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url)
     VALUES %L RETURNING article_id, title;`,
    formattedArticles
  );

  return db.query(queryStr);
})


      // INSERT COMMENTS
      .then(({ rows }) => {
  const articleIdLookup = {};

  rows.forEach((row) => {
    articleIdLookup[row.title] = row.article_id;
  });

  const formattedComments = commentData.map((comment) => [
    articleIdLookup[comment.article_title], // match by title
    comment.body,
    comment.votes,
    comment.author,
    comment.created_at,
  ]);

  const queryStr = format(
    `INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L;`,
    formattedComments
  );

  return db.query(queryStr);
})
};

module.exports = seed;
