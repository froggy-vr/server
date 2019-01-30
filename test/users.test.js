const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

const expect = chai.expect
chai.use(chaiHttp);

const User = require('../models/User')

describe('User tests', function () {
  afterEach(done => {
    User.deleteMany({}, err => {
      done()
    })
  })

  describe('POST /', function () {
    it('creating new user should return an object of new user with 201 status code', function (done) {
      let user = {
        gameId: 'abc123'
      }
      chai
        .request(app)
        .post('/users')
        .send(user)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('user');
          expect(res.body.user).to.have.property('gameId');
          expect(res.body.user.gameId).to.equal(user.gameId)
          done()
        })
    })

    it('creating new user without gameId should error with status code 400', function (done) {
      chai
        .request(app)
        .post('/users')
        .send({})
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done()
        })
    })
  })

  describe('GET /', function () {
    it('fetching all users data should return an object containing users with 200 status code', function (done) {
      chai
        .request(app)
        .get('/users')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('users');
          expect(res.body.users).to.be.an('array');
          done()
        })
    })
  });

  describe('GET /:id,', function () {
    let user = {
      gameId: 'abc123'
    }

    before(function (done) {
      chai
        .request(app)
        .post('/users')
        .send(user)
        .end(function (err, res) {
          done()
        })
    })

    it('fetching user by gameId should return the user with 200 status code', function (done) {
      chai
        .request(app)
        .get(`/users/${user.gameId}`)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('user');
          expect(res.body.user).to.be.an('object');
          expect(res.body.user).to.have.property('gameId');
          expect(res.body.user.gameId).to.equals(user.gameId);
          done()
        })
    })

    it('fetching user with invalid gameId', function (done) {
      chai
        .request(app)
        .get(`/users/zzzzzz`)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('user');
          expect(res.body.user).to.be.null;
          done()
        })
    })
  })

  describe('PATCH /:id', function () {
    let user = {
      gameId: 'abc123',
    }

    beforeEach(function (done) {
      chai
        .request(app)
        .post('/users')
        .send(user)
        .end(function (err, res) {
          done()
        })
    })

    it('updating user should return the user with new data with status code 201', function (done) {
      let updated = {
        highScore: 5
      }
      chai
        .request(app)
        .patch(`/users/${user.gameId}`)
        .send(updated)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('user');
          expect(res.body.user).to.have.property('gameId');
          expect(res.body.user).to.have.property('highScore');
          expect(res.body.user.gameId).to.equal(user.gameId);
          expect(res.body.user.highScore).to.eqls(updated.highScore);
          done()
        })
    })

    describe('patching with lower value', function() {
      beforeEach(function(done) {
        chai
          .request(app)
          .patch(`/users/${user.gameId}`)
          .send({highScore: 3})
          .end(function (err, res) {
            done()
          })
      })

      it('should error with status code 400', function (done) {
        let updated = {
          highScore: 1
        }
        chai
          .request(app)
          .patch(`/users/${user.gameId}`)
          .send(updated)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            done()
          })
      })
    })

    it('patching with negative value should error with status code 400', function (done) {
      let updated = {
        highScore: -2
      }
      chai
        .request(app)
        .patch(`/users/${user.gameId}`)
        .send(updated)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done()
        })
    })

    it('patching with invalid value should error with status code 400', function (done) {
      let updated = {
        highScore: 'assdd'
      }
      chai
        .request(app)
        .patch(`/users/${user.gameId}`)
        .send(updated)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done()
        })
    })
  })
});
