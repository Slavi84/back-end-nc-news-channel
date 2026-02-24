// const cors = require("cors");
// const express = require("express");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routers
// const topicsRouter = require("./routes/topics.routes");
// const articlesRouter = require("./routes/articles.routes");
// const articlesByIdRouter = require("./routes/articles_id.routes");
// const commentsRouter = require("./routes/comments.routes");
// const usersRouter = require("./routes/users.routes");

// // Mounting
// app.use("/api/topics", topicsRouter);
// app.use("/api/articles", articlesRouter);
// app.use("/api/articles", articlesByIdRouter);
// app.use("/api/articles", commentsRouter);
// app.use("/api/comments", commentsRouter);
// app.use("/api/users", usersRouter);

// // Error handler
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(err.status || 500).send({
//     msg: err.msg || "Internal Server Error",
//   });
// });

// module.exports = app;

const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

// Routers
const topicsRouter = require("./routes/topics.routes");
const articlesRouter = require("./routes/articles.routes");
const articlesByIdRouter = require("./routes/articles_id.routes");
const commentsRouter = require("./routes/comments.routes");
const usersRouter = require("./routes/users.routes");

// Mounting
app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/articles", articlesByIdRouter);
app.use("/api/articles", commentsRouter); // <-- correct place for comments
app.use("/api/users", usersRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send({
    msg: err.msg || "Internal Server Error",
  });
});

module.exports = app;
