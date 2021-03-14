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
app.use(express.static('./views/adminmain'));

app.post('/',(req, res) =>{
	console.log("trying to add new bus");
	console.log("service number:" + req.body.serviceno);
	console.log("Travels:" + req.body.travels);
	console.log("No of seats:" + req.body.seats);
	
    const serviceno=req.body.serviceno;
	const travels=req.body.travels;
	const seats=req.body.seats;
	
	if (serviceno.length !=4)
{
	console.log("please provide correct service number");
	res.sendFile("/project/views/addbus.html");
	return false;

}
else{
	const querystring1=mysql.format("select * from BusInfo where serviceno=?",[serviceno]);
con.query(querystring1,(error, result)=>
	{
               console.log(result.length);
               if(result.length>0)
			   {
				   console.log("Bus is already added ");
				  res.sendFile("/project/views/addbuses.html");
				   return false;
			   }
			   else{
	
//inserting data into table
	const querystring=mysql.format("insert into BusInfo(serviceno,travels,seats) values (?,?,?)");

	
	con.query(querystring,[serviceno,travels,seats],(error, result)=>
	{

               if(error){
				   res.send(error);
				   return;
			   }
			   else{

		res.sendFile("/project/views/adminmain.html");	   
	}
	}
);
			   }			
});}
	
});

module.exports=app;