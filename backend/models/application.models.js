const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statuses = [
  'Applied', 'Accepted', 'Shortlisted', 'Rejected', 'Deleted', 'Removed'
]

const applicationSchema = new Schema({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicantname: {
    type: String,
    required: true
  },
  message: {
    type: String,
    maxlength: 250
  },
  status: {
    type: String,
    default: "Applied",
    enum: statuses
  }
}, {
  timestamps: true
});

module.exports = Application = mongoose.model('application', applicationSchema);