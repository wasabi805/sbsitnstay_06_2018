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

    clients: {
        type: [
            {
                firstName: {
                    type: String
                },

                lastName:{
                    type: String
                },

                email:{
                    type: String
                },

                phone: {
                    type: String
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
            }
        ],
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);