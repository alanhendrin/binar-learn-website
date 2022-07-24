const User = require('../model/model');
const userProfile = require('../model/model-profiles');
const gameHistory = require('../model/model-history');
const mongoose = require('mongoose');



// Register controller
exports.create = async function (req, res) {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  } else {
    try {
      let findUser = await User.findOne({ username: username, email: email })
      if (findUser) {
        res.status(400).send({
          message: "Username or email has been registered",
          statusCode: 400
        })
      } else {
        // new user
        let userData = await User.create({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email
        })

        let userProfiles = await userProfile.create({
          userId: userData._id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          gender: req.body.gender,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          zipCode: req.body.zipCode,
          birthDate: req.body.dob
        })
        console.log(userProfiles);
        res.send({
          statusCode: 200,
          message: 'Successful to register!',
          result: { username: username, email: email }
        })
        // await res.redirect('/');
      }
    } catch (err) {
      res.status(500).send({ message: err.message || "Some error occurred while creating a create operation" })
    }
  }
}


// retrieve and return all users / retrieve and return a single user
exports.find = (req, res) => {

  if (req.query.id) {
    const id = req.query.id;

    User.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: `User id (${id}) not found!` })
        } else {
          res.send(data)
        }
      })
      .catch(err => {
        res.status(500).send({ message: "Error retriving user with id " + id })
      })

  } else {
    User.find()
      .then(user => {
        res.send(user)
      })
      .catch(err => {
        res.status(500).send({ message: err.message || "Error occured while retriving user information" })
      })
  }
}



// login controller
exports.login = async function (req, res) {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(400).send({ message: 'Wrong username or password', statusCode: 400 })
  } else {
    try {
      // check user exist
      let findUser = await User.findOne({ username: username })
      if (!findUser || findUser.length < 0) {
        res.status(400).send({ message: 'Wrong username or password', statusCode: 400 })
      } else {
        // check password
        if (findUser.password === password) {
          // get data profile
          let getProfiles = await userProfile.findOne({ userId: findUser._id });
          const randomString = Math.random().toString(36).substring(2, 36);
          res.send({
            message: 'Successfull to get data user',
            statusCode: 200,
            data: {
              id: findUser._id,
              username: findUser.username,
              email: findUser.email,
              token: randomString,
              profiles: getProfiles
            }
          })
        } else {
          res.status(400).send({ message: 'Wrong username or password', statusCode: 400 })
        }
      }
      console.log(findUser)
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: err.message || "Error occured while retriving user information" })
    }
  }
}