const express = require('express');
const router = express.Router();


router.get('/',(req,res)=> res.sendFile("/project/views/editbus.html"));


module.exports=router;