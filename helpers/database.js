const database = environment => {
  return environment === 'test'
  ? 'mongodb://localhost:27017/froggy_test'
  : 'mongodb://kevin.tanuhardi:passwordHacktiv8@ds213645.mlab.com:13645/vroggy'
}

module.exports = database