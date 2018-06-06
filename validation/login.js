const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateLoginInput(data) {

    let errors = {};

    //set to string so it can fail custom validation func
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }

    if(Validator.isEmpty(data.password, {min: 6 , max: 30})){
        errors.password = "A password is required";
    }

    //this has to be last for front end validation
    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    }

    return{
        errors: errors,
        isValid: isEmpty(errors)
    }
};