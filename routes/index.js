var express = require('express');
const { isAuth } = require('../controllers/jwt');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  isAuth(req).then(authenticated => {
    res.render('index', {isAuth: authenticated});
  });
});

module.exports = router;