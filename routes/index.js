var express = require('express');
var router = express.Router();
var connection = require('../routes/config/connection');


/* GET home page. */
router.get('/', function (req, res, next) {

  //Connecting database

  connection.query('SELECT * FROM users', function (err, rows) {
    if (err) throw err;
    console.log(rows);
    res.render('index', { users: rows });
  });


});

//add user to DB
router.post('/addUser', function (req, res) {
  const userdata = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    prof: req.body.prof
  }

  console.log(userdata);
  connection.query("INSERT INTO users SET ?", userdata, function (err, result) {

    if (err) throw err;
    res.redirect('/');

  });



});

//delete user
router.get('/deleteUser/:id', function (req, res) {
  var userid = req.params.id;
  connection.query("DELETE FROM users WHERE id = ?", [userid], function (err, rows) {
    if (err) throw err;
    res.redirect('/')

  })

});

//redirect to edit form
router.get('/editUser/:id', function (req, res) {
  var userid = req.params.id;
  connection.query("SELECT * FROM users WHERE id=?", [userid], function (err, rows) {
    if (err) throw err;
    res.render('edit', { userdata: rows });
  })


});

//update user data
router.post('/updateUser/:id', function (req, res) {
  console.log("method update");
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var prof = req.body.prof;
  console.log(fname, lname, email, prof);

  var updatedId = req.params.id;

  connection.query("UPDATE users SET fname=?,lname=?,email=?,prof=? WHERE id=?", [fname, lname, email, prof, updatedId], function (err, respond) {
    if (err) throw err;
    res.redirect('../../')

  })

})

module.exports = router;
