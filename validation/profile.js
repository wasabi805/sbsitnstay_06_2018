const Validator = require('validator');
const isEmpty = require('./is-empty');



module.exports = function validateProfileInput(data) {


    let errors = {};


    //set to string so it can fail custom validation func
    data.handle = !isEmpty(data.handle) ? data.handle : '';


    if(!Validator.isLength(data.handle, {min: 6}, {max: 40})){
        errors.handle = "Handle needs to be between 2 and 40 characters";
    }

    if(Validator.isEmpty(data.handle)){
        errors.handle = "Please enter a handle you would like to use for your profile";
    }

    return{
        errors: errors,
        isValid: isEmpty(errors)
    }
};