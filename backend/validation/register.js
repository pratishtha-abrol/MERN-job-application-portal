const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function RegisterInp (data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (validator.isEmpty(data.name)) {
        errors.name = "Please enter your name";
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "Please enter your email address";
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Please enter your password";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};