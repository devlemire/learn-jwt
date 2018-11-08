const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt_utils = require('../utils/jwt_utils')

module.exports = {
  me: (req, res) => {
    jwt_utils.cookieParser(req)

    console.log('devmtnJwt:', req.cookies.devmtnJwt)
    // A JWT already exists
    if (req.cookies.devmtnJwt) {
      const user = jwt_utils.verify(req.cookies.devmtnJwt)

      console.log('The user is:', user)
      if (user === undefined) return res.sendStatus(403)

      return res.send(user)
    }

    if (req.user || (req.session && req.session.user)) {
      return res.send(req.user || req.session.user)
    }

    res.sendStatus(403)
  },

  register: async (req, res) => {
    const adapter = new FileSync('db.json')
    const db = low(adapter)

    const { username, first_name, last_name, password } = req.body

    // Check to make sure the username isn't taken
    const user = db
      .get('users')
      .find({ username })
      .value()

    if (user !== undefined) {
      return res
        .status(406)
        .send({ message: 'Please try again. The username is already taken.' })
    }

    const salt = await bcrypt.genSalt(saltRounds)
    const hashed_password = await bcrypt.hash(password, salt)

    db.get('users')
      .push({
        username,
        first_name,
        last_name,
        password: hashed_password
      })
      .write()

    let created_user = db
      .get('users')
      .find({ username })
      .value()

    // Remove the password from the user before sending it back to the client
    delete created_user.password

    // Create a signed JWT token. And add it as a cookie
    jwt_utils.sign(res, created_user)

    res.send({ user: created_user })
  }
}
