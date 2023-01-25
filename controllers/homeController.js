const User = require('../models/User');
const Campaign = require('../models/Campaign');
const { handleErr } = require('./errorHandler');

// private data fetching functions
const fetchUser = async (authId) => {
  const user = await User.fetchUser(authId);
  return user;
}

const fetchCampaignList = async (userId) => {
  const campaigns = await Campaign.fetchAllCampaigns(userId);
  return campaigns;
}

const fetchCampaign = async (campaignId) => {
  const campaign = await Campaign.fetchCampaign(campaignId);
  return campaign;
}

// overview page
const overview_get = async (req, res) => {
  const user = await fetchUser(res.locals['token']);
  res.render('home/index', {user});
}

// campaign pages
const campaigns_get = async (req, res) => {
  const user = await fetchUser(res.locals['token']);
  const data = await fetchCampaignList(user._id);
  res.render('home/campaigns', {user, data});
}

const new_campaign_get = async (req, res) => {
  const user = await fetchUser(res.locals['token']);
  res.render('home/createCampaign', {user});
}

const new_campaign_post = async (req, res) => {
  const user = await fetchUser(res.locals['token']);
  const {campaignName, campaignDescription} = req.body;

  try {
    const campaign = await Campaign.create({campaignName, campaignDescription, campaignAuthor: user._id})
    res.status(201).json({campaign: campaign._id})
  } catch (err) {
    const errors = handleErr(err);
    res.status(400).json({errors});
  }
}

const campaign_id_get = async (req, res) => {
  const user = await fetchUser(res.locals['token']);
  const campaign = await fetchCampaign(req.params.campaignId);
  res.render('home/viewCampaign', {user, campaign});
}

// character pages
const characters_get = async (req, res) => {
  const user = await fetchUser(res.locals['token']);
  res.render('home/characters', {user});
}

// settings pages
const settings_get = async (req, res) => {
  const user = await fetchUser(res.locals['token']);
  res.render('home/settings', {user});
}

module.exports = {overview_get,
  campaigns_get,
  new_campaign_get,
  new_campaign_post,
  campaign_id_get,
  characters_get,
  settings_get
}