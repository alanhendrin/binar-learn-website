const express = require('express')
const app = express()
const port = 7000
const morgan = require('morgan')


// Middleware
app.use(morgan('dev'))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.listen(port, function () { console.log(`Server is running in port : ${port}`) })


// Routing
// app.get('/home', function (request, response) {
//   response.sendFile(__dirname + '/views/index.html')
// })

// app.get('/game', function (request, response) {
//   response.sendFile(__dirname + '/views/game-b-g-k.html')
// })

app.get('/home', function (request, response) {
  response.render('index') // untuk ejs
})

app.get('/game-bgk', function (request, response) {
  response.render('game-bgk') // untuk ejs
})

// Err Handler
app.use(function (err, req, res, next) {
  console.log(err)
  res.status(500).json({
    status: 'fail',
    errors: err.message
  })
})


// * Dictionary * //
// memulai server : npm start
// menginstall package : npm install [nama package]
// menutup server : ctrl + c
// membersihkan terminal : cls