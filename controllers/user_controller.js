const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
  me: (req, res) => {
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
    res.send({ user: created_user })
  }
}
