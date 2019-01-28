const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
  title: String,
  poster_path: String,
  overview: String,
  popularity: Number,
  tag: []
})

let User = mongoose.model('User', usersSchema)

module.exports = User