const mongoose = require("mongoose");
const crypto = require('crypto');
const { randomUUID } = require("crypto");

const UserSchema = mongoose.Schema({
    emailAddress: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        maxLength: 32,
        trim: true,
        default: null
    },
    lastName: {
        type: String,
        maxLength: 32,
        trim: true,
        default: null
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
}, {timestamps: true});

UserSchema.virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = randomUUID()
        this.encry_password = this.securePassword(password);
    })
    .get(function() {
        return this._password;
    });
UserSchema.methods = {
    authenticate: function(plainpass) {
        return this.securePassword(plainpass) === this.encry_password;
    },

    securePassword: function(plainpass) {
        if (!plainpass) return null;

        try {
            return crypto.createHmac("sha256", this.salt).update(plainpass).digest("hex");
        } catch (err) {
            console.error(err);
        }
    }
}

// export model user with UserSchema
module.exports = mongoose.model("User", UserSchema);