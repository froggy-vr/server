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
      res.status(400).json(err)
    })
  },
  all: function(req,res,next){
    User.find({})
    .then((users) =>{
      res.status(200).json({users})
    })
    .catch((err) =>{
      res.status(400).json(err)
    })
  },
  findOne: function(req,res,next){
    User.findOne({gameId: req.params.gameId})
    .then( user =>{
      res.status(200).json({user})
    })
    .catch(err =>{
      res.status(400).json(err)
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
      res.status(400).json(err)
    })
  }
}