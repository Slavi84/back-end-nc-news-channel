const db = require("../connection");

// Get all of the users
// Get all of the articles where the topic is coding
// Get all of the comments where the votes are less than zero
// Get all of the topics
// Get all of the articles by user grumpy19
// Get all of the comments that have more than 10 votes.

db.query(`SELECT * FROM users;`)
  .then(({ rows }) => {
    console.log("\nAll Users:");
    console.table(rows);
  });
  db.query(`SELECT * FROM articles WHERE topic = 'coding';`)
  .then(({ rows }) => {
    console.log("\nArticles about coding:");
    console.table(rows);
  });
  db.query(`SELECT * FROM comments WHERE votes < 0;`)
  .then(({ rows }) => {
    console.log("\nComments with negative votes:");
    console.table(rows);
  });
  db.query(`SELECT * FROM topics;`)
  .then(({ rows }) => {
    console.log("\nAll Topics:");
    console.table(rows);
  });
  
  db.query(`SELECT * FROM comments WHERE votes > 10;`)
  .then(({ rows }) => {
    console.log("\nPopular Comments (votes > 10):");
    console.table(rows);
  })
  