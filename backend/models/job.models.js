const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statuses = [
    'Active', 'Expired', 'Alotted', 'Deleted'
]

const jobtype = [
    'Full Time', 'Part Time', 'Internship'
]

const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");

const jobSchema = new Schema({
    title: {
        type: String,
        maxLength: 100,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    maxApplicants: {
        type: Number,
        default: 10
    },
    deadline: {
        type: Date,
        required: true
    },
    numberOfPositions: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    requiredSkills: {
        type: [String],
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "Full Time",
        enum: jobtype
    },
    salary: {
        type: String
    },
    status: {
        type: String,
        default: "Active",
        enum: statuses
    },
    postedby: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

jobSchema.plugin(mongoose_fuzzy_searching, { fields: ["title"] });
module.exports = Job = mongoose.model('job', jobSchema);