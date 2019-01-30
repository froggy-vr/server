const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
  gameId: {
    type: String,
    required: true
  },
  highScore: Number,
})


let User = mongoose.model('User', usersSchema)

module.exports = User