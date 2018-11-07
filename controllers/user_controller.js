module.exports = {
  me: (req, res) => {
    if (req.user || (req.session && req.session.user)) {
      return res.send(req.user || req.session.user)
    }

    res.sendStatus(403)
  },

  register: (req, res) => {}
}
