const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());

app.use(express.json());

const topicsRouter = require("./routes/topics.routes");

app.use("/api/topics", topicsRouter);

const articlesRouter = require("./routes/articles.routes");

app.use("/api/articles", articlesRouter);

const usersRouter = require("./routes/users.routes");
app.use("/api/users", usersRouter);

const articlesByIdRouter = require("./routes/articles_id.routes");
app.use("/api/articles/", articlesByIdRouter);

const commentsRouter = require("./routes/comments.routes");
app.use("/api/articles", commentsRouter);
app.use("api/comments", commentsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send({
    msg: err.msg || "Internal Server Error",
  });
});

// const usersRouter = require("./routes/user_routes");
// app.use("/api/users", usersRouter);

// const { getArticleById } = require("./controllers/article_controller");
// app.get("api/articles/:article_id");
module.exports = app;

/*{
    title: "Sony Vaio; or, The Laptop",
    topic: "mitch",
    author: "icellusedkars",
    body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
    created_at: new Date(1602828180000),
    votes: 0,
    article_img_url:
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
  },*/
