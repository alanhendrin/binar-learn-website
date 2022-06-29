const express = require('express')
const Routes = express.Router()


Routes.get('/', function (req, res) {
  res.render('index')
})

Routes.get('/home', function (req, res) {
  res.render('index') // untuk ejs
})

Routes.get('/game-bgk', function (req, res) {
  res.render('game-bgk') // untuk ejs
})

Routes.get('/login', function (req, res) {
  res.render('login')
})

Routes.post('/login', function (req, res) {
  let dataUser = { username: "naruto", password: "12345" }
  let requestData = req.body

  if (requestData.username === dataUser.username) {
    if (requestData.password === dataUser.password) {
      res.send({
        message: 'Successfull to login',
        resultData: dataUser,
        statusCode: 200
      })
    } else {
      res.send({ message: 'Failed to login, wrong password jancuk !!!' })
    }
  } else {
    res.send({ message: 'Wrong username cuuuuk !!!' })
  }
})

module.exports = Routes 