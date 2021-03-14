const express = require('express');
const app=express();
var mysql = require('mysql');
//var con= require('./../config.js');


app.set('view engine', 'pug');
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
app.use(express.static('./views/editservice.pug'));

app.post('/',(req, res) =>{
	console.log("trying to updating out of service bus");
	console.log("serviceno:" + req.body.serviceno);
	
	console.log("serviceno:" + req.body.stime);
	
	console.log("serviceno:" + req.body.etime);
	console.log("serviceno:" + req.body.start);
	console.log("serviceno:" + req.body.end);
	console.log("serviceno:" + req.body.cost);
    const serviceno=req.body.serviceno;   
	 
	const stime=req.body.stime;  
	
    const etime=req.body.etime;  
    const start=req.body.start;  
    const end=req.body.end;   
	const cost=req.body.cost;
    const seats=req.body.seats;	
	const querystring=mysql.format("Update Buses set stime=?,etime=?,start=?,end=?,cost=? where serviceno=?");
	
	var data=[stime,etime,start,end,cost,serviceno];
	con.query(querystring,data,(error, result)=>
	{
			     if (error) {
                res.send(error);
				return;
              }
			  else{
				  const querystring1=mysql.format("Update seats set cost=?,status=? where serviceno=?");
	
	             var data1=[cost,"o",serviceno];
	             con.query(querystring1,data1,(error, result)=>
	            {
                 console.log("updated");
			      if (error) {
                 res.send(error);
				 return;
               }
			   else{
				              console.log("updated");

				   			  res.sendFile("/project/views/adminmain.html");}

			  });
				  
			  }
			  
			  
			  
				});
	
	
});

module.exports=app;