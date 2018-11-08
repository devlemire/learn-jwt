const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt_utils = require('../utils/jwt_utils')

module.exports = {
  me: (req, res) => {
    jwt_utils.cookieParser(req)

    // A JWT already exists
    if (req.cookies.devmtnJwt) {
      const user = jwt_utils.verify(req.cookies.devmtnJwt)
      if (user === undefined) return res.sendStatus(403)

      return res.send(user)
    }

    res.sendStatus(403)
  },

  register: async (req, res) => {
    // Make a connection to our lowdb
    const adapter = new FileSync('db.json')
    const db = low(adapter)

    const { username, first_name, last_name, password } = req.body

    // Check to make sure the username isn't taken
    const user = db
      .get('users')
      .find({ username })
      .value()

    if (user !== undefined) {
      // The username was taken
      return res
        .status(406)
        .send({ message: 'Please try again. The username is already taken.' })
    }

    // Create a hashed version of the password
    const salt = await bcrypt.genSalt(saltRounds)
    const hashed_password = await bcrypt.hash(password, salt)

    // Add the user with the hashed password to our lowdb
    db.get('users')
      .push({
        username,
        first_name,
        last_name,
        password: hashed_password
      })
      .write()

    // Regrab that user from our lowdb
    let created_user = db
      .get('users')
      .find({ username })
      .value()

    // Remove the password from the user before sending it back to the client
    delete created_user.password

    // Create a signed JWT token. And add it as a cookie
    jwt_utils.sign(res, created_user)

    res.send({ user: created_user })
  },

  login: async (req, res) => {
    // Make a connection to our lowdb
    const adapter = new FileSync('db.json')
    const db = low(adapter)

    // Destructure required information from body
    const { username, password } = req.body

    // Get the user from the lowdb
    let user = db
      .get('users')
      .find({ username })
      .value()

    // Check to see that the user exists
    if (user === undefined) {
      return res
        .status(406)
        .send({ message: 'Please try again. The username doesnt exist.' })
    }

    // Make sure the passwords match
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(406).send({
        message: 'Please try again. The username and password did not match.'
      })
    }

    // Delete the password from the user before making a JWT cookie
    delete user.password

    // Create sign and create a JWT cookie
    jwt_utils.sign(res, user)
    res.sendStatus(200)
  },

  logout: async (req, res) => {
    res.clearCookie('devmtnJwt')
    res.redirect('/')
  }
}
