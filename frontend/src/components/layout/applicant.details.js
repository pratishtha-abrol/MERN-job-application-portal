import React, { Component } from 'react';
import axios from "axios";
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
// import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

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

class ApplicantDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            showskills: [],
            skills: [],
            education: [{
                school: "",
                degree: "",
                fieldofstudy: "",
                from: "",
                to: ""
            }],
            profile_image: "",
            resume: ""
        };
    }

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
        this.setState({ showskills: event, skills: array});
        console.log(array);
    }

    submitForm(e) {
        e.preventDefault();
        const data = {
            name: this.state.name,
            skills: this.state.skills,
            education: this.state.education,
            profile_image: this.state.profile_image,
            resume: this.state.resume
        }
        // console.log(data);
        axios
            .post('/applicant', data)
            .then(function() {
                alert("Profile Updated");
                window.location = '/';
            })
            .catch(function (res) {
                console.log(res);
                alert(res.response.data[Object.keys(res.response.data)[0]]);
            })
            // alert("Profile Updated");
            // window.location = '/';
    }

    render() {
        let { name, skills, profile_image, resume } = this.state;
        return(
            <div>
                <center>
                    <Col sm="6">
                        <Card body>
                            <center><CardTitle tag="h5" name="register">APPLICANT PROFILE DETAILS</CardTitle></center>
                            <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                        <Input type="name" name="name" id="name" placeholder="name (same as before)" value={ name } onChange={ (e) => {this.handleChange(e)} } />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="skills">Skills</Label>
                                    {/* <Select isMulti value={ skills } onChange={ this.onChange } options={ skillset } closeMenuOnSelect={false} /> */}
                                    <CreatableSelect isMulti options={ skillset } value={ this.state.showskills } closeMenuOnSelect={false} placeholder="select" onChange={ this.onChange } />
                                </FormGroup>
                                
                                <FormGroup>
                                    <Label for="profilepic">Profile Picture</Label>
                                    <Input type="file" name="pp" id="pp" value={ profile_image } onChange={ (e) => {this.handleChange(e)} } />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="resume">Resume</Label>
                                    <Input type="file" name="r" id="r" value={ resume } onChange={ (e) => {this.handleChange(e)} } />
                                </FormGroup>
                                <center><Button type="submit">Submit</Button></center>
                            </Form>
                        </Card>
                    </Col>
                </center>
            </div>
        );
    }
};

export default ApplicantDetails;