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
  }
}
