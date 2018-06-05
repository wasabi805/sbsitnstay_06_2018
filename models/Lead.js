const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Schema
const LeadSchema = new Schema({
    firstName :{
        type: String,
        required: true
    },

    lastName : {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    dogName:{
        type: String,
    },

    bread:{
        type: String,
    },

    age:{
       type: Number,
    },

    commentsOrQuestions:{
        type: String
    },

    date:{
        type: Date,
        default: Date.now
    }

});

module.exports = User = mongoose.model('leads', LeadSchema);