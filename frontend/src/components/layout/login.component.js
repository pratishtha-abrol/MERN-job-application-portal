import React, { Component } from 'react';
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
import axios from 'axios';
import ls from 'local-storage';

class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'email': "",
            'password': ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        this.setState({ 
            [ name ]: value,
        });
    }

    submitForm(e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
        console.log(`Email: ${ this.state.email }`);
        axios
            .post("/login", userData)
            .then(function (res) {
                ls.set("auth", "true");
                console.log(res);
                // ls.set("user", res.data.id);
                ls.set("userid", res.data.user.id);
                ls.set("username", res.data.user.name);
                ls.set("useremail", res.data.user.email);
                ls.set("userrole", res.data.user.role);
                alert("Logged in!");
                window.location = "/";
            })
            .catch(function (res) {
                alert(res.response.data[Object.keys(res.response.data)[0]]);
            })
    }

    render() {
        const { email, password } = this.state;
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
                            <center><CardTitle tag="h5" name="login">LOGIN</CardTitle></center>
                            <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                        <Input type="email" name="email" id="email" placeholder="abc@xyz.com" value={ email } onChange={ (e) => {this.handleChange(e)} } />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                        <Input type="password" name="password" id="password" placeholder="password" value={ password } onChange={ (e) => {this.handleChange(e)} } />
                                </FormGroup>
                                <center><Button type="submit">Login</Button></center>
                            </Form>
                        </Card>
                    </Col>
                </center>
                </div>
            </div>
        );
    }
};

export default UserLogin;