var express = require('express');
var router = express.Router();

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register');
});

// router.post('/', function(req, res, next) {
//   res.render('index');
// });

module.exports = router;