const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statuses = [
    'Active', 'Expired', 'Alotted', 'Deleted'
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
        required: true
    },
    salary: {
        type: String
    },
    status: {
        type: String,
        default: "Active",
        enum: statuses
    // },
    // postedby: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'recruiter'
    }
}, {
    timestamps: true,
});

jobSchema.plugin(mongoose_fuzzy_searching, { fields: ["title"] });
module.exports = Job = mongoose.model('job', jobSchema);