const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function CreateJobs (data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : "";
    data.numberOfPositions = !isEmpty(data.numberOfPositions) ? data.numberOfPositions : "";
    data.type = !isEmpty(data.type) ? data.type : "";
    data.deadline = !isEmpty(data.deadline) ? data.deadline : "";
    data.duration = !isEmpty(data.duration) ? data.duration : "";

    if (validator.isEmpty(data.title)) {
        errors.title = "Please enter the title";
    }
    if (validator.isEmpty(data.numberOfPositions)) {
        errors.numberOfPositions = "Please enter the number of positions";
    }
    if (validator.isEmpty(data.type)) {
        errors.type = "Please enter the type";
    }
    if (validator.isEmpty(data.deadline)) {
        errors.deadline = "Please enter the deadline";
    }
    if (validator.isEmpty(data.duration)) {
        errors.duration = "Please enter the duration";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};