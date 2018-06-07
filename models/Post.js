const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    profile:{
        type: Schema.Types.ObjectId,
        ref: 'profile'
    },

    avatar:{
        type: String
    },

    text: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true,

    },

    lastName: {
        type: String,
        required: true,
    },

    date:{
        type: Date,
        default: Date.now(),
    },

    clients:[
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],

    comments : [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },

            text: {
                type: String,
                required: true,
            },

            firstName:{
                type: String
            },

            lastName: {
                type: String,
                required: true,
            },

            avatar:{
                type: String
            },

            date:{
                type: Date,
                default: Date.now(),
            },
        }
    ]
});

module.exports = Post = mongoose.model('posts', PostSchema);
