const express = require('express');
const router = express.Router();


router.get('/',(req,res)=> res.sendFile("/project/views/addbuses.html"));


module.exports=router;