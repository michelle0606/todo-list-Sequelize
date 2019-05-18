const express = require('express')
const router = express.Router()
const db = require('../models')
const User = db.User
const Todo = db.Todo
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res, err) => {
  User.sync().then(() => {
    const user = User.findByPk(req.user.id)
      .then(user => {
        if (!user) return res.error()
        Todo.findAll({
          where: {
            userId: req.user.id
          }
        })
      })
      .then(todos => {
        return res.render('index')
      })
      .catch(error => {
        return res.status(422).json(error)
      })
  })
})

module.exports = router
