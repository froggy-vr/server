const express = require('express')
const app = express()
const port = 3001

const mongoose = require('mongoose')
mongoose.connect('mongodb://kevin.tanuhardi:passwordHacktiv8@ds213645.mlab.com:13645/vroggy')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//ROUTER
const usersRouter = require('./routes/users')

app.use('/users', usersRouter)

app.listen(port, () =>{
  console.log('Server running on port ' + port)
})

module.exports = app