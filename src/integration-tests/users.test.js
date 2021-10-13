const app = require('../api/server');

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const mongoDbUrl = 'mongodb://localhost:27017/Cookmaster';
const url = 'http://localhost:3000';
var requester = chai.request.agent(url);

const { MongoClient } = require('mongodb');

const userStub = require('./stubs/users.stubs');

const { 
  ERROR_MSG_INVALID_ENTRIES, 
  ERROR_MSG_LOGIN_MISSING_TOKEN,
  ERROR_MSG_USER_ALREADY_EXISTS,
  ERROR_MSG_ONLY_ADMINS_ACTION,
} = require('../api/utilities/constants/message-constants');

describe('1 - Users', () => {
  let connection;
  let db;
  let userInfo;

  before(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('Cookmaster');
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
  });

  after(async () => {
    await connection.close();
  });

  describe('POST /users', () => {
    const route = '/users';

    beforeEach(() => {
      userInfo = userStub.getNormalUser();
    });

    it('should not be possible to insert a new user with "name" field missing.', (done) => {
      delete userInfo.name;
  
      requester
        .post(route)
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(ERROR_MSG_INVALID_ENTRIES.httpStatus);  
          res.body.should.have.property('message').equal(ERROR_MSG_INVALID_ENTRIES.message);
          done();
        });
    });
  
    it('should not be possible to insert a new user with "email" field missing.', (done) => {
      delete userInfo.email;
  
      requester
        .post(route)
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(ERROR_MSG_INVALID_ENTRIES.httpStatus);  
          res.body.should.have.property('message').equal(ERROR_MSG_INVALID_ENTRIES.message);
          done();
        });
    });
  
    it('should not be possible to insert a new user with "password" field missing.', (done) => {
      delete userInfo.password;
  
      requester
        .post(route)
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(ERROR_MSG_INVALID_ENTRIES.httpStatus);  
          res.body.should.have.property('message').equal(ERROR_MSG_INVALID_ENTRIES.message);
          done();
        });
    });
  
    it('should not be possible to insert a new  with an invalid "email".', (done) => {
      userInfo.email = "vinicius.com";
  
      requester
        .post(route)
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(ERROR_MSG_INVALID_ENTRIES.httpStatus);  
          res.body.should.have.property('message').equal(ERROR_MSG_INVALID_ENTRIES.message);
          done();
        });
    });

    it('should not be possible to insert a new with an already registered "email".', (done) => {
      db.collection('users').insertOne(userInfo);
  
      requester
        .post(route)
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(ERROR_MSG_USER_ALREADY_EXISTS.httpStatus);  
          res.body.should.have.property('message').equal(ERROR_MSG_USER_ALREADY_EXISTS.message);
          done();
        });
    });
  
    it('should be possible to insert a new user.', (done) => {
      requester
        .post(route)
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(201); 
          res.body.should.have.property('user').that.has.property('name').equal(userInfo.name);
          res.body.should.have.property('user').that.has.property('email').equal(userInfo.email);
          res.body.should.have.property('user').that.has.property('email').equal(userInfo.email); 
          done();
        });
    });
  });

  describe('POST /users/admin', () => {
    const route = '/users/admin';

    beforeEach(() => {
      userInfo = userStub.getAdminUser();
    });

    it('should not be possible to insert a new admin user without being logged in.', (done) => {
      requester
        .post(route)
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(ERROR_MSG_LOGIN_MISSING_TOKEN.httpStatus);
          res.body.should.have.property('message').equal(ERROR_MSG_LOGIN_MISSING_TOKEN.message);
          done();
        });
    });

    it('should not be possible to insert a new admin user logged in as a normal user.', (done) => {
      requester
        .post(route)
        .set({ 'Authorization': userStub.getNormalUserToken() })
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(ERROR_MSG_ONLY_ADMINS_ACTION.httpStatus);
          res.body.should.have.property('message').equal(ERROR_MSG_ONLY_ADMINS_ACTION.message);
          done();
        });
    });

    it('should be possible to insert a new admin user.', (done) => {
      requester
        .post(route)
        .set({ 'Authorization': userStub.getAdminUserToken() })
        .send(userInfo)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('user').that.has.property('name').equal(userInfo.name);
          res.body.should.have.property('user').that.has.property('email').equal(userInfo.email);
          res.body.should.have.property('user').that.has.property('email').equal(userInfo.email);
          done();
        });
    });
  });
});