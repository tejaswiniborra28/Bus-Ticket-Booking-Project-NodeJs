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
app.use(express.static('./views/signin'));

app.post('/',(req, res) =>{
	console.log("trying to create new user");
	console.log("name:" + req.body.name);
	console.log("gender:" + req.body.gender);
    console.log("phonenumber:" + req.body.phonenumber);
	console.log("email:" + req.body.emailid);
	console.log("password:" + req.body.password);
    console.log("email:" + req.body.type);
	const name1=req.body.name;
	const gender=req.body.gender; 
    const phone=req.body.phonenumber;	
    const email1=req.body.emailid;
	const password1=req.body.password;
	const type=req.body.type;
   
	//validations
	


//email validation	
var exp=/^([A-Za-z0-9_.-])+@([A-Za-z0-9-])+.([A-Za-z0-9]){2,4}$/;
var exp1=/^([A-Z])([A-Za-z0-9$#@!&*^_-])+$/;

if (!exp.test(email1))
{
	console.log("please provide correct email");
	res.sendFile("/project/views/signin.html");
	return false;

}

// password validation


else if(password1.length <7 || password1.length >10 )
{
		console.log("please provide correct password length should be greater than 7 and less than 10");
	  res.sendFile("/project/views/signin.html");
	  return false;

}
else if(!exp1.test(password1))
{
	console.log("please provide correct password it should start with capital letter and contian special character ");
	res.sendFile("/project/views/signin.html");
	  return false;
}

//phone number validation
else if(phone.length != 10)
{
	console.log("please provide correct 10 digit number");
	res.sendFile("/project/views/signin.html");
	return false;

}



else{
	// already signed user
	const querystring1=mysql.format("select * from Persons where emailid=?",[email1]);
con.query(querystring1,(error, result)=>
	{
               console.log(result.length);
               if(result.length>0)
			   {
				   console.log(" account is already present");
				 
				   return false;
			   }
	else{
	
	//inserting data into table
	const querystring=mysql.format("insert into Persons(name,gender,phonenumber,emailid,password,type) values (?,?,?,?,?,?)");

	con.query(querystring,[name1,gender,phone,email1,password1,type],(error, result)=>
	{
               
              if (error) {
                res.send(error);
				return;
              }
			  console.log("success");
			  res.sendFile("/project/views/login.html");
				});

}

});

}

});

module.exports=app;