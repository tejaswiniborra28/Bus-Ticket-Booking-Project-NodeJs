const express = require('express');
const app=express();
var mysql = require('mysql');
//var con= require('./../config.js');



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Test@123",
  database: "Mydb"
});

con.connect();

const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('./views/deleteservice'));

app.post('/',(req, res) =>{
	console.log("trying to deleting Bus service");
	console.log("service number:" + req.body.serviceno);
	console.log("start date:"+req.body.sdate);
    const serviceno=req.body.serviceno;
	const sdate=req.body.sdate;
	const querystring=mysql.format("select * from Buses where serviceno=? and sdate=?");
	
	
	con.query(querystring,[serviceno,sdate], (error, result)=>
	{
               console.log(result.length);
			   if(result.length>=1)
			   {
			    
   //deleting Bus from bus table
   const querystring1=mysql.format("delete from Buses where serviceno=? and sdate=?");
	
	
	con.query(querystring1,[serviceno,sdate],(error, result)=>
	{
               if(error){
				   res.send(error);
				   return;
			   }
			   else{
				   const querystring2=mysql.format("delete from seats where serviceno=? and sdate=?");
	
	
	        con.query(querystring2,[serviceno,sdate],(error, result)=>
	      {
               if(error){
				   res.send(error);
				   return;
			   }
			   else{
			   res.sendFile("/project/views/adminmain.html");}
		  });
	}
	});
				
			  }
			   else
			   {
				   console.log("serice number you provide currently not in working. please provide correct service number which you wnat to delete");
				   res.sendFile("/project/views/deleteservice.html");
				   return;
	}
	
	});
			   
				
			
	
	
});

module.exports=app;