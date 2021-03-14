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
app.use(express.static('./views/deletebus'));

app.post('/',(req, res) =>{
	console.log("trying to deleting out of service bus");
	console.log("email:" + req.body.serviceno);
    const serviceno=req.body.serviceno;
	
	const querystring4=mysql.format("select * from BusInfo where serviceno=?",[serviceno]);
	
	
	con.query(querystring4,(error, result)=>
	{
               console.log(result.length);
			   if(result.length>=1)
			   {
			   const querystring5=mysql.format("delete from BusInfo where serviceno=?",[serviceno]);
				   con.query(querystring5,(error, result)=>
	{
               if(error){
				   res.send(error);
				   return;
			   }
			   else{
	const querystring=mysql.format("select * from Buses where serviceno=?",[serviceno]);
	
	
	con.query(querystring,(error, result)=>
	{
               console.log(result.length);
			   if(result.length>=1)
			   {
			    
   //deleting Bus from table
   const querystring1=mysql.format("delete from Buses where serviceno=?",[serviceno]);
	
	
	con.query(querystring1,(error, result)=>
	{
               if(error){
				   res.send(error);
				   return;
			   }
			   else{
				   const querystring2=mysql.format("delete from seats where serviceno=?",[serviceno]);
	
	
	        con.query(querystring2,(error, result)=>
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
				   res.sendFile("/project/views/deletebus.html");
				   return;
	}});
			   
				}
				
	});
				
	}
	
				else{
					console.log("service number is not present");
					res.sendFile("/project/views/deletebus.html");
				return;
				}
	});
	
	
});

module.exports=app;