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
        return res
          .status(406)
          .send(`Required ${prop} property on the request body was missing.`)
      }
    })

    if (password !== confirm_password) {
      return res
        .status(406)
        .send(
          `password and confirm_password on the request body did not match.`
        )
    }
  }
}
