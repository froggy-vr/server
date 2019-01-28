const User = require('../models/User')

module.exports = {
  create: function(req,res,next){
    User.create({
      gameId: req.body.gameId
    })
    .then((newUser) =>{
      res.status(200).json({user:newUser})
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
    User.findById(req.params.id)
    .then( user =>{
      res.status(200).json({user})
    })
    .catch(err =>{
      res.status(400).json(err)
    })
  },
  update: function(req,res,next){
    User.findByIdAndUpdate(
      req.params.id,
      {
        highScore: req.body.highScore
      },
      {new: true}
    )
    .then((user) =>{
      res.status(200).json({user})
    })
    .catch(err =>{
      res.status(400).json(err)
    })
  }
}