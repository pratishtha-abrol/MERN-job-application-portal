const express = require('express');
const router = express.Router();

// Import Models
const Applicant = require('../../models/applicant.models');
const ValidateApplicantInput = require('../../validation/applicant');
const Application = require('../../models/application.models');

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const { findOneAndUpdate } = require('../../models/application.models');

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
    
    Applicant.findOneAndUpdate( { name: req.body.name } , { skills: req.body.skills, education: req.body.education})
    .then(updatedDoc => {
        if(updatedDoc) {
            res.send()
        } else {
            return res.status(400).json({ name: "Name does not exist" });
        }
    })
});


// find by name
// router.post(("/find"), (req, res) => {
//     Applicant.findOne({name: req})
//         .then(applicant => {
//             if(applicant) {
//                 res.send()
//             } else {
//                 return res.status(400).json({ name: "Cannot build profile" });
//             }
//         })
// });


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

router.post(('/find'), async (req, res) => {
    const data = await Applicant.find({name: req.body.name})
    
    res.send(data);
});

router.post(('/accept'), (req, res) => {
    const details = req.body;
    const status = "Working";
    Applicant.findOneAndUpdate({name: details.name}, {status: status})
        // .then(doc => {
        // })
})

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../frontend/public/resume');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    cb(null, true);
}

let upload = multer({ storage, fileFilter });

router.route('/uploadResume').post(upload.single('resume'), (req, res) => {
    console.log("FILE", req.file);
    Applicant.updateOne({name: req.body.name}, {$set: {resume: req.file.filename}})
           .then(() => res.json('Resume Uploaded'))
           .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/uploadProfilePic').post(upload.single('profilepicture'), (req, res) => {
    console.log("FILE", req.file);
    Applicant.updateOne({name: req.body.name}, {$set: {profilepicture: req.file.filename}})
           .then(() => res.json('Profile Picture Uploaded'))
           .catch(err => res.status(400).json('Error: ' + err));
});

router.post(('/rate'), async (req,res) => {
    await Applicant.findOneAndUpdate({ name: req.body.name }, { rating: req.body.rating, $inc: {timesrated: 1} })
})

module.exports = router;