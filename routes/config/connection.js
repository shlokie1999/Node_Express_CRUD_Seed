var mysql = require('mysql');
var db;
var settings = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_crud'
}

function connectDB() {
    if(!db){
        db = mysql.createConnection(settings);

        db.connect(function (err) {
           if(!err){
               console.log("Database connected");
           } else{
            console.log("Error Database connection");  
           } 
        })

    }
    return db;
}

module.exports = connectDB();