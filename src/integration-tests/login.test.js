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
    ERROR_MSG_LOGIN_EMPTY_FIELDS,
    ERROR_MSG_INVALID_LOGIN,
  } = require('../api/utilities/constants/message-constants');

describe('2 - Login', () => {
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

    describe('POST /login', () => {
        const route = '/login';

        beforeEach(() => {
            userInfo = userStub.getNormalUser();
        });          

        it('should not be possible to log in without passing "email".', (done) => {
            const loginInfo = {
                password: userInfo.password
            };

            requester
                .post(route)
                .send(loginInfo)
                .end((err, res) => {
                    res.should.have.status(ERROR_MSG_LOGIN_EMPTY_FIELDS.httpStatus);  
                    res.body.should.have.property('message').equal(ERROR_MSG_LOGIN_EMPTY_FIELDS.message);
                    done();
                });
        });

        it('should not be possible to log in without passing "password".', (done) => {
            const loginInfo = {
                email: userInfo.email
            };

            requester
                .post(route)
                .send(loginInfo)
                .end((err, res) => {
                    res.should.have.status(ERROR_MSG_LOGIN_EMPTY_FIELDS.httpStatus);  
                    res.body.should.have.property('message').equal(ERROR_MSG_LOGIN_EMPTY_FIELDS.message);
                    done();
                });
        });

        it('should not be possible to log in with an invalid "email".', (done) => {
            const loginInfo = {
                email: "invalid-email.com",
                password: userInfo.password
            };

            requester
                .post(route)
                .send(loginInfo)
                .end((err, res) => {
                    res.should.have.status(ERROR_MSG_INVALID_LOGIN.httpStatus);  
                    res.body.should.have.property('message').equal(ERROR_MSG_INVALID_LOGIN.message);
                    done();
                });
        });

        it('should not be possible to log in with an inexisting user.', (done) => {
            const loginInfo = {
                email: userInfo.email,
                password: userInfo.password
            };

            requester
                .post(route)
                .send(loginInfo)
                .end((err, res) => {
                    res.should.have.status(ERROR_MSG_INVALID_LOGIN.httpStatus);  
                    res.body.should.have.property('message').equal(ERROR_MSG_INVALID_LOGIN.message);
                    done();
                });
        });

        it('should not be possible to log in.', (done) => {
            const loginInfo = {
                email: userInfo.email,
                password: userInfo.password
            };

            db.collection('users').insertOne(userInfo);

            requester
                .post(route)
                .send(loginInfo)
                .end((err, res) => {
                    res.should.have.status(200);  
                    res.body.should.have.property('token');
                    done();
                });
        });
    });
});