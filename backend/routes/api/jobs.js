const express = require('express');
const router = express.Router();
const ValidateCreateJobs = require('../../validation/createjobs');


// Job Model
const Job = require('../../models/job.models');
const Recruiter = require('../../models/recruiter.models');


// @route GET api/jobs; @desc Get all jobs
router.get('/', (req, res) => {
    Job.find()
        .sort({ date: -1 })
        .then(jobs => res.json(jobs))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route POST api/jobs; @desc Create a job
router.post('/create', (req, res) => {

    const JobData = req.body;

    const { errors, isValid } = ValidateCreateJobs(JobData);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newJob = new Job( 
        {
        title: req.body.title,
        maxApplicants: req.body.maxApplicants,
        deadline: req.body.deadline,
        numberOfPositions: req.body.numberOfPositions,
        requiredSkills: req.body.requiredSkills,
        duration: req.body.duration,
        type: req.body.type,
        salary: req.body.salary,
        postedby: req.body.postedby
        }
    );

    newJob.save().then(job => res.json(job));
});

// // @route DELETE api/jobs; @desc Delete a jobs
// router.delete('/:id', (req, res) => {
//     Job.findById(req.params.id)
//         .then(job => job.remove().then(() => res.json({ success: true })))
//         .catch(err => res.status(404).json({ success: false }))
// });

// router.post("/:id/update", (req, res) => {
//     Job.findById(req.params.id).then(job => {
//         const title = req.body.title;
//         console.log(title);
//         User.findOneAndUpdate({ title }, (err, result) => {
//             err ? res.status(500).json({ err }) : res.status(200).json({ result });
//         });
//     })
// });

router.post('/apply', (req, res) => {
    const details = req.body;
    console.log(details);
    // const id = details.jobId;
    // const message = details.message;
    const newApplication = new Application (details)
    newApplication.status = 'Applied';
    newApplication.save()
        .then(application => {
            res.status(200).json(application);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});


module.exports = router;