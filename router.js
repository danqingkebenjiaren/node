const express = require('express');
const c_use = require('./controllers/c_user');
const c_topic = require('./controllers/c_topic');
const router = express.Router();
router
  .get('/signin', c_use.showSignin)
  .post('/signin', c_use.headleSignin)
  .get('/', c_topic.showTopicList)
  .get('/topic/create', c_topic.showCreateTopic)
  .post('/createTopic', c_topic.headleCreateTopic)
  .get('/signout', c_use.headleSignout)
  .get('/detail/topic/:topicID', c_topic.showTopicDetail)
  .get('/topic/:topicID/delete', c_topic.headleDeleTopic)
  .get('/topic/:topicID/edit', c_topic.showEditTopic)
  .post('/edit/topic/:topicID', c_topic.handleEditTopic)
  .get('/signup', c_use.showSignup)
  .post('/signup', c_use.handleSignup);
module.exports = router;