const mysql = require('mysql');

// Konekcija sa bazom
var mysqlConnection = mysql.createConnection({  
     host     : 'localhost',
     user     : 'root',
     password : '',
     database : 'rentit' 
  });  
mysqlConnection.connect(function(err) {  
    if (err) throw err;  
    console.log("MYSQL Connected!");  
});


module.exports = mysqlConnection;