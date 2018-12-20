const M_user = require('../models/m_use');
// const session=require('express-session');
exports.showSignin = (req, res,next) => {
  res.render('signin.html');
};


exports.headleSignin = (req, res,next) => {
  const body = req.body;
  // console.log(body);
  M_user.checkEmail(body.email, (err, data) => {
    if (err) {
      return next(err);
    }
    // console.log(results);
    // 如果邮箱不存在
    if (data.length === 0) {
      return res.send({
        code: 1,
        message: "邮箱不存在"
      });
    }
    // 如果邮箱存在
    // 2 如果邮箱验证通过, 再验证这个邮箱对应的密码
    if (data[0].password != body.password) {
      return res.send({
        code: 2,
        message: "密码不对"
      });
    }
    req.session.user = data[0];
    // console.log(req.session.user);

    // 3 如果都验证通过 res.send("");
    res.send({
      code: 200,
      message: "邮箱和密码都正确,可以登陆了"
    });
  })
}
exports.headleSignout = (req, res,next) => {
  // 清除session 
  delete sessionUser;
  res.redirect('/signin');
}
//渲染注册页面
exports.showSignup = (req, res,next) => {
  res.render('signup.html')
}
// 处理注册页面数据
exports.handleSignup = (req, res,next) => {
  const body = req.body;
  M_user.checkEmail(body.email, (err, data) => {
    if (err) {
      return next(err);
    }
    // console.log(results);
    // 如果邮箱存在
    if (data[0]) {
      return res.send({
        code: 1,
        message: "邮箱已存在"
      });
    }
    // 邮箱存在，验证昵称
    M_user.checkNickname(body.nickname, (err, data) => {
      if (err) {
        return res.send({
          code: 500,
          message: err.massage
        });
      }
      // 昵称存在
      if (data[0]) {
        return res.send({
          code: 1,
          message: "昵称已存在"
        });
      }
      M_user.insertUser(body, (err, data) => {
        if (err) {
          return next(err);
        }
        res.send({
          code: 200,
          massage: '跳转到登录页'
        })
      })
    })
  })
}