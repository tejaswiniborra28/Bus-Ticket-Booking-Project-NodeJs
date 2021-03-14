const express = require('express');
const app=express();
var mysql = require('mysql');
//var con= require('./../config.js');
var jsalert= require("js-alert");



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
app.use(express.static('./views/login'));

app.post('/',(req, res) =>{
	console.log("trying to create new user");
	console.log("email:" + req.body.email);
	console.log("password:" + req.body.password);
    const email2=req.body.email;
	const password2=req.body.password;
	
	const querystring=mysql.format("select * from Persons where emailid=?",[email2]);
	
	
	con.query(querystring,(error, result)=>
	{
               console.log(result.length);
			   if(result.length>=1)
			   {
			    if (password2==result[0].password)
				{
					console.log("user able to login");
					console.log(result[0].type);
					if(result[0].type == "admin"){
					 res.sendFile("/project/views/adminmain.html");
					return;}
					else{
						jsalert.confirm("succesfully logged in");
						res.sendFile("/project/views/bussearch.html");
					return;
					}
				}
				else{
					console.log("please provide correct password");
					res.sendFile("/project/views/login.html");
					return;
				}
				
			  }
			   else
			   {
				   console.log("your are not user of this website please register");
				   res.sendFile("/project/views/signin.html");
				   return;
			   }
			   
				});
	
	
});

module.exports=app;