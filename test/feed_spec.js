
TEST_USERS = require('/tmp/readerTestCreds.js');
 
var frisby = require('frisby');
var tc = require('./config/test_config');
var async = require('async');
var dbConfig = require('./config/db.js');
 
var dilbertFeedURL = 'http://feeds.feedburner.com/DilbertDailyStrip';
var nycEaterFeedURL = 'http://feeds.feedburner.com/eater/nyc';

function addEmptyFeedListTest(callback) {
 	var user = TEST_USERS[0];
 	frisby.create('GET empty feed list for user ' + user.email)
             .get(tc.url + '/feeds')
             .auth(user.sp_api_key_id, user.sp_api_key_secret)
             .expectStatus(200)
             .expectHeader('Content-Type', 'application/json; charset=utf-8')
             .expectJSON({feeds : []})
             .toss()
             callback(null);
}
