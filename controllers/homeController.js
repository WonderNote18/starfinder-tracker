const User = require('../models/User');
const Campaign = require('../models/Campaign');
const { handleErr } = require('./errorHandler');

const fetchUser = async (authId) => {
  const user = await User.fetchUser(authId);
  return user;
}

const fetchUserId = async (authId) => {
  const user = await User.fetchUserId(authId);
  return user;
}

const fetchCampaignList = async (userId) => {
  const campaigns = await Campaign.fetchAllCampaigns(userId);
  return campaigns;
}

const fetchCampaign = async (user) => {
  const campaign = await Campaign.fetchUser(req.cookies.authToken.id);
  return campaign;
}

const overview_get = (req, res) => {
  fetchUser(req.cookies.authToken.id).then(userRes => {
    res.render('home/index', {user: userRes});
  });
}

const campaigns_get = async (req, res) => {
  const user = await fetchUser(req.cookies.authToken.id);
  const data = await fetchCampaignList(user._id);
  res.render('home/campaigns', {user, data});
}

const new_campaign_get = (req, res) => {
  fetchUser(req.cookies.authToken.id).then(userRes => {
    res.render('home/createCampaign', {user: userRes});
  });
}

const new_campaign_post = async (req, res) => {
  const {campaignName, campaignDescription} = req.body;

  try {
    fetchUser(req.cookies.authToken.id).then(async (userRes) => {
      const user = userRes;
      const campaign = await Campaign.create({campaignName, campaignDescription, campaignAuthor: user._id})
      res.status(201).json({campaign: campaign._id})
    })
  } catch (err) {
    const errors = handleErr(err);
    res.status(400).json({errors});
  }
}

const characters_get = (req, res) => {
  fetchUser(req.cookies.authToken.id).then(userRes => {
    res.render('home/characters', {user: userRes});
  });
}

const settings_get = (req, res) => {
  fetchUser(req.cookies.authToken.id).then(userRes => {
    res.render('home/settings', {user: userRes});
  });
}

module.exports = {overview_get,
  campaigns_get,
  new_campaign_get,
  new_campaign_post,
  characters_get,
  settings_get
}