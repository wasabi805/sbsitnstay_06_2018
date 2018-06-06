const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateRegisterInput(data) {

    let errors = {};

    //set to string so it can fail custom validation func
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';

    if(!Validator.isLength(data.firstName, {min: 2, max: 30})){
        errors.firstName = 'First name must be between 2 and 30 characters';
    }

    if(!Validator.isLength(data.lastName, {min: 2, max: 30})){
        errors.lastName = 'Last name must be between 2 and 30 characters';
    }

    if(Validator.isEmpty(data.firstName)){
        errors.firstName = "First name field is required";
    }

    if(Validator.isEmpty(data.lastName)){
        errors.firstName = "Last name field is required";
    }

    return{
        errors: errors,
        isValid: isEmpty(errors)
    }
};