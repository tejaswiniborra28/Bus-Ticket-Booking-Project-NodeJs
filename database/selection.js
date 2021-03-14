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
app.use(express.static('./views/seats'));

app.post('/',(req, res) =>{
	console.log("seats selected");
	console.log(Object.keys(req.body));
	console.log(Object.values(req.body));
	var k=Object.values(req.body);
	var serno=k[k.length-4];
	console.log(serno);
	var travels=k[k.length-3];
	var dat=k[k.length-2];
	var cost=k[k.length-1];
	var d=new Date(dat);
	var s=[];
	var count=0;
	for(i=0;i<k.length-4;i++){
		console.log(parseInt(k[i]));
		var s1=parseInt(k[i]);
		s.push(s1);
		count=count+1;
	}
	
	const querystring=mysql.format("select seats from Buses where serviceno=? and travels=? and sdate=?");
	
con.query(querystring,[serno,travels,d],(error, result)=>
	{
               console.log(result[0].seats);
                useatno=result[0].seats;
               if(error){
				   res.send(error);
				   return;
			   }
			   else{
				
				const querystring1=mysql.format("update Buses set seats=? where serviceno=? and travels=? and sdate=?");
	            var upseats=useatno-count;
                con.query(querystring1,[upseats,serno,travels,d],(error, result)=>
	           {
                
                if(error){
				   res.send(error);
				   return;
			       }
				   else{
                const querystring2=mysql.format("update seats set status=? where serviceno=? and travels=? and sdate=? and seatno in ?");
	            var ustatus="B";
                con.query(querystring2,[ustatus,serno,travels,d,[s]],(error, result)=>
	           {
                
                if(error){
				   res.send(error);
				   return;
			       } 
				   else{
					   const querystring3=mysql.format("select * from seats where serviceno=? and travels=? and sdate=? and seatno in ?");
                con.query(querystring3,[serno,travels,d,[s]],(error, result)=>
	           {
                
                if(error){
				   res.send(error);
				   return;
			       } 
				   else{
					   res.render("/project/views/Booking.pug",{
                      f : result});
				   }
			   });
			   }});
					   
			   }});
				
	}});
			   
			   
			   
		
	
	
	
});

module.exports=app;