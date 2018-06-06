const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateRegisterInput(data) {

    let errors = {};

    //set to string so it can fail custom validation func
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';


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
        errors.lastName = "Last name field is required";
    }

    if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }

    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    }

    if(Validator.isEmpty(data.phone)){
        errors.phone = "A phone number is required";
    }

    //TODO_ check if there's 'isPhoneNumber' type of format for validation

    if(Validator.isEmpty(data.password, {min: 6 , max: 30})){
        errors.password = "A password is required";
    }

    if(Validator.isLength(data.password)){
        errors.password = "Password must be at least 6 characters";
    }


    if(Validator.isEmpty(data.password2)){
        errors.password2 = "Please confirm your password";
    }

    //check: confirm matches pw

    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = 'Passwords must match'
    }

    return{
        errors: errors,
        isValid: isEmpty(errors)
    }
};