const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validatePostInput(data) {

    let errors = {};

    //set to string so it can fail custom validation func
    data.text = !isEmpty(data.text) ? data.text : '';

    if(!Validator.isLength(data.text, {min: 10 , max: 100})){
        errors.text = 'Post must be at least 10 characters and no greater than 300'
    }

    if(Validator.isEmpty(data.text)){
        errors.text = "Text field is required";
    }

    return{
        errors: errors,
        isValid: isEmpty(errors)
    }
};