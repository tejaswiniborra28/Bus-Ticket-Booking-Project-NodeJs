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
app.use(express.static('./views/deletebus'));

app.post('/',(req, res) =>{
	console.log("trying to edit details of service bus");
	console.log("email:" + req.body.serviceno);
    const serviceno=req.body.serviceno;
	const sdate=req.body.sdate;
	const querystring=mysql.format("select * from Buses where serviceno=? and sdate=? ");
	
	
	con.query(querystring,[serviceno,sdate],(error, result)=>
	{
               console.log(result.length);
			   if(result.length>=1)
			   {
				   console.log(result[0].serviceno);
				   
				   res.render('/project/views/editservice', {
                      f : result});

	}
				
			  
			   else
			   {
				   console.log("serice number you provide currently not in working. please provide correct service number which you want to edit");
				   res.sendFile("/project/views/editbus.html");
				   return;
			   }
			   
				});
	
	
});

module.exports=app;