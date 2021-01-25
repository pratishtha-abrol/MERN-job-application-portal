const express = require('express');
const router = express.Router();

const Application = require('../../models/application.models');

router.post('/', async (req, res) => {
    const details = req.body;
    const List = await Application.find({
        jobId: details.jobId
    })
    const array = []
    for(let i=0; i<List.length; i++) {
        if(List[i].status != "Rejected") {
            array.push(List[i])
        }
    }
        // .sort({ date: -1 })
        // .then(applications => res.json(applications))
        // .catch(err => res.status(400).json('Error: ' + err));
    res.send(array)
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
});

router.post("/deleted", async (req, res) => {
    const details = req.body;
    await Application.findOneAndUpdate({ jobId: details.id }, {status: "Deleted"})
        .then(res => {
            console.log(res);
        })
});

router.post("/accepted", async (req, res) => {
    const data = req.body;
    const list = await Application.find({jobId: data.jobId})
    const array =[]
    for (let i=0; i<list.length; i++) {
        if(list[i].status === "Accepted") {
            array.push(list[i])
        }
    }
    
    res.send(array);
})

module.exports = router;