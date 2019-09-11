const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    permission: req.body.permission,
    password: req.body.password,
    created: today
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        User.create(userData)
          .then(user => {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1440
            })
            res.json({user, token: token })
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/', (req, res) => {
  User.findAll().then(users => {
    res.status(200).json({
      users
    })
  })
})

users.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
    .then(user => {
      if (user) {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.json({ user, token: token })
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
users.delete('/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    }).then(user => {
      res.json({
        message: 'user deleted!'
      })
    })
});

users.get('/departure', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
users.get('/getDetails', (req, res) => {
  User.findAll().then(user => {
    // Send all customers to Client
    res.json(user);
  });
})

module.exports = users