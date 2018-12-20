const connection = require('../config/db_config')
exports.checkEmail = (email, callback) => {
  const sqlStr = "SELECT *FROM `users` WHERE `email`=?";
  connection.query(sqlStr, email, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  })
};
exports.checkNickname = (nickname, callback) => {
  const sqlStr = "SELECT *FROM `users` WHERE `nickname`=?";
  connection.query(sqlStr, nickname, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  })
};
exports.insertUser = (body, callback) => {
  const sqlStr = "INSERT INTO `users` SET ?";
  connection.query(sqlStr, body, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  })
};