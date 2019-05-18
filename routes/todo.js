const express = require('express')
const router = express.Router()
const db = require('../models')
const Todo = db.Todo
const User = db.User
const { authenticated } = require('../config/auth')

router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

router.get('/:id', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) {
        return res.error()
      }
      Todo.findOne({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      }).then(todo => {
        return res.render('detail', { todo })
      })
    })
    .catch(error => {
      return res.status(422).json(error)
    })
})

router.post('/', authenticated, (req, res) => {
  Todo.create({
    name: req.body.name,
    done: false,
    userId: req.user.id
  })
    .then(todo => {
      return res.redirect('/')
    })
    .catch(err => {
      return res.status(422).json(err)
    })
})

router.get('/:id/edit', authenticated, (req, res) => {
  User.findByPk(req.user.id).then(user => {
    if (!user) {
      return res.error()
    }
    Todo.findOne({
      where: {
        Id: req.params.id,
        UserId: req.user.id
      }
    }).then(todo => {
      return res.render('edit', { todo })
    })
  })
})

router.put('/:id', authenticated, (req, res) => {
  Todo.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id
    }
  }).then(todo => {
    todo.name = req.body.name
    if (req.body.done === 'on') {
      todo.done = true
    } else {
      todo.done = false
    }
    todo
      .save()
      .then(() => {
        return res.redirect(`/todos/${req.params.id}`)
      })
      .catch(err => {
        return res.status(422).json(err)
      })
  })
})

router.delete('/:id/delete', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) {
        return res.error()
      }
      Todo.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      }).then(() => {
        return res.redirect('/')
      })
    })
    .catch(error => {
      return res.status(422).json(error)
    })
})

module.exports = router
