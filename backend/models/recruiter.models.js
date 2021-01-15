const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recruiterSchema = new Schema({
    contact: {
        type: Number,
        validate: {
            validator: function(v) {
                return /d{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit phone number!'
        }
    },
    bio: {
        type: String,
        maxLength: 250
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('recruiter', recruiterSchema);