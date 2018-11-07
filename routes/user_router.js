const Router = require('express').Router()
const user_controller = require('../controllers/user_controller')

Router.get('/me', user_controller.me)

module.exports = Router
