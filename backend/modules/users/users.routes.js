const express = require('express');
const register = require('./controllers/register');
const login = require('./controllers/login');


const userRoutes = express.Router()

//user routes...
userRoutes.post('/register', register)
userRoutes.post('/login', login)


module.exports = userRoutes