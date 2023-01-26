const mongoose = require("mongoose");
const ObjectId = require("mongoose").Schema.Types.ObjectId;
const nanoid = require("nanoid");
const User = require('./User');

const CampaignSchema = mongoose.Schema({
  caName: {
    type: String,
    trim: true,
    required: [true, 'Please enter a name for your Campaign'],
    maxLength: [64, 'Campaign Name cannot be longer than 64 characters'],
  },
  caDescription: {
    type: String,
    trim: true,
  },
  caAuthor: {
    type: ObjectId,
    ref: 'User',
    required: [true, 'A User ID is required to connect your Campaign to the Author']
  },
  caPlayers: {
    type: Array,
  },
  caCharacters: {
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
  const updateRes = await User.pushCampaign(doc.caAuthor, doc._id);
  if (updateRes) {
    console.log('new campaign was created', doc);
    next();
  } else {
    throw Error('User::pushCampaign failed to be completed.');
  }
});

// static methods
CampaignSchema.statics.fetchAllCampaigns = async function(id) {
  const campaigns = await this.find({'caAuthor': id})
  .populate('caAuthor')
  .populate('caPlayers');
  if (campaigns) {
    return campaigns;
  } else {
    throw Error('Campaigns could not be pulled for user');
  }
}
CampaignSchema.statics.fetchCampaign = async function(id) {
  const campaign = await this.findOne({_id: id})
  .populate('caAuthor')
  .populate('caPlayers');
  if (campaign) {
    return campaign;
  } else {
    throw Error(`Campaign ID ${id} does not exist`);
  }
}

// export model Campaign with CampaignSchema
const Campaign = mongoose.model("Campaign", CampaignSchema);
module.exports = Campaign;