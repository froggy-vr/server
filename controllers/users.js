const User = require('../models/User')

module.exports = {
  create: function(req,res,next){
    User.create({
      gameId: req.body.gameId,
      highScore: 0
    })
    .then((newUser) =>{
      res.status(201).json({user:newUser})
    })
    .catch((err) =>{
      res.status(400).json({error: err.message})
    })
  },
  all: function(req,res,next){
    User.find({}, (err, users) => {
      res.status(200).json({users})
    })
  },
  findOne: function(req,res,next){
    User.findOne({gameId: req.params.gameId}, (err, user) => {
      res.status(200).json({user})
    })
  },
  update: function(req,res,next){
    User.findOne({ gameId: req.params.gameId })
    .then((user) => {
      if (req.body.highScore < 0) {
        throw Error('value should be positive')
      } else if (req.body.highScore < user.highScore) {
        throw Error('new highcore value should be higher')
      } else {
        user.highScore = req.body.highScore
        return user.save()
      }
    })
    .then((user) =>{
      res.status(201).json({user})
    })
    .catch(err =>{
      res.status(400).json({error: err.message})
    })
  }
}