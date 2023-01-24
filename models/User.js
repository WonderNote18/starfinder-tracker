const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    emailAddress: {
        type: String,
        trim: true,
        unique: [true, 'Email address has already been registered.'],
        required: [true, 'Please enter an email address.'],
        validate: [isEmail, 'Please enter a valid email address.']
    },
    username: {
        type: String,
        maxlength: 32,
        trim: true,
        required: [true, 'Please enter a username.'],
    },
    firstName: {
        type: String,
        maxLength: [32, 'Names must be no greater than 32 characters.'],
        trim: true,
        default: null
    },
    lastName: {
        type: String,
        maxLength: [32, 'Names must be no greater than 32 characters.'],
        trim: true,
        default: null
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.'],
        minLength: [8, 'Password must be at least 8 characters long.'],maxLength: [32, 'Password must be no greater than 32 characters.'],
    },
    campaigns: {
        type: Array,
        ref: 'Campaign',
    },
    characters: {
        type: Array,
        ref: 'Character',
    }
}, {timestamps: true});

// pre/post model functions
UserSchema.post('save', function(doc, next) {
    console.log('new user was created', doc);
    next();
});

UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static methods
UserSchema.statics.login = async function(emailAddress, password){
    const user = await this.findOne({ emailAddress });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
    }
    throw Error('Invalid email/password');
}

UserSchema.statics.fetchUser = async function(id) {
    const user = await this.findOne({_id: id});
    if (user) {
        return user;
    } else {
        throw Error('Session expired, please log in.');
    }
}

UserSchema.statics.fetchUserId = async function(id) {
    const user = await this.findOne({_id: id});
    if (user) {
        return user._id;
    } else {
        throw Error('Session expired, please log in.');
    }
}

// export model User with UserSchema
const User = mongoose.model("User", UserSchema);
module.exports = User;