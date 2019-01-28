const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
  gameId: String,
  highScore: Number,
})

let User = mongoose.model('User', usersSchema)

module.exports = User