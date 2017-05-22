const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const locationSchema = new Schema({
    location:  {
        type: String
    },
    count:  {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const favoriteSchema = new Schema({
    location:  {
        type: String
    }
}, {
    timestamps: true
});

const User = new Schema({
    username: String,
    password: String,
    admin:   {
        type: Boolean,
        default: false
    },
    locations: [locationSchema],
    favorites: [favoriteSchema]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);