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
    resume: {
        data: Buffer,
        contentType: String
    },
    // profile_image: {
    //     type: String,
    //     default: 'default-profile-image.jpg'
    // },
    status: {
        type: String,
        default: 'Available',
        enum: statuses
    },
    applicationsyet: {
        type: Number,
        max: 10,
        default: 0
    }
});

function arrayLimit(val) {
    return val.length <= 10;
};

module.exports = Applicant = mongoose.model('applicant', applicantSchema);