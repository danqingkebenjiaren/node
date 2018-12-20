const M_topic = require('../models/m_topic');
const moment = require('moment');
exports.showTopicList = (req, res, next) => {
  // res.render("index.html");
  M_topic.findAllTopic((err, data) => {
    if (err) {
      return next(err)
    }
    // console.log(data);
    res.render("index.html", {
      topics: data
      // user: req.session.user
    });
  })
};
exports.showCreateTopic = (req, res, next) => {
  res.render("topic/create.html");
};
exports.headleCreateTopic = (req, res, next) => {
  const body = req.body;
  body.createdAt = moment().format();
  body.userId = req.session.user.id;
  M_topic.editTopic(body, (err, data) => {
    if (err) {
      return next(err)
    }
    res.send({
      code: 200,
      message: '添加成功'
    });
  })
};
exports.showTopicDetail = (req, res, next) => {
  // console.log(req.params);
  const topicID = req.params.topicID;
  console.log(topicID);
  M_topic.findTopicById(topicID, (err, data) => {
    // console.log(data)
    if (err) {
      return next(err)
    };
    // if (data.length === 0) {
    //   return res.send({
    //     code: 1,
    //     message: '文章已经被删除'
    //   });
    // }
    res.render("topic/show.html", {
      topic: data[0],
      sessionUserId: req.session.user ? req.session.user.id : 0
    });
  })

}
// 删除话题
exports.headleDeleTopic = (req, res, next) => {
  const topicID = req.params.topicID;
  console.log(topicID);

  M_topic.deleTopicById(topicID, (err, data) => {
    console.log(data);
    if (err) {
      return next(err)
    };
    res.redirect("/");
  });
};
// 渲染编辑也
exports.showEditTopic = (req, res, next) => {
  const topicID = req.params.topicID;
  // res.render('topic/edit.html');
  M_topic.findTopicById(topicID, (err, data) => {
    // console.log(data)
    if (err) {
      return next(err)
    };
    if (data.length === 0) {
      return res.send({
        code: 1,
        message: '文章已经被删除'
      });
    }
    res.render("topic/edit.html", {
      topic: data[0]
    });
  })
}
// 编辑页的修改
exports.handleEditTopic = (req, res, next) => {
  const body = req.body;
  const topicID = req.params.topicID;
  M_topic.editTopicById(topicID, body, (err, data) => {
    //  console.log(data);
    if (err) {
      return next(err)
    }
    res.send({
      code: 200,
      message: '添加成功'
    });
  })
}