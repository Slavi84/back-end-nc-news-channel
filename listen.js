// const app = require("./app");
// const PORT = 9090;
// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });

const app = require("./app");
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
