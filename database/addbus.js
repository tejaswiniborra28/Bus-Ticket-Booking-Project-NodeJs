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
	console.log("trying to adding service fro bus");
	console.log("service number:" + req.body.serviceno);
	console.log("Travels:" + req.body.travels);
	console.log("starting time:" + req.body.sdate);
	console.log("end time:" + req.body.stime);
	console.log("starting time:" + req.body.edate);
	console.log("end time:" + req.body.etime);
	console.log("start:" + req.body.start);
	console.log("end point:" + req.body.end);
	console.log("cost of one seat:" + req.body.cost);
	
	console.log("cost of one seat:" + req.body.seats);
	
    const serviceno=req.body.serviceno;

	    const sdate=req.body.sdate;
	const stime=req.body.stime;
	    const edate=req.body.edate;
	const etime=req.body.etime;
	    const start=req.body.start;
	const end=req.body.end;
	    const cost=req.body.cost;
	
	if (serviceno.length !=4)
{
	console.log("please provide correct service number");
	res.sendFile("/project/views/addbus.html");
	return false;

}
else{
	const querystring1=mysql.format("select travels,seats from BusInfo where serviceno=?");
con.query(querystring1,[serviceno],(error, result)=>
	{
               console.log(result.length);
			   console.log(result[0].travels);                             
			                            
			     console.log(result[0].seats);                             
			     const travel=result[0].travels;
				 const seat=result[0].seats;
               if(result.length=0)
			   {
				   console.log("service does not exist");
				  res.sendFile("/project/views/addbus.html");
				   return false;
			   }
			   else{
		  	    
		  	      const querystring4=mysql.format("select * from Buses where serviceno=? and sdate=?");
                     con.query(querystring4,[serviceno,sdate],(error, result)=>
	{
               console.log(result.length);
               if(result.length>0)
			   { 
				   console.log("service for this date already exist");
				  res.sendFile("/project/views/addbus.html");
				   return false;
			   }
			   else{
		 
//inserting data into table
	const querystring=mysql.format("insert into Buses(serviceno,travels,sdate,stime,edate,etime,start,end,cost,seats) values (?,?,?,?,?,?,?,?,?,?)");

	
	con.query(querystring,[serviceno,travel,sdate,stime,edate,etime,start,end,cost,seat],(error, result)=>
	{

               if(error){
				   res.send(error);
				   return;
			   }
			   else{
			   for (i=1; i<=seat; i++){
			       const querystring2=mysql.format("insert into seats(serviceno,travels,sdate,edate,seatno,cost,status) values (?,?,?,?,?,?,?)");
                    const seatno=i;
					const status ='o'
					console.log(i);
	           con.query(querystring2,[serviceno,travel,sdate,edate,seatno,cost,status],(error, result)=>
	           {
                 
				 if(error){
				   res.send(error);
			   }
			   });
			   }
			   
			   res.sendFile("/project/views/adminmain.html");	   }
			   });}
			   });}
});}

	
});

module.exports=app;