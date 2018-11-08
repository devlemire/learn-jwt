const JWT = require('jsonwebtoken')
const fs = require('fs')
const privateKey = fs.readFileSync(`${__dirname}/../jwt_private_key`)
const publicKey = fs.readFileSync(`${__dirname}/../jwt_public_key`)

module.exports = {
  sign: (res, user) => {
    const token = JWT.sign(user, privateKey, {
      algorithm: 'RS256',
      expiresIn: '90d'
    })

    res.cookie('devmtnJwt', token, {
      domain: 'localhost',
      httpOnly: true
    })
  },
  verify: token => {
    return JWT.verify(token, publicKey, (err, decoded) => {
      if (err) return undefined
      return decoded
    })
  },
  cookieParser: req => {
    let cookie = req.headers.cookie
    let cookieArr = cookie ? cookie.split('; ') : []
    req.cookies = {}
    cookieArr.forEach(cookie => {
      let cookieSplit = cookie.split('=')
      let prop = cookieSplit[0]
      let value = cookieSplit[1]
      req.cookies[prop] = value
    })
  }
}
