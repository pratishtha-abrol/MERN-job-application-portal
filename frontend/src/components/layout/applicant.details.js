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
            // profile_image: "",
            // resume: ""
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
            education: this.state.education
            // profile_image: this.state.profile_image,
            // resume: this.state.resume
        }
        // data.append('pp', this.state.profile_image);
        // data.append('r', this.state.resume);
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

    // Education

    // createUI() {
    //     return this.state.education.map((el, i) => (
    //         <div key={i}>
    //             <FormGroup>
    //                 <Label for="school">School</Label>
    //                 <Input type="text" name="school" id="school" placeholder="institution name" value={ education.school } onChange={ this.handler.bind(this, i) } />
    //             </FormGroup>
    //             <FormGroup>
    //                 <Label for="degree">Degree</Label>
    //                 <Input type="text" name="degree" id="degree" placeholder="degree" value={ education.degree } onChange={ this.handler.bind(this, i) } />
    //             </FormGroup>
    //             <FormGroup>
    //                 <Label for="fieldofstudy">Field of Study</Label>
    //                 <Input type="text" name="fieldofstudy" id="fieldofstudy" placeholder="field of study" value={ education.fieldofstudy } onChange={ this.handler.bind(this, i) } />
    //             </FormGroup>
    //             <FormGroup>
    //                 <Label for="from">Start Date</Label>
    //                 <Input type="date" name="from" id="from" placeholder="from" value={ education.from } onChange={ this.handler.bind(this, i) } />
    //             </FormGroup>
    //             <FormGroup>
    //                 <Label for="to">End Date</Label>
    //                 <Input type="date" name="to" id="to" placeholder="to" value={ education.to } onChange={ this.handler.bind(this, i) } />
    //             </FormGroup>
    //             <Button value="remove" onClick={ this.removeClick.bind(this, i) } />
    //         </div>
    //     ))
    // }

    schoolhandler (i, event) {
        let education = [...this.state.education];
        education[i].school = event.target.value;
        this.setState({ education });
    }

    degreehandler (i, event) {
        let education = [...this.state.education];
        education[i].degree = event.target.value;
        this.setState({ education });
    }

    fieldofstudyhandler (i, event) {
        let education = [...this.state.education];
        education[i].fieldofstudy = event.target.value;
        this.setState({ education });
    }

    fromhandler (i, event) {
        let education = [...this.state.education];
        education[i].from = event.target.value;
        this.setState({ education });
    }

    tohandler (i, event) {
        let education = [...this.state.education];
        education[i].to = event.target.value;
        this.setState({ education });
    }

    addClick() {
        this.setState(prevState => ({
            education: [...prevState.education, {
                school: "",
                degree: "",
                fieldofstudy: "",
                from: "",
                to: ""
            }]
        }));
    }
    removeClick(i) {
        let education = [...this.state.education];
        education.splice(i, 1);
        this.setState({ education });
    }

    // files

    // ProfileChangehandler (e) {
    //     e.preventDefault();
    //     this.setState({ profile_image: e.target.files[0], loaded1:0,});
    // }

    // ResumeChangehandler (e) {
    //     e.preventDefault();
    //     this.setState({ resume: e.target.files[0], loaded1:0,});
    // }

    // render

    render() {
        let { name, school, degree, fieldofstudy, from, to } = this.state;
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
                                    <Label for="education">Education</Label>
                                {this.state.education.map((el, i) => (
                                    <div key={i}>
                                        <FormGroup>
                                            <Label for="school">School</Label>
                                            <Input type="text" name="school" id="school" placeholder="institution name" value={ school } onChange={ this.schoolhandler.bind(this, i) } />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="degree">Degree</Label>
                                            <Input type="text" name="degree" id="degree" placeholder="degree" value={ degree } onChange={ this.degreehandler.bind(this, i) } />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="fieldofstudy">Field of Study</Label>
                                            <Input type="text" name="fieldofstudy" id="fieldofstudy" placeholder="field of study" value={ fieldofstudy } onChange={ this.fieldofstudyhandler.bind(this, i) } />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="from">Start Date</Label>
                                            <Input type="date" name="from" id="from" placeholder="from" value={ from } onChange={ this.fromhandler.bind(this, i) } />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="to">End Date</Label>
                                            <Input type="date" name="to" id="to" placeholder="to" value={ to } onChange={ this.tohandler.bind(this, i) } />
                                        </FormGroup>
                                        <Button value="Remove" onClick={ this.removeClick.bind(this, i) } >Remove</Button>
                                    </div>
                                ))}
                                
                                </FormGroup>
                                <FormGroup>
                                <Button value="Add" onClick={ () => this.addClick() } >Add</Button>
                                </FormGroup>
                                {/* <FormGroup>
                                    <Label for="profilepic">Profile Picture</Label>
                                    <Input type="file" name="pp" id="pp" value={ profile_image } onChange={ (e) => {this.ProfileChangehandler(e)} } />
                                    <Button onClick={ this.upload }>Upload</Button>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="resume">Resume</Label>
                                    <Input type="file" name="r" id="r" value={ resume } onChange={ (e) => {this.ResumeChangehandler(e)} } />
                                    <Button onClick={ this.upload }>Upload</Button>
                                </FormGroup> */}
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