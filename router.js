const express=require('express');
const c_use=require('./controllers/c_user')
const router=express.Router();
router.get("/signin",c_use.showSignin)
module.exports=router;