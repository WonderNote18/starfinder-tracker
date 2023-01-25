const mongoose = require("mongoose");
const ObjectId = require("mongoose").Schema.Types.ObjectId;
const nanoid = require("nanoid");
const User = require('./User');

const CampaignSchema = mongoose.Schema({
  campaignName: {
    type: String,
    trim: true,
    required: [true, 'Please enter a name for your Campaign'],
    maxLength: [64, 'Campaign Name cannot be longer than 64 characters.'],
  },
  campaignDescription: {
    type: String,
    trim: true,
  },
  campaignAuthor: {
    type: ObjectId,
    ref: 'User',
    required: [true, 'A User ID is required to connect your campaign']
  },
  campaignPlayers: {
    type: Array,
  },
  campaignCharacters: {
    type: Array,
  },
  isActive: {
    type: Boolean,
    default: true
  },
  inviteKey: {
    type: String,
    trim: true,
    minLength: 16,
    unique: true
  }
}, {timestamps: true});

// pre/post model functions
CampaignSchema.pre('save', function(next){
  this.inviteKey = nanoid();
  next();
});
CampaignSchema.post('save', async function(doc, next){
  await User.updateOne({_id: doc.campaignAuthor}, {$push: {campaigns: doc._id}});
  console.log('new campaign was created', doc);
  next();
});

// static methods
CampaignSchema.statics.fetchAllCampaigns = async function(id) {
  const campaigns = await this.find({'campaignAuthor': id})
  .populate('campaignAuthor')
  .populate('campaignPlayers');
  if (campaigns) {
    return campaigns;
  } else {
    return null;
  }
}
CampaignSchema.statics.fetchCampaign = async function(id) {
  const campaign = await this.findOne({_id: id})
  .populate('campaignAuthor')
  .populate('campaignPlayers');
  if (campaign) {
    return campaign;
  } else {
    throw Error(`Campaign ID ${id} does not exist`);
  }
}

// export model Campaign with CampaignSchema
const Campaign = mongoose.model("Campaign", CampaignSchema);
module.exports = Campaign;