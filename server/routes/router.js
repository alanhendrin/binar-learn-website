const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');


let dataUser = {
  username: "alan",
  password: "12345",
  token: 'asdsdadwad-10019102910fa',
  email: 'alan@santuy.co.id'
};


/**
 * @description home page
 * @method GET /
 */
route.get('/', services.home)

/**
 * @description game page
 * @method GET /game-bgk
 */
route.get('/game-bgk', services.game)

/**
 * @description login page
 * @method GET /login
 */
route.get('/login', services.login)

/**
 * @description sign up page
 * @method GET /sign-up
 */
route.get('/sign-up', services.signUp)


// API
// route.post('/api/users', controller.create);
// route.get('/api/users', controller.find);
// route.put('/api/users/:id', controller.update);
// route.delete('/api/users/:id', controller.delete);

route.post('/login', controller.login)




// route.get('/sign-up-api', (req, res) => {
//   res.send({
//     message: 'Succesfull to get data',
//     statusCode: 200,
//     resultData: qw3r7y
//   })
// })

// let qw3r7y = []
// route.post('/sign-up-api', (res, req) => {
//   if (req.body != null) {
//     qw3r7y.push(req.body)
//     res.send({
//       message: 'Successfull to create data',
//       statusCode: 200,
//       dataCreated: req.body
//     })
//   } else {
//     res.sendStatus(400)
//   }
// })

module.exports = route