const express = require('express')
const Routes = express.Router()
let dataUser = { username: "alan", password: "12345", token: 'asdsdadwad-10019102910fa', email: 'alan@santuy.co.id' };
let statusLogin;


// homepage
Routes.get('/', function (req, res) {
  res.render('index')
})

// page game batu gunting kertas
Routes.get('/game-bgk', function (req, res) {
  res.render('game-bgk')
})

// login page
Routes.get('/login', function (req, res) {
  res.render('login')
})

Routes.post('/login', function (req, res) {
  const { username, password } = req.body
  statusLogin = req.body.statusLogin

  if (!(dataUser.username === username))
    return res.send(JSON.stringify({ message: "Wrong Username" }));
  if (!(dataUser.password === password))
    return res.send(JSON.stringify({ message: "Wrong Password" }));

  res.send(
    JSON.stringify({
      message: "Sucessfull to login",
      resultData: dataUser,
      statusCode: 200,
    })
  );

  console.log(`Sucess, username: ${username}`)
})

// Routes.post('/login', function (req, res) {
//   let dataUser = [
//     { username: "naruto", password: "12345", token: 'asdsdadwad-10019102910fa', email: 'nartoh@hokage.konoha.kh' },
//     { username: "sasuke", password: "12345", token: 'asdsdadwad-10019102910fa', email: 'asusske@hokage.konoha.kh' }
//   ]

//   let requestData = req.body

//   dataUser.forEach(user => {
//     if (requestData.username === user.username) {
//       dataUser.forEach(pass => {
//         if (requestData.password === pass.password) {
//           res.send({
//             message: 'Successfull to login',
//             resultData: dataUser.filter(dat => dat.username === requestData.username)[0],
//             statusCode: 200
//           })
//         } else {
//           res.send({ message: 'Failed to login, wrong password jancuk !!!' })
//         }
//       })
//     } else {
//       res.send({ message: 'Wrong username cuuuuk !!!' })
//     }
//   })

//   console.log(`Sucess, username: ${username}`)
// })


// sign-up page (masih error hehehehehee)
Routes.get('/sign-up', function (req, res) {
  res.render('sign-up')
})

Routes.get('/sign-up-api', (req, res) => {
  res.send({
    message: 'Succesfull to get data',
    statusCode: 200,
    resultData: qw3r7y
  })
})

let qw3r7y = []
Routes.post('/sign-up-api', (res, req) => {
  if (req.body != null) {
    qw3r7y.push(req.body)
    res.send({
      message: 'Successfull to create data',
      statusCode: 200,
      dataCreated: req.body
    })
  } else {
    res.sendStatus(400)
  }
})

module.exports = Routes 