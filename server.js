const express = require('express')
const app = express()
const port = 7000
const morgan = require('morgan')


// middleware information
app.use(morgan('dev'))

// middleware untuk get assets in server
app.use(express.static('public'))

// middleware untuk convert data dare FE ke BE
app.use(express.json()) // terima data berupa json
app.use(express.urlencoded({ extended: true })) // terima data berupa form

// middleware untuk view / tampilan
app.set('view engine', 'ejs')
app.listen(port, function () { console.log(`Server is running in port : ${port}`) })

const Routes = require('./routes/route')
app.use(Routes)




// * Dictionary * //
// memulai server : npm start
// menginstall package : npm install [nama package]
// menutup server : ctrl + c
// membersihkan terminal : cls