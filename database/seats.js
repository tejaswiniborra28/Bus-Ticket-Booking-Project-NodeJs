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
app.use(express.static('./views/availbuses'));

app.post('/',(req, res) =>{
	console.log("trying to get seat details of bus");
	console.log("service no:" + req.body.serviceno);
	console.log("travels:" + req.body.travels);
    console.log("start date:" + typeof(req.body.sdate));
	console.log("end date:" + req.body.edate);
   const serno=req.body.serviceno;
   const travels=req.body.travels;
   const edate=req.body.edate;
   const dat=req.body.sdate;
   var d=new Date(dat);
   console.log(d);
	const querystring=mysql.format("select * from seats where serviceno=? and travels=? and sdate=? order by seatno");
	
	con.query(querystring,[serno,travels,d],(error, result)=>
	{
               console.log(result.length);
			   if(result.length>=1)
			   {
			    res.render("/project/views/seats.pug",{
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