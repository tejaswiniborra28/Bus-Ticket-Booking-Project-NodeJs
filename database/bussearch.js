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
app.use(express.static('./views/bussearch'));

app.post('/',(req, res) =>{
	console.log("trying to get details of buses");
	console.log("start point:" + req.body.start);
	console.log("end point:" + req.body.end);
	console.log("start date:"+req.body.sdate);
   const start1=req.body.start;
	const end1=req.body.end;
	const sdate=req.body.sdate;
	console.log("start point:" + start1);
	console.log("end point:" + end1);

	const querystring=mysql.format("select * from Buses where start=? and end=? and sdate=?");
	
	
	con.query(querystring,[start1,end1,sdate],(error, result)=>
	{
               console.log(result.length);
			   if(result.length>=1)
			   {
			    res.render("/project/views/availbuses.pug",{
                      f : result});
				}
				
			   else
			   {
				   console.log("Buses to this route are not available");
				   res.sendFile("/project/views/bussearch.html");
				   return;
			   }
			   
				});
	
	
});

module.exports=app;