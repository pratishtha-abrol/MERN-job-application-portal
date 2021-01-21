const express = require('express');
const router = express.Router();

// Import Models
const Applicant = require('../../models/applicant.models');
const ValidateApplicantInput = require('../../validation/applicant');

// add all info
router.post(("/"), (req, res) => {

    // const name = req.body.name;
    // const contact = req.body.contact;
    // const bio = req.body.bio;
    const details = req.body;

    const { errors, isValid } = ValidateApplicantInput(details);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    
    Applicant.findOneAndUpdate( { name: req.body.name } , { skills: req.body.skills, education: req.body.education, profile_image: req.body.profile_image, resume: req.body.resume })
    .then(updatedDoc => {
        if(updatedDoc) {
            res.send()
        } else {
            return res.status(400).json({ name: "Name does not exist" });
        }
    })
});


// // @route POST /applicant; All jobs
// router.post('/jobs', (req, res) => {
//     const query = req.body;
//     Job.find()
//         .sort({ date: -1 })
//         .then(jobs => res.json(jobs))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// // @route POST /applicant; All applied applications
// router.post('/applications', (req, res) => {
//     const details = req.body;
//     Application.find()
//         .sort({ date: -1 })
//         .then(jobs => res.json(jobs))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// // @route POST /applicant; Apply
// router.post('/jobs/apply', (req, res) => {
//     const details = req.body;
//     console.log(details);
//     const id = details.jobId;
//     const message = details.message;
//     const newApplication = new Application(details)
//     newApplication.status = 'Applied';
//     newApplication.save()
//         .then(application => {
//             res.status(200).json(application);
//         })
//         .catch(err => {
//             res.status(400).send(err);
//         });
// });

module.exports = router;