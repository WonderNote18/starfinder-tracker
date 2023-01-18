var express = require('express');
const { isAuthenticated } = require('../controllers/user');
var router = express.Router();

/* GET user home page. */
router.get('/', isAuthenticated, function(req, res, next) {
  res.render('home/index');
});

module.exports = router;