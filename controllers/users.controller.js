const { fetchAllUsers } = require("../models/users.model");
exports.getUsers = (req, res, next) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

// const { fetchUsers } = require("../models/user_model");
// exports.getUser = (req, res) => {
//   fetchUsers().then((users) => {
//     res.status(200).send({ users });
//   });
// };
