const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statuses = [
    'Available', 'Working'
]

const applicantSchema = new Schema({
    name: {
        type: String
        // required: true
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
                type: String
            },
            degree: {
                type: String
            },
            fieldofstudy: {
                type: String
            },
            from: {
                type: Date
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

module.exports = Applicant = mongoose.model('applicant', applicantSchema);