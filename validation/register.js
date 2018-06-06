const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateRegisterInput(data) {

    let errors = {};

    if(!Validator.isLength(data.firstName, {min: 2, max: 30})){
        errors.firstName = 'Name must be between 2 and 30 characters'
    }

    return{
        errors: errors,
        isValid: isEmpty(errors)
    }
};