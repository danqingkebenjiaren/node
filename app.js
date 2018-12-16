// 1导入
const express = require('express');
const router = require('./router');
// 2、配置
const app = express();
app.engine('html', require('express-art-template'));
app.use("/public", express.static("./public"));
app.use("/node_modules", express.static("./node_modules"));
// // 配置静态资源
// app.use("/public", express.static("./public"));

// // 配置第三方资源
// app.use("/node_modules", express.static("./node_modules"));
// 3、路由使用
app.use(router);
// 4、监听使用
app.listen(7000, () => {
  console.log("run it ------ ");

})