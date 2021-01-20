const express = require('express');
const router = express.Router();

// Model Import
const Recruiter = require('../../models/recruiter.models');

const ValidateRecruiterInput = require('../../validation/recruiter');

// add all info
router.post(("/"), (req, res) => {

    // const name = req.body.name;
    // const contact = req.body.contact;
    // const bio = req.body.bio;
    const details = req.body;

    const { errors, isValid } = ValidateRecruiterInput(details);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    Recruiter.findOneAndUpdate( { name: details.name }, { contact: details.contact, bio: details.bio }).then(updatedDoc => {
        if(updatedDoc) {
            res.send()
        } else {
            return res.status(400).json({ name: "Name does not exist" });
        }
    })
    
    // Recruiter.findOne({ name: details.name })
    //     .then(ifExists => {
    //         if(ifExists) {
    //             Recruiter.findOneAndUpdate( { name: details.name } , { contact: details.contact, bio: details.bio })
    //             // return res.status(400).json({ name: "Name exists" });
    //         } else {
    //             return res.status(400).json({ name: "Name does not exist" });
    //         }})    
});

module.exports = router;