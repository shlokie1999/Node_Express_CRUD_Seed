var express = require('express');
var router = express.Router();
var connection = require('../routes/config/connection');


/* GET home page. */
router.get('/', function(req, res, next) {

//Connecting database

  connection.query('SELECT * FROM users',function (err,rows) {
    if (err) throw err;
    console.log(rows);
    res.render('index', { users:rows });
  });
  
  
});

module.exports = router;
