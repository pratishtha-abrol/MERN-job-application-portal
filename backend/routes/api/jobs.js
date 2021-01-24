const express = require('express');
const router = express.Router();
const ValidateCreateJobs = require('../../validation/createjobs');


// Job Model
const Job = require('../../models/job.models');
const Recruiter = require('../../models/recruiter.models');
const Application = require('../../models/application.models');


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

router.post('/postedby', async (req,res) => {
    const details = req.body;
    // const name = details.postedby;
    // console.log(details.postedby);
    const list = await Job.find({
        // 'postedby' : {
        //     $elemMatch: {
        //         postedby: details.postedby
        //     }
        // }
        postedby: details.postedby
    });
    res.send(list)
    // Job.find({postedby: name})
});

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

router.post('/edit', (req, res) => {
    const details = req.body;
    Job.findByIdAndUpdate({ _id: details.id }, {title: details.title, maxApplicants: details.maxApplicants, deadline: details.deadline, numberOfPositions: details.numberOfPositions, requiredSkills: details.requiredSkills, type: details.type, duration: details.duration, salary: details.salary})
        .then(doc => {
            if(doc) {
                res.send()
            } else {
                return res.status(400).json({ name: "Could not update job" });
            }
        })

});

module.exports = router;