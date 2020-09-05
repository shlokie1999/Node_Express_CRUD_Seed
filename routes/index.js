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

router.post('/addUser', function (req, res) {
  const userdata = {
    fname:req.body.fname,
    lname:req.body.lname,
    email:req.body.email,
    prof:req.body.fname
  }

  console.log(userdata);
  res.send("data inserted");

  
})

module.exports = router;
