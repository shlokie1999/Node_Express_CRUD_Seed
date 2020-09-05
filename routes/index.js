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
    prof:req.body.prof
  }

  console.log(userdata);
  connection.query("INSERT INTO users SET ?",userdata,function (err, result) {

    if(err) throw err;
    res.redirect('/');
    
  });
 

  
});
router.get('/deleteUser/:id',function(req, res) {
  var userid = req.params.id;
  connection.query("DELETE FROM users WHERE id = ?",[userid],function (err,rows) {
  if(err) throw err;
  res.redirect('/')
    
  })
  
});

router.get('/editUser/:id',function (req,res) {
 var userid=req.params.id;
 connection.query("SELECT * FROM users WHERE id=?",[userid],function (err,rows) {
  if(err) throw err;
  res.render('edit',{userdata:rows}); 
 })

  
});

module.exports = router;
