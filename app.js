// 1导入
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const MySQLStore = require('express-mysql-session')(session);
 
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'news'
};
 
const sessionStore = new MySQLStore(options);
 
// 2、配置
const app = express();
// 配置morgan
app.use(morgan("tiny"));
app.engine('html', require('express-art-template'));
app.use("/public", express.static("./public"));
app.use("/node_modules", express.static("./node_modules"));
app.use(bodyParser.urlencoded({
  extended: false
}));


// // 配置静态资源
app.use("/public", express.static("./public"));

// // 配置第三方资源
app.use("/node_modules", express.static("./node_modules"));
// 配置express-session包 req.session
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }))
// 配置express-mysql-session
app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));
// 公共成员
app.use((req, res, next) => {
  app.locals.sessionUser = req.session.user;
  // 不要忘记调用next()
  next();
});
// 3、路由使用
app.use(router);
// 处理404错误
// app.use((req, res, next) => {
//   res.render("404.html");
// });
app.use((err, req, res, next) => {
  res.send({
      code: 500,
      message: err.message
  });
});
// 4、监听使用
app.listen(7000, () => {
  console.log("run it ------ ");

})