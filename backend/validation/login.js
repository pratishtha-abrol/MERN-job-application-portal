const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function LoginInp (data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

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