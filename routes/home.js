const express = require('express');
const router = express.Router();
const { requireAuth } = require('../controllers/jwt');
const homeController = require('../controllers/homeController');

// routes
router.get('/', requireAuth, homeController.overview_get);
// campaign routes
router.get('/campaigns', requireAuth, homeController.campaigns_get);
router.get('/campaigns/view/:campaignId', requireAuth, homeController.campaign_id_get);
router.get('/campaigns/create', requireAuth, homeController.new_campaign_get);
router.post('/campaigns/create', requireAuth, homeController.new_campaign_post);
// character routes
router.get('/characters', requireAuth, homeController.characters_get);
// settings routes
router.get('/settings', requireAuth, homeController.settings_get);

module.exports = router;