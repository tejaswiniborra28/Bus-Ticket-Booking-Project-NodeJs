const express = require('express');
const app=express();
//database
var mysql = require('mysql');
var con= require('./config.js');

//main page
app.use('/',require('./routes/main.js'));

//login page
app.use('/login_user',require('./routes/login.js'));
 /*app.post('/login_user',(req, res) =>
	res.sendFile("/project/views/login.html")); */
	
//signin page
app.use('/signin_user',require('./routes/signin.js')); 

/*app.post('/signin_user',(req, res) =>
	res.sendFile("/project/views/signin.html"));*/

//admin main page

//admin main page
app.use('/admin_bus',require('./routes/addbuses.js'));

app.use('/admin_add_bus',require('./routes/addbus.js'));

app.use('/admin_delete_bus',require('./routes/deletebus.js'));

app.use('/admin_delete_service',require('./routes/deleteservice.js'));

app.use('/admin_edit_bus',require('./routes/editbus.js'));

	
//request back from main html page 
app.use(express.static('./views/main'));
	
//request back from signin html page
app.use(express.static('./views/signin'));

//signin user stored to database
app.use('/signin_data',require('./database/signin.js')); 

//request back from login html page
app.use(express.static('./views/login'));

//login user stored from database
app.use('/login_data',require('./database/login.js')); 


//request back from admin html page
app.use(express.static('./views/adminmain'));

//Buses stored to database
app.use('/addbus',require('./database/addbus.js')); 


//request back from deletebus html page
app.use(express.static('./views/deletebus'));

//login user stored from database
app.use('/deletebus',require('./database/deletebus.js')); 

//request back from deletebus html page
app.use(express.static('./views/deleteservice'));

//login user stored from database
app.use('/deleteservice',require('./database/deleteservice.js')); 



//request back from add new bus(Add new Buses) html page
app.use(express.static('./views/addbuses'));

//login user stored from database
app.use('/addbuses',require('./database/addbuses.js')); 


//request back from editbus html page
app.use(express.static('./views/editbus'));

// user stored from database
app.use('/editbus',require('./database/editbus.js')); 


//request back from editservice html page
app.use(express.static('./views/editservice'));

// update stored from database
app.use('/update-details',require('./database/editservice.js')); 



//request back from bussearch html page
app.use(express.static('./views/bussearch'));

// to get data from database from database
app.use('/bussearch',require('./database/bussearch.js')); 



//request back from available buses pug page
app.use(express.static('./views/availbuses'));

// to get data from database from database
app.use('/seats',require('./database/seats.js')); 


//request back from seats pug page
app.use(express.static('./views/seats'));

// to store detailsin database
app.use('/selection',require('./database/selection.js'));


//request back from booking pug page
app.use(express.static('./views/Booking'));

// to store details in database
app.use('/details',require('./database/details.js')); 


//request back from booking pug page
app.use(express.static('./views/receipt'));

// to route page
app.use('/final',require('./routes/final.js')); 


const port=process.env.port || 8000;

app.listen(port, console.log('server start on port'+ port));
