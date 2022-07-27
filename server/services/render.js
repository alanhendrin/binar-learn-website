const axios = require('axios');

exports.home = (req, res) => {
  res.render('index');
}

exports.game = (req, res) => {
  res.render('game-bgk');
}

exports.login = (req, res) => {
  res.render('login');
}

exports.signUp = (req, res) => {
  res.render('sign-up');
}

exports.updateUser = (req, res) => {
  res.render('update-user');
}

exports.dashboard = (req, res) => {
  axios
    .get("http://localhost:7070/api/users")
    .then((response) => {
      res.render("dashboard", {
        users: response.data,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};