const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const {OAuth2Client} = require('google-auth-library');

require('dotenv').config();
const client = new OAuth2Client("965374062309-4i1qperm6sand7s6pptei6fn47upb0d8.apps.googleusercontent.com");

// User Models
const User = require('../../models/user.models');
const Recruiter = require('../../models/recruiter.models');
const Applicant = require('../../models/applicant.models');

// Validation Functions
const ValidateLoginInput = require('../../validation/login');
const ValidateRegistrationInput = require('../../validation/register');

// Extra Fucntions Required
// const createRecruiter = function(savedUser) {
//     const newRecruiter = new Recruiter({
//         user: savedUser
//     });
//     return newRecruiter.save();
// }
// const createApplicant = function(savedUser) {
//     const newApplicant = new Applicant({
//         user: savedUser
//     });
//     return newApplicant.save();
// }

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
            // res.send("Email Found");
            // Check Password
            // bcrypt.compare(password, user.password)
            //     .then(ifCorrect => {
            //         if (ifCorrect) {
            //             const payload = {
            //                 id: user.id,
            //                 name: user.name
            //             };
            //             jwt.sign(
            //                 payload,
            //                 process.env.APP_SECRET,
            //                 {
            //                     expiresIn: 31556926
            //                 },
            //                 (err, token) => {
            //                     res.json({
            //                         success: true,
            //                         token: "Bearer " + token,
            //                         user: user
            //                     });
            //                 }
            //             )
            //         } else {
            //             return res.status(400).json({
            //                 error: "Password Incorrect",
            //                 passwordincorrect: "Password incorrect"
            //             });
            //         }
            //     })
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                else if (!isMatch) {
                    res.status(400).json({
                        error: "Password Incorrect",
                        passwordincorrect: "Password incorrect"
                    })
                } else {
                    const payload = {
                        id: user.id,
                        name: user.name,
                        role: user.role
                    };
                    jwt.sign(
                        payload,
                        process.env.APP_SECRET,
                        {
                            expiresIn: 31556926
                        },
                        (error, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token,
                                user: user
                            });
                        }
                    )
                }
            })
        }
    })
    .catch();
    
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
            User.findOne({ name: userData.username }).then(ifExists => {
                if (ifExists) {
                    return res.status(400).json({ email: "Name already exists" });
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
                        // userData.id = savedUser._id;
                        // savedUser.role === 'Applicant' ? new Applicant(userData) : new Recruiter(userData);
                        // const userId = savedUser._id;
                    if(newUser.role === 'Applicant') {
                        const newApplicant = new Applicant({
                            name: newUser.name,
                            email: newUser.email,
                            user: savedUser._id
                        });
                        newApplicant.save()
                            .then(applicant => {
                                console.log("Created new applicant\n", applicant)
                            })
                            .catch()
                    } else {
                        const newRecruiter = new Recruiter({
                            name: newUser.name,
                            email: newUser.email,
                            user: savedUser._id
                        });
                        newRecruiter.save()
                            .then(recruiter => {
                                console.log("Created new recruiter\n", recruiter)
                            })
                            .catch()
                        }
                }
            })
            
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
// router.delete('/:id', (req, res) => {
//     User.findById(req.params.id)
//         .then(user => user.remove().then(() => res.json({ success: true })))
//         .catch(err => res.status(404).json({ success: false }))
// });

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

router.post('/googlelogin', async (req, res) => {
    const details = req.body;
    const ticket = await client.verifyIdToken({idToken: details.tokenId, audience: "965374062309-4i1qperm6sand7s6pptei6fn47upb0d8.apps.googleusercontent.com"})
        // .then(user => {
        //     const {email_verified, name, email} = user.payload;
        //     res.json(name, email)
        // })
        // .catch(err => {
        //     console.log(err);
        // })
        const {name, email} = ticket.getPayload();
        const user = {name, email}
        res.json(user);
        // res.send(email, name);
        
});

module.exports = router;