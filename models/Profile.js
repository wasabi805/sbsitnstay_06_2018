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

    bread: {
        type: String
    },

    age: {
        type: Number
    },

    //for Admins only
    clients: [
        {
            clientName :{
                type: String
            },

            clientPhone : {
                type: Number
            },

            clientEmail : {
                type: String
            },

            clientDogName : {
                type: String
            }
        }
    ],

});

module.exports = Profile = mongoose.model('profile', ProfileSchema);