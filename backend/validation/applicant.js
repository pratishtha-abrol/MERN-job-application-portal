const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function ApplicantInp (data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";

    if (validator.isEmpty(data.name)) {
        errors.name = "Please enter your name";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};