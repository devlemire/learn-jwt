const Router = require('express').Router()
const user_controller = require('../controllers/user_controller')
const user_middleware = require('../middlewares/user_middleware')

Router.get('/me', user_controller.me)
Router.get('/logout', user_controller.logout)

Router.post('/login', user_middleware.login, user_controller.login)
Router.post('/register', user_middleware.register, user_controller.register)

module.exports = Router
