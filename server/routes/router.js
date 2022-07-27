const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');


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
 * @description registration page
 * @method GET /sign-up
 */
route.get('/sign-up', services.signUp)

/**
 * @description for update user
 * @method GET /update-user
 */
route.get('/update-user', services.updateUser);

/**
 * @description for dashboard
 * @method GET /dashboard
 */
route.get('/dashboard', services.dashboard);


// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
// route.put('/api/users/:id', controller.update);
// route.delete('/api/users/:id', controller.delete);

route.post('/login', controller.login);

route.post('/game-score', controller.saveScore);
route.get('/game-score/:id', controller.getScore);

module.exports = route