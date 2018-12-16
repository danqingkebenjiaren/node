// 1导入
const express=require('express');
const router=require('./router');
// 2、配置
const app=express();
// 3、路由使用
app.use(router);
// 4、监听使用
app.listen(7000,()=>{
  console.log("run it ------ ");
  
})