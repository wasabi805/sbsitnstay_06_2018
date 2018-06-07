const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ProfileSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    handle:{
        type: String,
        required: true,
        max: 40
    },

    dogName: {
        type: String
    },

    breed: {
        type: String
    },

    age: {
        type: Number
    },

    admin: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],

});

module.exports = Profile = mongoose.model('profile', ProfileSchema);