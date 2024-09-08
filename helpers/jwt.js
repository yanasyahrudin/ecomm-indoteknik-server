const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
// const secret = "indo_teknik"

const createToken = (playload) => jwt.sign(playload, secret)
const verifyToken = (token) => jwt.verify(token, secret)

module.exports = { createToken, verifyToken }