const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const db = require('../models')
const bcrypt = require('bcryptjs')
const User = db.User

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ where: { email: email } }).then(user => {
        if (!user) {
          return done(null, false)
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err
          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        })
      })
    })
  )
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName']
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({
          where: { email: profile._json.email }
        }).then(user => {
          if (!user) {
            var randomPassword = Math.random()
              .toString(36)
              .slice(-8)
            bcrypt
              .genSalt(10)
              .then(salt => bcrypt.hash(randomPassword, salt))
              .then(hash => {
                const newUser = new User({
                  name: profile._json.name,
                  email: profile._json.email,
                  password: hash
                })
                newUser.save()
              })
              .then(user => {
                return done(null, user)
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            return done(null, user)
          }
        })
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id).then(user => {
      done(null, user)
    })
  })
}
