const User = require('../models/User')

module.exports = {
  create: function(req,res,next){
    User.create({
      gameId: req.body.gameId
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
    User.findOneAndUpdate(
      {
        gameId: req.params.gameId
      },
      {
        highScore: req.body.highScore
      },
      {new: true}
    )
    .then((user) =>{
      res.status(201).json({user})
    })
    .catch(err =>{
      res.status(400).json({error: err.message})
    })
  }
}