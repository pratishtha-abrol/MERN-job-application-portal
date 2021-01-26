const express = require('express');
const router = express.Router();
const ValidateCreateJobs = require('../../validation/createjobs');


// Job Model
const Job = require('../../models/job.models');
const Recruiter = require('../../models/recruiter.models');
const Application = require('../../models/application.models');
const Applcant = require("../../models/applicant.models");


// @route GET api/jobs; @desc Get all jobs
router.post('/', async (req, res) => {
    const list = await Job.find()
    const array = [];
    console.log(req.body);
    for(let i=0; i<list.length; i++) {
        if (list[i].status === "Active") {
            const temp_arr = {};
            temp_arr["Job"] = list[i];
            const app = await Application.findOne({jobId: list[i]._id, applicantname: req.body.name, applicantemail: req.body.email})
            console.log(app)
            if(app) {
                temp_arr["hasapplied"] = "true"
            } else {
                temp_arr["hasapplied"] = "false"
            }
            array.push(temp_arr);
        }
    }
    // array
    //     .sort({ date: -1 })
    //     .then(jobs => res.json(jobs))
    //     .catch(err => res.status(400).json('Error: ' + err));

        res.send(array)
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
        postedby: req.body.postedby,
        recruiteremail: req.body.recruiteremail
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

router.post('/apply', async (req, res) => {
    const details = req.body;
    console.log(details);
    // const id = details.jobId;
    // const message = details.message;
    const job = await Job.findOne({_id: details.jobId})
    console.log(job);
    await Job.updateOne({ _id: details.jobId }, { $inc : {numberofapplications: 1} })
        .then(doc => {
            if (doc.numberofapplications > 10) {
                return res.status(400).json({ name: "You have exceeded your Application Limit" });
            }
            else {
                // Job.findOneAndUpdate({ _id: details.id }, { $inc : {numberofapplications: 1} })
                //     .then(updatedjob => {
                //         if (updatedjob.numberofapplications > updatedjob.maxApplicants) {
                //             return res.status(400).json({ name: "Job has exceeded its max applications" });
                //         } 
                        // else {
                            const newApplication = new Application (details)
                            newApplication.status = 'Applied';
                            newApplication.save()
                                .then(application => {
                                    res.status(200).json(application);
                                })
                                // .catch(err => {
                                //     res.status(400).send(err);
                                // });

                        // }
                    // })
            }
        }) 
    
    // Job.findOneAndUpdate({ _id: details.id }, { $inc : {numberofapplications: 1} });
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

router.post('/delete', (req, res) => {
    const data = req.body;
    Job.findByIdAndRemove({ _id: data.id }).exec()
        .then(res => {
            console.log(res);
        })
});

router.post('/find', async (req, res) => {
    const data = req.body;
    const job = await Job.findOne({ _id: data.id })
        // .then(res => {
        //     console.log(res);
        //     res.send()
        // })
    res.send(job);
})

router.post('/rate', async (req,res) => {
    await Job.findOneAndUpdate({_id: req.body.id}, {rating: req.body.rating, $inc: {timesrated: 1}})
})

router.post('/acceptnumber', async (req, res) => {
    await Job.findOneAndUpdate({_id: req.body.jobId}, {$inc: {numberaccepted: 1}})
        .then(doc => {
            if(doc.numberaccepted > doc.numberOfPositions) {
                return res.status(400).json({ name: "Job has exceeded maximum positions available" });
            }
        })
})

module.exports = router;