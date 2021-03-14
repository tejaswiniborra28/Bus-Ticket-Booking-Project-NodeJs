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
app.use(express.static('./views/Booking.pug'));

app.post('/',(req, res) =>{
	console.log("trying to get details");
	var p=Object.values(req.body);
	console.log("service no:" + res[0]);
	console.log("travels:" + req.body.travels);
	console.log("sdate:"+req.body.sdate);
	console.log("cost:"+req.body.cost);
	console.log("emailid:"+req.body.emailid);
	console.log("phonenumber:"+typeof(parseInt(req.body.pno)));
	console.log("no of seats:"+req.body.seats);
	console.log("amount paid:"+req.body.Amount);
	console.log("account number:"+req.body.Account);
	console.log("cvv:"+res[res.length-1]);
	
   const serno=req.body.serviceno;
   const travels=req.body.travels;
   const dat=req.body.sdate;
   const cost=req.body.cost;
   const eid=req.body.emailid;
   const pno=parseInt(req.body.pno);
   const ns=parseInt(req.body.seats);
   const am=req.body.Amount;
   const ac=req.body.Account;
   const cvv=req.body.CVV;
   var tid=" ";
   var d=new Date(dat);
   console.log(d);
	const querystring=mysql.format("select count(*) as count from Book");
	
	con.query(querystring,(error, result)=>
	{
               console.log(result[0].count);
			   var c=result[0].count+1;
			   tid="T"+c;
			   if(error){
				   res.send(error);
				   return;
			   }
			   else{
				   	const querystring1=mysql.format("insert into Book(trans_id,serviceno,travels,sdate,cost,emailid,pno,noofseats,amount,accountno,cvv) values (?,?,?,?,?,?,?,?,?,?,?)");
                    	con.query(querystring1,[tid,serno,travels,d,cost,eid,pno,ns,am,ac,cvv],(error, result)=>
	                    {
			            if(error){
				         res.send(error);
				         return;
			             }
						 else{
							 var i=6;
							 while(i<p.length-4){
								 
							
				   	             const querystring2=mysql.format("insert into sbook(trans_id,seatno,name,age,gender) values (?,?,?,?,?)");
							 con.query(querystring2,[tid,p[i],p[i+1],p[i+2],p[i+3]],(error, result)=>
	                       {
			                 if(error){
                                res.send(error);
				               return;
			                  }
						   });
						   i=i+4;
							 }
						console.log(tid);
                	   const querystring3=mysql.format("select a.trans_id,serviceno,travels,sdate,cost,emailid,pno,noofseats,amount,accountno,cvv,seatno,name,age,gender from Book a join sbook b on a.trans_id=b.trans_id and a.trans_id=?");
                       con.query(querystring3,[tid],(error,result)=>
	                       {
							   console.log(result);
			                 if(error){
                                res.send(error);
				               return;
			                  }
							  else{
								  res.render("/project/views/receipt.pug",{f: result});
							  }
	
						   });
								 }
								 
								 
								 
						});
						
						 }
				       
			   });
			   
			   
	    
});

module.exports=app;