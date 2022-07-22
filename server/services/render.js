
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