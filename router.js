const express=require('express');
const c_use=require('./controllers/c_user')
const router=express.Router();
router.get("/",c_use.showSigin)
module.exports=router;