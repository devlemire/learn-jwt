const Router = require('express').Router()

Router.use('/user', require('./user_router.js'))

module.exports = Router
