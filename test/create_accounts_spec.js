TEST_USERS = [{'fn' : 'Test', 'ln' : 'User1',
               'email' : 'testuser1@example.com', 'pwd' : 'testUser123'},
              {'fn' : 'Test', 'ln' : 'User2',
               'email' : 'testuser2@example.com', 'pwd' : 'testUser123'},
              {'fn' : 'Test', 'ln' : 'User3',
               'email' : 'testuser3@example.com', 'pwd' : 'testUser123'}]

SP_APP_NAME = 'Reader Test';

var frisby = require('frisby');
var tc = require('./config/test_config');

TEST_USERS.forEach(function createUser(user, index, array) {
    frisby.create('POST enroll user ' + user.email)
        .post(tc.url + '/user/enroll',
              { 'firstName' : user.fn,
                'lastName' : user.ln,
                'email' : user.email,
                'password' : user.pwd })
        .expectStatus(201)
        .expectHeader('Content-Type', 'application/json; charset=utf-8')
        .expectJSON({ 'firstName' : user.fn,
                      'lastName' : user.ln,
                      'email' : user.email })
        .toss()
});

// test for duplicate user
