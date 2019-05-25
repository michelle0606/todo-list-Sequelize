const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../models')
const User = db.User
const bcrypt = require('bcryptjs')

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入檢查
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next)
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  User.findOne({ where: { email } }).then(user => {
    if (user || password != password2) {
      return res.render('register', { name, email, password, password2 })
    }
    const newUser = new User({
      name,
      email,
      password
    })

    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(newUser.password, salt))
      .then(hash => {
        newUser.password = hash
        newUser.save()
        res.redirect('/')
      })
      .catch(error => console.log(error))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})
module.exports = router
