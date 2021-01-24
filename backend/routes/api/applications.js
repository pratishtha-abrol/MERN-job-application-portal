const express = require('express');
const router = express.Router();

const Application = require('../../models/application.models');

router.post('/', async (req, res) => {
    const details = req.body;
    const List = await Application.find({
        jobId: details.jobId
    })
        // .sort({ date: -1 })
        // .then(applications => res.json(applications))
        // .catch(err => res.status(400).json('Error: ' + err));
    res.send(List)
});

router.post('/status', (req, res) => {
    const details = req.body;
    Application.findOneAndUpdate({ _id: details.id }, { status: details.status})
        .then(doc => {
            res.send(doc)
        })
});

router.post('/remove', async (req, res) => {
    Application.updateMany({applicantname: req.body.name, id: !req.body.id}, {status: "Removed"}, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Updated Docs : ", docs); 
        }})
});

router.post('/mine', async (req, res) => {
    const details = req.body;
    const List = await Application.find({
        applicantname: details.name
    })
        // .sort({ date: -1 })
        // .then(applications => res.json(applications))
        // .catch(err => res.status(400).json('Error: ' + err));
    // console.log(List);
    res.send(List)
})

module.exports = router;