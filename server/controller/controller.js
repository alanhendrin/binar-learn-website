var modelSchema = require('../model/model');

// create and save new user
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
}

// retrieve and return all users / retrieve and return a single user
exports.find = (req, res) => {

  if (req.query.id) {
    const id = req.query.id;

    model.schemaUserProfiles.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: `User id (${id}) not found!` })
        } else {
          res.send(data)
        }
      })
      .catch(err => {
        res.status(500).send({ message: "Error retriving user with id" + id })
      })

  } else {
    Userdb.find()
      .then(user => {
        res.send(user)
      })
      .catch(err => {
        res.status(500).send({ message: err.message || "Error occured while retriving user information" })
      })
  }
}


// login controller
exports.login = (req, res) => {
  const {
    username,
    password
  } = req.body

  if (!(dataUser.username === username))
    return res.send(JSON.stringify({
      message: "Wrong Username",
      statusCode: 500
    }));
  if (!(dataUser.password === password))
    return res.send(JSON.stringify({
      message: "Wrong Password",
      statusCode: 500,
    }));

  res.send(
    JSON.stringify({
      message: "Sucessfull to login",
      resultData: dataUser,
      statusCode: 200,
    })
  );

  console.log(`Login Sucess, username: ${username}`)
}