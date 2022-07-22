const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
// const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

// localhost server
dotenv.config({ path: 'config.env' })
const port = process.env.port || 8080

// log request
app.use(morgan('tiny'));

// mongoDB connection
connectDB();

// load assets
app.use(express.static('public'));

// middleware untuk convert data dare FE ke BE
app.use(express.json()) // terima data berupa json
app.use(express.urlencoded({ extended: true })) // terima data berupa form

// parser request to body-parser
app.use(bodyparser.urlencoded({ extended: true }))

// set view engine
app.set('view engine', 'ejs')

// load router
app.use('/', require('./server/routes/router'))

app.listen(port, () => { console.log(`Server is running on http://localhost:${port}`) });





// * Dictionary * //
// memulai server : npm start
// menginstall package : npm install [nama package]
// menutup server : ctrl + c
// membersihkan terminal : cls