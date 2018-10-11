const express = require('express');
const router = express.Router();

/* GET home page - Home route should redirect to the /books route.*/
router.get('/', function (req, res, next) {
  // res.render('index', {title: 'Books'});
  //correct answer below
  res.redirect("/books")
});

module.exports = router;
