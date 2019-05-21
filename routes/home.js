const express = require('express')
const router = express.Router()
const db = require('../models')
const User = db.User
const Todo = db.Todo
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res, err) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) return res.error()
      return Todo.findAll({
        where: {
          userId: req.user.id
        }
      })
    })
    .then(todos => {
      return res.render('index', { todos })
    })
    .catch(error => {
      return res.status(422).json(error)
    })
})

module.exports = router
