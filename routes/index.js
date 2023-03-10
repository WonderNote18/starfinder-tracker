var express = require('express');
const { isAuth } = require('../controllers/jwt');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  isAuth(req).then(authRes => {
    res.render('index', {isAuth: authRes.isAuthenticated});
  });
});

module.exports = router;