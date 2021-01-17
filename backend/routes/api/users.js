const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/user.models');
const Recruiter = require('../../models/recruiter.models');
const Applicant = require('../../models/applicant.models');

// login
router.post("/login", (req, res) => {
    const email = req.body.email;
    // const password = req.body.password;
	// Find user by email
	User.findOne({ email }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            res.send("Email Found");
            return user;
        }
    });
    
});

// register
router.post("/register", (req, res) => {
    const userData = req.body;
    const newUser = new User(userData
        // {
        // name: req.body.name,
        // email: req.body.email,
        // password: req.body.password,
        // role: req.body.role
        // }
    );

    const savedUser = newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });

    userData.id = savedUser.id;
    savedUser.role === 'Applicant' ? new Applicant(userData) : new Recruiter(userData);

});

// delete a user
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
});

// get all users
router.get("/", function(req, res) {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(400).json('Error: ' + err)
        });
});


module.exports = router;