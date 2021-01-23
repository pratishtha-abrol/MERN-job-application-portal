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
import ls from 'local-storage';

class RecruiterDetails extends Component {
    constructor() {
        super();
        this.state = {
            'name': "",
            'contact': "",
            'bio': ""
        };
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
            contact: this.state.contact,
            bio: this.state.bio
        };
        // console.log(data);
        axios
            .post('/recruiter', data)
            .then(function(res) {
                console.log(res);
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
        const { name, contact, bio } = this.state;
        return(
            <div>
                {ls.get("auth") === "true" ? (
                    <Navbar color="dark" dark expand="sm" className="mb-5">
                        <Container>
                            <NavbarBrand href="/">Welcome, {ls.get("username")}</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="/jobs/create">Create Job</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/recruiter">Edit Profile</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/recruiter/profile">View Profile</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Container>
                    </Navbar>
                ) : (
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
                )}
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
                                    <Label for="contact">Contact</Label>
                                        <Input type="contact" name="contact" id="contact" placeholder="contact number" value={ contact } onChange={ (e) => {this.handleChange(e)} } />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="bio">Bio</Label>
                                        <Input type="text" name="bio" id="bio" placeholder="250 words only" value={ bio } onChange={ (e) => {this.handleChange(e)} } />
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

export default RecruiterDetails;