var express = require('express');
const { requireAuth } = require('../controllers/jwt');
var router = express.Router();

/* GET user home page. */
router.get('/', requireAuth, function(req, res, next) {
  res.render('home/index');
});

module.exports = router;