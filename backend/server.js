const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// const jobs = require('./routes/api/jobs');
const users = require('./routes/api/users');
const applicant = require('./routes/api/applicants');
const recruiter = require('./routes/api/recruiters');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// Use Routes
// app.use('/jobs', jobs);
app.use('/', users);
app.use('/applicant', applicant);
app.use('/recruiter', recruiter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
