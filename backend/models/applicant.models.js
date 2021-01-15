const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statuses = [
    'Available', 'Working'
]

const applicantSchema = new Schema({
    skills: {
        type: [String],
        required: true
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
            },
            current: {
                type: Boolean,
                default: false
            }
        }
    ],
    rating: {
        type: Number,
        default: 0
    },
    resume: {
        type: String
    },
    profile_image: {
        type: String,
        default: 'default-profile-image.jpg'
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

module.exports = mongoose.model('applicant', applicantSchema);