const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statuses = [
    'Available', 'Working'
]

const applicantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        // required: true,
        index: true
    },
    skills: {
        type: [String]
    },
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            }
        }
    ],
    rating: {
        type: Number,
        default: 0
    },
    timesrated: {
        type: Number,
        default: 1
    },
    resume: {
        type: String,
        required: true
    },
    profilepicture: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Available',
        enum: statuses
    }
});

function arrayLimit(val) {
    return val.length <= 10;
};

module.exports = Applicant = mongoose.model('applicant', applicantSchema);