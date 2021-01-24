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
})

module.exports = router;