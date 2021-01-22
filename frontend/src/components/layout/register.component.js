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
    CardTitle,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

class UserRegister extends Component {
    constructor() {
        super();
        this.state = {
            'name': "",
            'email': "",
            'password': "",
            'role': "Applicant"
        };
        // this.role = [
        //     { label: "Applicant", value: "Applicant" },
        //     { label: "Recruiter", value: "Recruiter" }
        // ];
        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        this.setState({ 
            [ event.target.id ]: event.target.value,
        });
    }

    submitForm(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        };
        console.log(newUser);
        axios
            .post('/register', newUser)
            .then(function (res) {
                console.log(res);
                alert("Registered Successfully");
                if(newUser.role === 'Recruiter') {
                    window.location = '/recruiter';
                } else {
                    window.location = '/applicant';
                }
            })
            .catch(function (res) {
                console.log(res);
                alert(res.response.data[Object.keys(res.response.data)[0]]);
            })
    }

    render() {
        const { name, email, password, role } = this.state;
        return(
            <div>
                <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Job Application Portal</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/register">Register</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/login">Login</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
                </div>
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
                                        <Input type="select" name="role" id="role" value={ role }  onChange={ (e) => {this.handleChange(e)} }>
                                            <option value="Applicant">Applicant</option>
                                            <option value="Recruiter">Recruiter</option>
                                        </Input>
                                </FormGroup>
                                <center><Button type="submit">Register</Button></center>
                            </Form>
                        </Card>
                    </Col>
                </center>
                </div>
            </div>
        );
    }
};

export default UserRegister;