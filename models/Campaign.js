const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const nanoid = require("nanoid");

const CampaignSchema = mongoose.Schema({
  campaignName: {
    type: String,
    trim: true,
    required: [true, 'Please enter a name for your Campaign']
  },
  campaignDescription: {
    type: String,
    trim: true,
  },
  campaignAuthor: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'A User ID is required to connect your campaign']
  },
  campaignPlayers: {
    type: ObjectId,
    ref: 'User'
  },
  campaignCharactersActive: {
    type: ObjectId,
    ref: 'Character'
  },
  campaignCharactersInactive: {
    type: ObjectId,
    ref: 'Character'
  },
  campaignCharactersStandby: {
    type: ObjectId,
    ref: 'Character'
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
CampaignSchema.post('save', function(doc, next){
  console.log('new campaign was created', doc);
  next();
})

// static methods
CampaignSchema.statics.fetchAllCampaigns = async function(id) {
  const campaigns = await this.find({'campaignAuthor': id}).populate('campaignAuthor');
  if (campaigns) {
    return campaigns;
  } else {
    return null;
  }
}
CampaignSchema.statics.fetchCampaign = async function(id) {
  const campaign = await this.findOne({id});
  if (campaign) {
    return campaign;
  } else {
    throw Error(`Campaign ID ${id} does not exist`);
  }
}

// export model Campaign with CampaignSchema
const Campaign = mongoose.model("Campaign", CampaignSchema);
module.exports = Campaign;