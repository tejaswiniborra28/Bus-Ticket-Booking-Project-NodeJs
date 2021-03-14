var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Test@123",
  database: "Mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});