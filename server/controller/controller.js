const User = require('../model/model');
const userProfile = require('../model/model-profiles');
const gameHistory = require('../model/model-history');
const gameHistoryTotal = require('../model/model-history-total');
const mongoose = require('mongoose');
const Cryptr = require('cryptr');
const secretKey = 'SecretKey';
const CryptrConverter = new Cryptr(secretKey);
const JWT = require('jsonwebtoken')


// Register controller
exports.create = async function (req, res) {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  } else {
    try {
      // check user exist
      let findUser = await User.findOne({ username: username, email: email })
      if (findUser) {
        res.status(400).send(`<script>alert("Username or email already taken, please choose another username or email!"); window.location.href = "/sign-up"; </script>`);
      } else {
        // encryption password
        let newPasswordPassing = CryptrConverter.encrypt(password)
        // new user
        let userData = await User.create({
          userId: new mongoose.Types.ObjectId(),
          username: req.body.username,
          password: newPasswordPassing,
          email: req.body.email
        })

        let userProfiles = await userProfile.create({
          userId: userData.userId,
          firstName: req.body.firstName || "",
          lastName: req.body.lastName || "",
          gender: req.body.gender || "",
          phoneNumber: req.body.phoneNumber || "",
          address: req.body.address || "",
          zipCode: req.body.zipCode || "",
          birthDate: req.body.dob
        })
        // res.send({
        //   statusCode: 200,
        //   message: 'Congratulations, your account has been successfully created!',
        //   result: { username: username, email: email }
        // })
        res.status(200).send(`<script>alert("Congratulations, your account has been successfully created!"); window.location.href = "/"; </script>`);
      }
    } catch (err) {
      res.status(500).send({ message: err.message || "Some error occurred while creating a create operation" })
    }
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
        if (CryptrConverter.decrypt(findUser.password) === password) {
          // create token akses
          let createToken = JWT.sign({
            username: findUser.username,
            email: findUser.email,
            access: ['dashboard', 'create_data', 'delete_data', 'update_data', 'read_data']
          }, secretKey)
          // get data profile
          let getProfiles = await userProfile.findOne({ userId: findUser.userId });
          res.send({
            message: 'Successfull to get data user',
            statusCode: 200,
            data: {
              id: findUser.userId,
              username: findUser.username,
              email: findUser.email,
              token: createToken,
              profiles: getProfiles
            }
          })
        } else {
          res.status(400).send({ message: 'Wrong username or password', statusCode: 400 })
        }
      }
      // console.log(findUser)
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: err.message || "Error occured while retriving user information" })
    }
  }
}

// score controller
exports.saveScore = async function (req, res) {
  let { userId, win, draw, lose } = req.body;
  let newDataHistory = {
    userId: userId,
    win: win, draw: draw, lose: lose,
    typePlayer: req.body.typePlayer
  }
  try {
    let findDataTotalScore = await gameHistoryTotal.findOne({ userId: userId })
    let createGameScore = await gameHistory.create(newDataHistory)
    if (!findDataTotalScore) {
      let createTotalGameScore = await gameHistoryTotal.create(newDataHistory)
      res.send({ statusCode: 200, message: 'Successful to save game score !' })
    } else {
      findDataTotalScore.win = findDataTotalScore.win + win
      findDataTotalScore.lose = findDataTotalScore.lose + lose
      findDataTotalScore.draw = findDataTotalScore.draw + draw

      let updateTotalGameScore = await gameHistoryTotal.findOneAndUpdate({ userId: userId }, findDataTotalScore)
      console.log(updateTotalGameScore)
      res.send({ statusCode: 200, message: 'Successful to save game score !' })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'failed to save' })
  }
}

exports.getScore = async function (req, res) {
  let userId = req.params.id
  try {
    let getScore = await gameHistoryTotal.aggregate([
      { $match: { 'userId': userId } },
      {
        $lookup: {
          from: 'game-history', //ini nama collectionnya di mongodb yg akan di join
          localField: 'userId',
          foreignField: 'userId',
          as: 'score_history'
        }
      }
    ])
    res.send({
      statusCode: 200,
      message: 'Successful to save game score !',
      result: getScore
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      statusCode: 500,
      message: 'failed to get game data score!'
    })
  }
}

// retrieve and return all users / retrieve and return a single user
// exports.find = (req, res) => {

//   if (req.query.id) {
//     const id = req.query.id;

//     User.findById(id)
//       .then(data => {
//         if (!data) {
//           res.status(404).send({ message: `User id (${id}) not found!` })
//         } else {
//           res.send(data)
//         }
//       })
//       .catch(err => {
//         res.status(500).send({ message: "Error retriving user with id " + id })
//       })

//   } else {
//     User.find()
//       .then(user => {
//         res.send(user)
//       })
//       .catch(err => {
//         res.status(500).send({ message: err.message || "Error occured while retriving user information" })
//       })
//   }
// }
