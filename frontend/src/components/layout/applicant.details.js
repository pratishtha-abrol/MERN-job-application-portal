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
import { Multiselect } from 'react-widgets';

class ApplicantDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            skills: [],
            set: [
                'C',
                'JavaScript',
                'Python',
                'C++',
                'R',
                'Java'
            ],
            education: [{
                school: "",
                degree: "",
                fieldofstudy: "",
                from: "",
                to: ""
            }],
            profile_image: "",
            resume: ""
        }
    }

    addClick() {
        this.setState(prevState => ({
            eduction: [...prevState.education, {
                school: "",
                degree: "",
                fieldofstudy: "",
                from: "",
                to: ""
            }]
        }))
    }

    createUI() {
        return this.state.education.map((e1, i) => {
            <FormGroup key={i}>
                <Label for="education">Education</Label>
                    <Input type="text" name="school" id="school" placeholder="school name" value={ e1.school } onChange={ this.onChange.bind(this, i) } />
                    <Input type="text" name="degree" id="degree" placeholder="degree" value={ e1.degree } onChange={ this.onChange.bind(this, i) } />
                    <Input type="text" name="field of study" id="field of study" placeholder="field of study" value={ e1.fieldofstudy } onChange={ this.onChange.bind(this, i)} />
                    <Input type="date" name="from" id="from" placeholder="start date" value={ e1.from } onChange={ this.onChange.bind(this, i) } />
                    <Input type="date" name="to" id="to" placeholder="end date" value={ e1.to } onChange={ this.onChange.bind(this, i) } />
                    <Button value="remove" onClick={this.removeClick.bind(this, i)}>Remove Latest Education</Button>
            </FormGroup>
        })
    }

    handleCreate(s) {
        let { skills, set } = this.state;

        let newOption = {
            s,
            id: set.length + 1
        }

        this.setState({
            skills: [...skills, newOption],
            set: [...set, newOption]
        })
    }

    onChange(i, e) {
        const { name, value } = e.target;
        let education = [...this.state.education];
        education[i] = {...education[i], [name]: value};
        this.setState({ education });
    }

    removeClick(i) {
        let education = [...this.state.education];
        education.splice(i, 1);
        this.setState({ education });
    }

    handleChange = (event) => {
        this.setState({ 
            [ event.target.id ]: event.target.value,
        });
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
            .post('/applicant', data);
            // .then(function() {
            //     alert("Profile Updated");
            //     window.location = '/';
            // })
            // .catch(function (res) {
            //     console.log(res);
            //     alert(res.response.data[Object.keys(res.response.data)[0]]);
            // })
            alert("Profile Updated");
            window.location = '/';
    }

    render() {
        let { name, skills, set, profile_image, resume } = this.state;
        return(
            <div>
                <center>
                    <Col sm="6">
                        <Card body>
                            <center><CardTitle tag="h5" name="register">RECRUITER PROFILE DETAILS</CardTitle></center>
                            <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                        <Input type="name" name="name" id="name" placeholder="name (same as before)" value={ name } onChange={ (e) => {this.handleChange(e)} } />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="skills">Skills</Label>
                                        <Multiselect data={ set } value={ skills } allowCreate="onFilter" onCreate={ s => this.handleCreate(s) } onChange={ s => this.setState({ s })} textField="s" />
                                </FormGroup>
                                { this.createUI() }
                                <Button value="add more" onClick={this.addClick.bind(this)}>Add Education</Button>
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