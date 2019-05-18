const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../models')
const User = db.User
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res, err) => {
  User.findAll()
    .then(users => console.log('All users:', users[0].dataValues.name))
    .then(() => {
      return res.send('hello world')
    })
    .catch(err => {
      if (err) return console.error(err)
    })
})

module.exports = router
// JSON.stringify(users, null, 4)
