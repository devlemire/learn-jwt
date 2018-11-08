module.exports = {
  register: (req, res, next) => {
    const { password, confirm_password } = req.body

    const required_body = [
      'username',
      'password',
      'confirm_password',
      'first_name',
      'last_name'
    ]

    required_body.forEach(prop => {
      if (!req.body[prop]) {
        let user_friendly_error = prop.replace('_', ' ')

        return res.status(406).send({
          error: `Required ${prop} property on the request body was missing.`,
          message: `Please try again. The ${user_friendly_error} field is required.`
        })
      }
    })

    if (password !== confirm_password) {
      return res.status(406).send({
        error: `password and confirm_password on the request body did not match.`,
        message: `Please try again. The passwords did not match.`
      })
    }

    next()
  },
  login: (req, res, next) => {
    const { username, password } = req.body

    if (!username)
      return res
        .status(406)
        .send('Required username property on the request body was missing.')

    if (!password)
      return res
        .status(406)
        .send('Required password property on the request body was missing.')

    next()
  }
}
