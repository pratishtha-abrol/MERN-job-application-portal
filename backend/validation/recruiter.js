const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function RecruiterInp (data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.contact = !isEmpty(data.contact) ? data.contact : "";
    data.bio = !isEmpty(data.bio) ? data.bio : "";

    if (validator.isEmpty(data.name)) {
        errors.name = "Please enter your name";
    }

    if (validator.isEmpty(data.contact)) {
        errors.contact = "Please enter your contact";
    }

    if (validator.isEmpty(data.bio)) {
        errors.bio = "Please enter your bio";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};