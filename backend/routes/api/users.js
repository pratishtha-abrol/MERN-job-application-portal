const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

require('dotenv').config();

// User Models
const User = require('../../models/user.models');
const Recruiter = require('../../models/recruiter.models');
const Applicant = require('../../models/applicant.models');

// Validation Functions
const ValidateLoginInput = require('../../validation/login');
const ValidateRegistrationInput = require('../../validation/register');

// login
router.post("/login", (req, res) => {
    const details = req.body;
    const { errors, isValid } = ValidateLoginInput(details);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = details.email;
    const password = details.password;

	// Find user by email
	User.findOne({ email }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
                error: "Email not found",
                emailnotfound: "Email not found"
			});
        }
        else{
            res.send("Email Found");
            // Check Password
            bcrypt.compare(password, user.password).then(ifCorrect => {
                if (ifCorrect) {
                    const payload = {
                        id: user.id,
                        name: user.name
                    };
                    jwt.sign(
                        payload,
                        APP_SECRET,
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token,
                                user: user
                            });
                        }
                    )
                } else {
                    return res.status(400).json({
                        error: "Password Incorrect",
                        passwordincorrect: "Password incorrect"
                    });
                }
            });
        }
    });
    
});

// register
router.post("/register", (req, res) => {
    const userData = req.body;

    const { errors, isValid } = ValidateRegistrationInput(userData);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email : userData.email }).then(ifExists => {
        if (ifExists) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User(userData);

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, null, (err, hash) => {
                    if (err) throw err;
					newUser.password = hash;
                });
            });

            const savedUser = newUser.save()
                    .then(user => {
                        res.status(200).json(user);
                    })
                    .catch(err => {
                        res.status(400).send(err);
                    });
                userData.id = savedUser.id;
                // savedUser.role === 'Applicant' ? new Applicant(userData) : new Recruiter(userData);
                if(savedUser.role === 'Applicant') {
                    const newApplicant = new Applicant(userData.id)
                    newApplicant.save()
                } else {
                    const newRecruiter = new Recruiter(userData.id)
                    newRecruiter.save()
                }
        }
    })

    // const newUser = new User(userData
    //     // {
    //     // name: req.body.name,
    //     // email: req.body.email,
    //     // password: req.body.password,
    //     // role: req.body.role
    //     // }
    // );

    // const savedUser = newUser.save()
    //     .then(user => {
    //         res.status(200).json(user);
    //     })
    //     .catch(err => {
    //         res.status(400).send(err);
    //     });

    // userData.id = savedUser.id;
    // savedUser.role === 'Applicant' ? new Applicant(userData) : new Recruiter(userData);

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