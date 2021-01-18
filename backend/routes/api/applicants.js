const express = require('express');
const router = express.Router();

// Import Models
const Job = require('../../models/job.models');
const Applicant = require('../../models/applicant.models');
const Application = require('../../models/application.models');
// const mongooseFuzzySearching = require('mongoose-fuzzy-searching');

// @route POST /applicant; All jobs
router.post('/jobs', (req, res) => {
    const query = req.body;
    Job.find()
        .sort({ date: -1 })
        .then(jobs => res.json(jobs))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route POST /applicant; All applied applications
router.post('/applications', (req, res) => {
    const details = req.body;
    Application.find()
        .sort({ date: -1 })
        .then(jobs => res.json(jobs))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route POST /applicant; Apply
router.post('/jobs/apply', (req, res) => {
    const details = req.body;
    console.log(details);
    const id = details.jobId;
    const message = details.message;
    const newApplication = new Application(details)
    newApplication.status = 'Applied';
    newApplication.save()
        .then(application => {
            res.status(200).json(application);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});