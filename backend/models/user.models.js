const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roles = [
    'Recruiter', 'Applicant'
]

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'Applicant',
        enum: roles
    }
}, {
    timestamps: true
});

module.exports = User = mongoose.model('user', userSchema);