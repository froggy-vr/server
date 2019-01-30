const chai = require('chai')
const expect = chai.expect

const database = require('../helpers/database')


describe('Choosing database', function() {
  it('test environment', function() {
    expect(database('test')).to.equal('mongodb://localhost:27017/froggy_test')
  })
  it('production environment', function() {
    expect(database('prod')).to.equal('mongodb://kevin.tanuhardi:passwordHacktiv8@ds213645.mlab.com:13645/vroggy')
  })
})