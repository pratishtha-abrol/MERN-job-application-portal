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

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'name': "",
            'email': "",
            'password': "",
            'role': ""
        };
        this.role = [
            { label: "Applicant", value: "Applicant" },
            { label: "Recruiter", value: "Recruiter" }
        ];
        this.handleChange = this.handleChange.bind(this);
    }

    // handleChange = e => {
    //     this.setState({ [e.target.id]: e.target.value});
    // };
    handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        await this.setState({ 
            [ name ]: value,
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        };
        console.log(this.state.name, this.state.email, this.state.password, this.state.role);
        axios
            .post("/users/register", newUser)
            .then(function (res) {
                alert("Registered Successfully");
                window.location.reload();
            })
            .catch(function (res) {
                alert(res.response.data[Object.keys(res.response.data)[0]]);
            })
    }   
    submitForm(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        };
        console.log(`Email: ${ this.state.email }`);
        axios
            .post("/", newUser)
            .then(function (res) {
                alert("Registered Successfully");
                window.location.reload();
            })
            .catch(function (res) {
                alert(res.response.data[Object.keys(res.response.data)[0]]);
            })
    }

    render() {
        const { name, email, password, role } = this.state;
        return(
            <div>
                <center>
                    <Col sm="6">
                        <Card body>
                            <center><CardTitle tag="h5" name="register">REGISTER</CardTitle></center>
                            <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                        <Input type="name" name="name" id="name" placeholder="full name" value={ name } onChange={ (e) => {this.handleChange(e)} } />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                        <Input type="email" name="email" id="email" placeholder="abc@xyz.com" value={ email } onChange={ (e) => {this.handleChange(e)} } />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                        <Input type="password" name="password" id="password" placeholder="password" value={ password } onChange={ (e) => {this.handleChange(e)} } />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="select">Role</Label>
                                        <Input type="select" name="role" id="role" value={ role } onChange={ (e) => {this.handleChange(e)} } >
                                            <option>Applicant</option>
                                            <option>Recruiter</option>
                                        </Input>
                                </FormGroup>
                                <center><Button type="submit">Register</Button></center>
                            </Form>
                        </Card>
                    </Col>
                </center>
            </div>
        );
    }
};

export default User;