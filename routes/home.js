const express = require('express');
const router = express.Router();
const { requireAuth } = require('../controllers/jwt');
const homeController = require('../controllers/homeController');

/* GET user home page. */
router.get('/', requireAuth, homeController.overview_get);

module.exports = router;