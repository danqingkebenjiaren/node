const connection = require('../config/db_config');

exports.findAllTopic = (callback) => {
  const sqlstr = 'SELECT *FROM `topics`ORDER BY id DESC';
  connection.query(sqlstr, (err, data) => {
    if (err) {
      return callback(err, null);
    };
    callback(null, data);
  })
}
// 添加新文章
exports.addTopic = (body, callback) => {
  const sqlstr = 'INSERT INTO `topics` set ?';
  connection.query(sqlstr, body, (err, data) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, data);
  })
}
exports.findTopicById = (topicID, callback) => {
  const sqlstr = 'SELECT *FROM `topics` WHERE id =?';
  connection.query(sqlstr, topicID, (err, data) => {
    if (err) {
      return callback(err, null);
    };
    callback(null, data);
  })
}
// 删除话题
exports.deleTopicById = (topicID, callback) => {
  const sqlstr = 'DELETE FROM `topics`WHERE id=?';
  connection.query(sqlstr, topicID, (err, data) => {
    if (err) {
      return callback(err, null);
    };
    callback(null, data);
  })
}
// 编辑页面
exports.editTopicById = (topicID, body, callback) => {
  const sqlstr = 'UPDATE `topics` SET ? WHERE id=?';
  connection.query(sqlstr, [body, topicID], (err, data) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, data);
  });
}