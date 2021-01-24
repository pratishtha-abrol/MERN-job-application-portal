import React, { Component } from 'react';
import {
    Card,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    CardTitle
} from 'reactstrap';
import axios from 'axios';
import ls from 'local-storage';
import CreatableSelect from 'react-select/creatable';

import Welcome from './welcome';
import Navbar from '../layout/navbar.component';


let skillset = [
    { value: 'C', label: 'C' },
    { value: 'C++', label: 'C++' },
    { value: 'R', label: 'R' },
    { value: 'Python', label: 'Python' },
    { value: 'MySQL', label: 'MySQL' },
    { value: 'HTML', label: 'HTML' },
    { value: 'Java', label: 'Java' },
    { value: 'CSS', label: 'CSS' },
    { value: 'Bash', label: 'Bash' },
    { value: 'JavaScript', label: 'JavaScript' },
];

class CreateJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            maxApplicants: "",
            deadline: "",
            numberOfPositions: "",
            showskills: [],
            requiredSkills: [],
            duration: "",
            type: "Full Time",
            salary: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    // handleChange = (event) => {
    //     const { target } = event;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const { name } = target;
    //     this.setState({ 
    //         [ name ]: value,
    //     });
    // }

    handleChange = (event) => {
        this.setState({ 
            [ event.target.id ]: event.target.value,
        });
    }

    onChange = (event) => {
        let array = [];
        for (var i=0; i<event.length; i++) {
            array.push(event[i].value);
        }
        this.setState({ showskills: event, requiredSkills: array});
        console.log(array);
    }

    // checkauthorisation() {
    //     const user = ls.get("userrole");
    //     console.log(user);
    //     // axios
    //     //     .post("/recruiter/find", user)
    //     //     .then(function(res) {
    //     //         ls.set("recruiterid", res.data.id);
    //     //         console.log(ls.get("recruiterid"));
    //     //         // alert("Authorisation Allowed");s
    //     //     })
    //     //     .catch(function(res) {
    //     //         alert(res.response.data[Object.keys(res.response.data)[0]]);
    //     //         window.location = "/";
    //     //     })       
    //     if (user === "Applicant") {
    //         alert("Authorisation Prohibitted");
    //         window.location = "/";
    //     }
    // }

    submitForm(e) {
        e.preventDefault();
        if (ls.get("userrole") === "Applicant") {
            alert("Authorisation Prohibitted");
            window.location = "/";
        }
        const jobData = {
            title: this.state.title,
            maxApplicants: this.state.maxApplicants,
            deadline: this.state.deadline,
            numberOfPositions: this.state.numberOfPositions,
            requiredSkills: this.state.requiredSkills,
            type: this.state.type,
            duration: this.state.duration,
            salary: this.state.salary,
            postedby: ls.get("username")
        };
        console.log(`Title: ${ this.state.title }`);
        axios
            .post("/jobs/create", jobData)
            .then(function (res) {
                console.log(res);
                alert("Job Created!");
                window.location = "/";
            })
            .catch(function (res) {
                alert(res.response.data[Object.keys(res.response.data)[0]]);
            })
    }

    render() {
        const { title, maxApplicants, deadline, numberOfPositions, type, duration, salary } = this.state;
        return(
            <div>
                {ls.get("auth") === "true" ? (
                    <div>
                    <Welcome />
                    <center>
                        <Col sm="6">
                            <Card body>
                                <center><CardTitle tag="h5" name="jobcreate">CREATE JOB</CardTitle></center>
                                <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                                    <FormGroup>
                                        <Label for="title">Title</Label>
                                            <Input type="name" name="title" id="title" placeholder="title" value={ title } onChange={ (e) => {this.handleChange(e)}} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="maxApplicants">Maximum Applicants</Label>
                                            <Input type="number" name="maxApplicants" id="maxApplicants" placeholder="maxApplicants" value={ maxApplicants } onChange={ (e) => {this.handleChange(e)} } />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="numberOfPositions">Number of Positions Open</Label>
                                            <Input type="number" name="numberOfPositions" id="numberOfPositions" placeholder="numberOfPositions" value={ numberOfPositions } onChange={ (e) => {this.handleChange(e)} } />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="deadline">Deadline</Label>
                                            <Input type="date" name="deadline" id="deadline" placeholder="deadline" value={ deadline } onChange={ (e) => {this.handleChange(e)} } />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="salary">Salary</Label>
                                            <Input type="text" name="salary" id="salary" placeholder="salary" value={ salary } onChange={ (e) => {this.handleChange(e)} } />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="duration">Duration</Label>
                                            <Input type="text" name="duration" id="duration" placeholder="duration" value={ duration } onChange={ (e) => {this.handleChange(e)} } />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="select">Type</Label>
                                            <Input type="select" name="type" id="type" value={ type }  onChange={ (e) => {this.handleChange(e)} }>
                                                <option value="Full Time">Full Time</option>
                                                <option value="Part Time">Part Time</option>
                                                <option value="Internship">Internship</option>
                                            </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="skills">Skills</Label>
                                        <CreatableSelect isMulti options={ skillset } value={ this.state.showskills } closeMenuOnSelect={false} placeholder="select" onChange={ this.onChange } />
                                    </FormGroup>
                                    {/* <FormGroup check>
                                        <Label check>
                                        <Input type="radio" name="radio2" onClick={ this.checkauthorisation } />{' '}
                                        User Validation Required
                                        </Label>
                                    </FormGroup> */}
                                    <center><Button type="submit">Create</Button></center>
                                </Form>
                            </Card>
                        </Col>
                    </center>
                    </div>
                ) : (
                    <div>
                    <Navbar />
                    <Card body>
                        <center><CardTitle>Login to Create Job</CardTitle></center>
                    </Card>
                    </div>
                )}
                
            </div>
        );
    }
};

export default CreateJobs;